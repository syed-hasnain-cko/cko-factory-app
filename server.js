
const path = require('path');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
      const WebSocket = require('ws');
      const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

app.use(express.static(process.cwd()+"/dist/cko-factory-app/"));

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/dist/cko-factory-app/index.html")
  });

const server = app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

app.post("/webhook", (req, res) => {
  console.log(req.body) 
  if (clients.has(req.body.data.id)) {
    const ws = clients.get(req.body.data.id);
    ws.send(JSON.stringify(req.body));
    
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})


// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3081});

// Handle incoming WebSocket connections

// Store connected clients
const clients = new Map();

// Handle incoming WebSocket connections
wss.on('connection', (ws, request) => {
  const paymentId = request.url.slice(1); // Remove the leading slash
  clients.set(paymentId, ws);
  
  ws.on('close', () => {
    clients.delete(paymentId);
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

  myEmitter.on('error', (err) => {
    console.error('An error occurred:', err);
  });
