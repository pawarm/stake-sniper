import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

const fetchCMCMap = async () => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${process.env.CMC_PRO_API_KEY}`;
  try {
    return (await fetch(url)).json();
  } catch (err) {
    return err;
  }
};

router.get('/', async (req, res) => {
  const data = await fetchCMCMap();
  res.json(data.data);
});


export default router;
