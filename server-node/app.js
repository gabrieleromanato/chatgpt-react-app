'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/v1', require('./routes'));

app.listen(PORT);
