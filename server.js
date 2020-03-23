// Empty JS object to act as endpoint for all routes
const projectData = [];

// Express will begin to run server and routes
const express = require('express');
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Config Express to use body-parser as middle-ware!
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Le port used
const port = 8000;

//Spin up the server!
const server = app.listen(port, listening);

// Callback
function listening() {
  console.log('Server is alive!');
  console.log(`Running on localhost: ${port}`); // NOTE: USE `` and NOT ''
}

//GET route
app.get('/all', sendData);

function sendData(request, response) {
  response.send(projectData);
};
// POST route
app.post('/add', callBack);

function callBack(request, response) {
  projectData.push(request.body);
  response.send(true);
}
