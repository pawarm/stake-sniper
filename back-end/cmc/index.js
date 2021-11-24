const express = require('express');
const router = express.Router();
const { fetchWithCache } = require('../cache');

router.get('/cryptocurrency/map', async (req, res) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`;
  res.json(await fetchWithCache(url));
});

module.exports = router;
