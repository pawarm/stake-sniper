import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';
import {CoinMarketCapResponse} from '../../../types/coin-market-cap';

const fetchCMCMap = async () => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`;
  const weatherStream = await fetch(url);
  const weatherJson = await weatherStream.json() as CoinMarketCapResponse;
  return weatherJson;
};

router.get('/', async (req, res) => {
  // res.json({ success: 'Hello Weather!' });
  const data = await fetchCMCMap();
  res.json(data.data.length);
});


export default router;
