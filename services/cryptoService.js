// services/cryptoService.js
const axios = require('axios');
const Crypto = require('../models/Crypto');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true
            }
        });

        const data = response.data;
        for (let coin of coins) {
            const crypto = new Crypto({
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change
            });
            await crypto.save();
        }
    } catch (error) {
        console.error('Error fetching data from CoinGecko', error);
    }
}

module.exports = fetchCryptoData();
