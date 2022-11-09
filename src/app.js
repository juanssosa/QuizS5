const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();
const pokemon_routes = require("./routes/pokemon_route");

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', pokemon_routes);

module.exports = app;
