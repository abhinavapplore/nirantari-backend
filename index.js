const express = require("express");
const dotenv = require("dotenv").config();
const { connection } = require('./db/Connection');
const router = require('./route')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require("./route"));
// app.use('/subscriber', router)

app.get('/', (req, res) => {
  res.send({
    message: "hi backend server"
  })
})



app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  connection();
});