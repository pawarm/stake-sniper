import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import cmc from './cmc';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

// Use if you're behind a reverse proxy
// https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const whitelist = ['http://127.0.0.1', 'http://127.0.0.1:5500'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  })
);

// If needed: Allow options to pass CORS preflight check
/* app.options("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Content-Length,X-Requested-With"
  );
  res.sendStatus(200);
}); */

const limiter = rateLimit({
  windowMs: 1000,
  max: 1
});
app.use(limiter);

app.get('/', (req, res) => res.json({ success: 'Hello World!' }));
app.use('/cmc', cmc);

app.listen(port, () => console.log(`App listening on port ${port}`));
