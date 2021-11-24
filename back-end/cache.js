const NodeCache = require('node-cache');
const fetch = require('node-fetch');

const myCache = new NodeCache({ stdTTL: 250 });
const fetchWithCache = async (url) => {
  const data = myCache.has(url)
    ? myCache.get(url)
    : JSON.stringify(await (await fetch(url)).json());
  if (!myCache.has(url)) myCache.set(url, data);
  return JSON.parse(data);
};

module.exports = {
  myCache,
  fetchWithCache
};
