import cron from 'node-cron';
import server from './server.js';

server.storeEvents();

// Ejecuta el método storeEvents() a las 00:00 y 12:00 todos los días
cron.schedule('0 0 0,12 * * *', () => {
    console.log('Running cron job');
    server.storeEvents();
}, {
    scheduled: true,
    timezone: "Europe/Madrid",
});