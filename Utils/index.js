const express = require('express');
const db = require('./Config/connection');
const routes = require('./Routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();