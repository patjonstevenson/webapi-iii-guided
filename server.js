const express = require('express'); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// Custom Middleware functions
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
};

const gateKeeper = (req, res, next) => {
  // a new way of reading data sent by the client
  const password = req.headers.password || "";
  if (password && password.toLowerCase() === "mellon") {
    next();
  } else if (password) {
    res.status(401).json({ you: "shall not pass", });
  } else {
    res.status(400).json({ you: "need to provide a password" });
  }
};

// Global middleware
server.use(helmet());
server.use(express.json());
server.use(requestLogger);
server.use(morgan());
server.use(gateKeeper);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
