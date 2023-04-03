'use strict';

const express = require('express');
const router = express.Router();
const { generateAccessToken, verifyToken, sendQuestion, parseResponse } = require('../lib');
const Redis = require('ioredis');

const redisClient = new Redis({
    port: parseInt(process.env.REDIS_PORT,10),
    host: process.env.REDIS_HOST
});


router.get('/', (req, res, next) => {
    return res.json({info: 'API v.1'});
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if(username !== process.env.USERNAME || password !== process.env.PASSWORD) {
        return res.json({error: 'Invalid login.'});
    }
    const accessToken = generateAccessToken(username);
    return res.json({token: accessToken });
});

router.post('/question', verifyToken, async (req, res, next) => {
    const question = req.body.question;
    if(!question) {
        return res.json({error: 'Invalid request.' });
    }
    const cachedQuestion = await redisClient.get(question);
    if(cachedQuestion) {
        return res.json({response: cachedQuestion});
    }
    const answer = await sendQuestion(question);
    if(!answer) {
        return res.json({ error: 'Request failed or timed out.' });
    }
    const respText = parseResponse(answer.choices);
    await redisClient.set(question, respText);
    return res.json({response: respText});
});



module.exports = router;