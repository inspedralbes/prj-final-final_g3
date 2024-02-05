import puppeteer from "puppeteer";
import fs from "fs";
import { Bar } from 'cli-progress';
import colors from 'ansi-colors';
import { promisify } from 'util';



const progressBar = new Bar({
    format: 'Progress' + colors.red(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total} pages',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
});

const sleep = promisify(setTimeout);


const scrapePage = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    try {
        await page.goto("https://www.livenation.es/event/allevents?location=Barcelona&page=1", {
            waitUntil: 'domcontentloaded',
        });

        const totalPages = await getTotalPages(page);
        const allEventData = [];

        progressBar.start(totalPages, 0);

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

            allEventData.push(...pagedata);
            progressBar.increment();
            await sleep(1000);
        }

        progressBar.stop();

        ///Guardar info en el JSON
        fs.writeFile("events.json", JSON.stringify({ events: allEventData }), (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Successfully Written to File.");
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await browser.close();
    }
}

async function getTotalPages(page) {
    try {
        const nextButton = await page.$('.pagination__button--next');
        const href = await page.evaluate((element) => element.getAttribute('href'), nextButton);

        const pageNumber = href.match(/page=(\d+)/);

        return pageNumber ? parseInt(pageNumber[1]) : 1;
    } catch (error) {
        console.error("Error getting total pages:", error);
        return 1;
    }

}


scrapePage();


