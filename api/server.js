const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/users/', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: `Welcome to Node Auth2 API` })
});

module.exports = server;