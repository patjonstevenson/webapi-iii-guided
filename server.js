const express = require('express'); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// Custom Middleware functions
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} request made to ${req.url}`);

  next();
};


// Global middleware
server.use(helmet());
server.use(express.json());
server.use(requestLogger);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
