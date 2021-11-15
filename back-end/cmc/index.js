const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const fetchCMCMap = async () => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`;
  return (await fetch(url)).json();
};

router.get('/', async (req, res) => {
  // res.json({ success: 'Hello Weather!' });
  const data = await fetchCMCMap();
  res.json(data.data.length);
});


module.exports = router;