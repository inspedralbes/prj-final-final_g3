import dotenv from 'dotenv';
import mysql from 'mysql2';
import axios, { all } from 'axios';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


async function getEvents() {
    let currentPage = 0;
    let allEvents = [];
    let maxPages = 1;
    // GET ALL PAGES
    do {
        try {
            const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json`, {
                params: {
                    countryCode: 'ES',
                    city: 'Barcelona',
                    classificationName: 'music',
                    page: currentPage,
                    apikey: process.env.TICKETMASTER_API_KEY
                }
            });

            const data = response.data;
            maxPages = data.page.totalPages;
            const events = data._embedded.events;

            allEvents = allEvents.concat(events);
            currentPage++;
        } catch (error) {
            console.error('Could not retrieve data from the Ticketmaster API:', error.response.status);
            return [];
        }
    } while (currentPage < maxPages);

    console.log("All events retrieved");
    return allEvents;
}

async function storeEvents() {
    db.connect(async (err) => {
        if (err) throw err;
        console.log('Connected to database');

        let allEvents = await getEvents();

        allEvents.forEach(async event => {
            const id = event.id || null;
            const name = event.name || null;
            const artist = event._embedded && event._embedded.attractions && event._embedded.attractions.length > 0 ? event._embedded.attractions[0].name : null;
            const date = event.dates && event.dates.start && event.dates.start.localDate ? event.dates.start.localDate : null;
            const time = event.dates && event.dates.start && event.dates.start.localTime ? event.dates.start.localTime : null;
            const venue = event._embedded && event._embedded.venues ? event._embedded.venues[0].name : null;
            const city = event._embedded && event._embedded.venues && event._embedded.venues[0].city ? event._embedded.venues[0].city.name : null;
            const genre = event.classifications && event.classifications[0].genre ? event.classifications[0].genre.name : null;
            const subgenre = event.classifications && event.classifications[0].subGenre ? event.classifications[0].subGenre.name : null;
            const minPrice = event.priceRanges && event.priceRanges[0].min ? event.priceRanges[0].min : null;
            const maxPrice = event.priceRanges && event.priceRanges[0].max ? event.priceRanges[0].max : null;
            const promoter = event.promoter ? event.promoter.name : null;
            const images = event.images ? JSON.stringify(event.images.map(image => image.url)) : null;

            const selectQuery = `SELECT * FROM events WHERE event_id = ?`;
            const selectResult = await queryDatabase(selectQuery, [id]);

            if (selectResult.length > 0) {
                console.log('Event already exists NOT INSERTED !!!!!!!:', name);
                return;
            } else {
                const query = `INSERT INTO events (event_id, event, artist, date, time, venue, city, genre, subgenre, minPrice, maxPrice, promoter, images) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                const values = [id, name, artist, date, time, venue, city, genre, subgenre, minPrice, maxPrice, promoter, images];
                const result = await queryDatabase(query, values);
                console.log('Event inserted:', name);
            }
        });

    });
}

async function deletePastEvents() {
    try {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const deleteQuery = `DELETE FROM events WHERE CONCAT(date, ' ', time) < ?`;
        const deleteValues = [now];
        console.log('Deleting past events...');

        const result = await queryDatabase(deleteQuery, deleteValues);
        console.log(`${result.affectedRows} past events deleted`);
    } catch (error) {
        console.error('Error deleting past events:', error);
    }
}


async function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}

const server = {
    storeEvents,
    deletePastEvents
}

export default server;