import puppeteer from "puppeteer";
import fs from "fs";
import cliProgress from 'cli-progress';
import colors from 'ansi-colors';
import { promisify } from 'util';


//Variables
const allEventData = [];

// Barra de progreso
const multibar = new cliProgress.MultiBar({
    format: 'Progress' + colors.red(' {bar}') + ' {percentage}% | {filename} | {value}/{total} pages',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
});
const sleep = promisify(setTimeout);

const b1 = multibar.create(100, 0, { filename: 'LiveNation' });
const b2 = multibar.create(100, 0, { filename: 'ElCorteIngles' });


///FUNCTIONS
const scrapeLiveNation = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    try {
        await page.goto("https://www.livenation.es/event/allevents?location=Barcelona&page=1", {
            waitUntil: 'domcontentloaded',
        });

        const nextButton = await page.$('.pagination__button--next');
        const href = await page.evaluate((element) => element.getAttribute('href'), nextButton);

        const pageNumber = href.match(/page=(\d+)/);

        const totalPages = pageNumber ? parseInt(pageNumber[1]) : 1;

        b1.start(totalPages, 0);

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            const pageUrl = `https://www.livenation.es/event/allevents?location=Barcelona&page=${currentPage}`;
            await page.goto(pageUrl, {
                waitUntil: 'domcontentloaded',
            });

            const pagedata = await page.evaluate(() => {
                const pageList = document.querySelectorAll(".result-card__wrapper");

                return Array.from(pageList).map((page) => {
                    const concert = page.querySelector(".result-info__localizedname").innerText;
                    const artist = page.querySelector(".result-info__headliners").innerHTML;
                    const day = page.querySelector(".event-date__date__day").innerText;
                    const month = page.querySelector(".event-date__date__month").innerText;
                    const year = page.querySelector(".event-date__date__year").innerText;
                    const city = page.querySelector(".result-info__city").innerText;
                    const location = page.querySelector(".result-info__venue").innerText;
                    const image = page.querySelector(".progressive-image__img.progressive-image__img--normalised").getAttribute('src');;

                    return {
                        concert,
                        artist,
                        day,
                        month,
                        year,
                        city,
                        location,
                        image
                    };
                });
            });

            const nodeName = "LiveNation";

            const existingNodeIndex = allEventData.findIndex(node => node.name === nodeName);

            if (existingNodeIndex !== -1) {
                allEventData[existingNodeIndex].events.push(...pagedata);
            } else {
                allEventData.push({
                    name: nodeName,
                    events: [...pagedata]
                });
            }
            b1.increment();
            await sleep(1000);
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }
}

async function scrapCorteIngles() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    try {
        await page.goto("https://www.elcorteingles.es/entradas/lo-mas-vendido/barcelona/?filters%5Bgenre%5D=conciertos", {
            waitUntil: 'domcontentloaded',
        });

        b2.start(1, 0);

        const pageData = await page.evaluate(() => {
            const pageList = document.querySelectorAll('.product-list .product-card__wrapper');

            return Array.from(pageList).map((page) => {
                const concert = page.querySelector(".product-card__description h3").innerText;
                const city = page.querySelector('.product-card__description .product-card__city').innerHTML;

            });
        });

        const nodeName = "ElCorteIngles";

        const existingNodeIndex = allEventData.findIndex(node => node.name === nodeName);
        if (existingNodeIndex !== -1) {
            allEventData[existingNodeIndex].events.push(...pageData);
        } else {
            allEventData.push({
                name: nodeName,
                events: [...pageData]
            });
        }
        b2.increment();
        await sleep(1000);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }
}

function writeJson() {
    fs.writeFile("events.json", JSON.stringify({ events: allEventData }), (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Successfully Written to File.");
    });
}


scrapeLiveNation()
    .then(() => scrapCorteIngles())
    .then(() => {
        writeJson();
        multibar.stop();
    })
    .catch((error) => console.error("Error:", error));


