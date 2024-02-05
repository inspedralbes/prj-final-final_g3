import puppeteer from "puppeteer";
import fs from "fs";

// const browser = await puppeteer.launch({
//     headless: true
// });
// const page = await browser.newPage();

// // await page.goto("https://www.ticketmaster.es/musica/todos-musica/10001/events");
// await page.goto("https://example.com/");

// await new Promise(r => setTimeout(r, 10000));

// await browser.close();

const scrapePage = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    // await page.goto("https://www.ticketmaster.es/musica/todos-musica/10001/events/", {
    //     waitUntil: 'domcontentloaded',
    // });

    // const pagedata = await page.evaluate(() => {
    //     const pageList = document.querySelectorAll(".sc-1nyzlro-1");

    //     return Array.from(pageList).map((page) => {
    //         const date = page.querySelector(".lmhoCy span").innerText;
    //         const name = page.querySelector(".sc-fyofxi-5.gJmuwa").innerText;
    //         const location = page.querySelector(".sc-fyofxi-7.PpnvD").innerText;

    //         return {
    //             date,
    //             name,
    //             location
    //         };
    //     });
    // });
    await page.goto("https://www.livenation.es/event/allevents?location=Barcelona&page=1", {
        waitUntil: 'domcontentloaded',
    });

    const pagedata = await page.evaluate(() => {
        const pageList = document.querySelectorAll(".result-card__wrapper");

        return Array.from(pageList).map((page) => {
            // const date = page.querySelector(".lmhoCy span").innerText;
            const name = page.querySelector(".result-info__localizedname").innerText;
            // const location = page.querySelector(".sc-fyofxi-7.PpnvD").innerText;

            return {
                name
            };
        });
    });


    console.log(pagedata);

    // fs.writeFile("events.json", JSON.stringify(pagedata), (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("Successfully Written to File.");
    // });

    await browser.close();

}

scrapePage();


