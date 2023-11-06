const express = require('express')
const app = express()
const port = 5000
const cors=require('cors')
const mongoDB=require('./db')
mongoDB();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api/',require('./routes/createUser'))
app.use('/api/',require('./routes/GetItems'))
app.use('/api/',require('./routes/Orderdata'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})