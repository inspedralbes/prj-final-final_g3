import dotenv from 'dotenv';
dotenv.config();


async function getEvents() {
    let currentPage = 0;
    let allEvents = [];
    let maxPages = 1;
    // GET ALL PAGES
    do {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=ES&city=Barcelona&classificationName=music&page=${currentPage}&apikey=${process.env.TICKETMASTER_API_KEY}`);
        const statusCode = response.status;

        if (statusCode === 200) {
            const data = await response.json();
            maxPages = data.page.totalPages;
            const events = data._embedded.events;

            allEvents = allEvents.concat(events);

            currentPage++;

        } else {
            return { error: 'Could not retrieve data from the Ticketmaster API', statusCode };
        }
    } while (currentPage < maxPages);

    return allEvents;
}


async function storeEvents() {
    const events = await getEvents();
    console.log(events);
}

// storeEvents();
console.log('Hello World!');