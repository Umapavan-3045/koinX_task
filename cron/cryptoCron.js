// cron/cryptoCron.js
const cron = require('node-cron');
const fetchCryptoData = require('../services/cryptoService');

cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    await fetchCryptoData();
    console.log('Crypto data fetched and stored.');
});
