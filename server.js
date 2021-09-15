// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder
app.use(express.static("website"));

// GET route
app.get("/data", (req, res) => res.status(200).send(projectData));

// POST route
app.post("/data", (req, res) => {
  projectData = req.body;
  res.status(200).send(projectData);
});

const PORT = 3002;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
