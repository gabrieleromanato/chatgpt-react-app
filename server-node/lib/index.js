'use strict';

const jwt = require('jsonwebtoken');
const https = require('https');


module.exports = {
    generateAccessToken(username) {
       return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {expiresIn: 3600});
    },
    verifyToken(request, response, next) { 
        const authHeader = request.headers['authorization'];  
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return response.sendStatus(401);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                return response.sendStatus(403);
            }
            next();
        });
    },
    sendQuestion(text) {
        const data = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': text}]
        };

        const params = {
            host: 'api.openai.com',
            port: 443,
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.API_KEY
            }
        };

        return new Promise((resolve, reject) => {
            const request = https.request(params, response => {
                let resData = '';

                response.on('data', chunk => {
                    resData += chunk;
                });
                response.on('end', () => {
                    resolve(JSON.parse(resData));
                });
    
            }).on('error', err => reject(err));
            request.write(JSON.stringify(data));
            request.end();
        });
    },
    parseResponse(choices = []) {
        let answer = [];
        if(Array.isArray(choices)) {
            for(const choice of choices) {
                if(choice.message && choice.message.content) {
                    answer.push(choice.message.content);
                }
            }
        }
        return answer.length > 0 ? answer.join('\n') : '';
    }
};
