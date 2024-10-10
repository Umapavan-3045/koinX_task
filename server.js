// server.js
const express = require('express');
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');
const fetchCryptoData = require('./services/cryptoService');
const cronJob = require('./cron/cryptoCron');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/crypto-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
