const express = require("express");
const dotenv = require("dotenv").config();
const { connection } = require('./db/Connection');
const router = require('./route')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require("./route"));

app.post('/', (req, res) => {
  return res.status(200).send({
    success:true,
    message: "hi backend server"
  })
})
app.post('/testing', (req, res) => {
    return res.status(200).send({
      success:true,
      message: "hi testing server"
    })
  })



app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  connection();
});