import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

const fetchCMCMap = async () => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`;
  return (await fetch(url)).json();
};

router.get('/', async (req, res) => {
  // res.json({ success: 'Hello Weather!' });
  const data = await fetchCMCMap() as any;
  res.json(data.data.length);
});


export default router;
