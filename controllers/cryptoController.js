// controllers/cryptoController.js
const Crypto = require('../models/Crypto');

async function getStats(req, res) {
    const { coin } = req.query;
    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin name' });
    }

    const latestCrypto = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestCrypto) {
        return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    res.json({
        price: latestCrypto.price,
        marketCap: latestCrypto.marketCap,
        '24hChange': latestCrypto.change24h
    });
}

module.exports = { getStats };

// controllers/cryptoController.js (add this function)
function calculateStandardDeviation(prices) {
    const n = prices.length;
    const mean = prices.reduce((a, b) => a + b, 0) / n;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return Math.sqrt(variance);
}

async function getDeviation(req, res) {
    const { coin } = req.query;
    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin name' });
    }

    const last100Records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (last100Records.length < 2) {
        return res.status(400).json({ error: 'Not enough data to calculate deviation' });
    }

    const prices = last100Records.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: deviation.toFixed(2) });
}

module.exports = { getStats, getDeviation };
