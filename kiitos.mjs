import fs from 'fs';
import https from 'https';
import express from 'express';
import cors from 'cors';

import { getClient } from './coinbase.mjs';

// expires on 2022-10-02
const cert = fs.readFileSync('private/fullchain.pem');
const key = fs.readFileSync('private/privkey.pem');

const bot = express();
bot.use(cors());
bot.use(express.urlencoded({ extended: true })); 
bot.use(express.json());

bot.get('/', async (req, res) => {
    const client = getClient();
    res.json({ products: await client.getTime() });
});

bot.get('/accounts', async (req, res) => {
    const client = getClient('kiitos');
    res.json({accounts: await client.getCoinbaseAccounts() });
});

bot.get('/account', async (req, res) => {
    const client = getClient('kiitos', false);
    res.json({accounts: await client.getCoinbaseAccounts() });
});

https.createServer({cert, key}, bot).listen(666);