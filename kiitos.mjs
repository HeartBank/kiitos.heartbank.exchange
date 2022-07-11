import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';

import { getClient } from './coinbase.mjs';
import { kiitos } from './buddha/god.mjs';

// expires on 2022-10-02
const cert = fs.readFileSync('private/fullchain.pem');
const key = fs.readFileSync('private/privkey.pem');

const TEST = true;
setInterval(kiitos, 1*1000, getClient('kiitos', TEST));

const bot = express();
bot.use(cors());
bot.use(express.urlencoded({ extended: true })); 
bot.use(express.json());

bot.get('/', async (req, res) => {
    const client = getClient();
    res.json({ time: await client.getTime() });
});

bot.get('/accounts', async (req, res) => {
    const client = getClient('kiitos', TEST);
    res.json({accounts: await client.getCoinbaseAccounts() });
});

https.createServer({cert, key}, bot).listen(666);