const express = require("express");
const dotenv = require("dotenv").config();
const { connection } = require('./db/Connection');
const router = require('./route')
const cors = require('cors');

const app = express();
app.use(express.json());


app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(require("./route"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  connection();
});