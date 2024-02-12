import cron from 'node-cron';
import server from './server.js';


cron.schedule('0 0 0,12 * * *', () => {
    console.log('Running cron job');
    server.storeEvents();
}, {
    scheduled: true,
    timezone: "Europe/Madrid", // Configura la zona horaria aquí
});