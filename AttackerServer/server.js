const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8002;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route to handle POST requests
app.post('/', (req, res) => {
  console.log('Received data:', req.body);
  res.send('[attacker machine] POST request received');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
