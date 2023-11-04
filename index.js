const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv").config();
const { connection } = require('./db/Connection');
const { sendMail, sendEmail } = require('./controllers/sendMail');
const { subscriber } = require('./controller');


const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.status(200).json({
    message:"get API working"
  })
})


// app.get("/mail", sendMail) 
app.post("/subscriber", sendEmail) 
// app.post("/mail", subscriber) 


app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  connection();
});