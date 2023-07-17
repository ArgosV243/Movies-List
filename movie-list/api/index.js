const express = require('express')
const app = express();
const cors = require('cors')
const port = 8080;

app.use(express.json())
app.use(cors())

const knex = require('knex')(require('./knexfile.js') ['development'])

app.get('/', (req, res) => {
  res.status(200).json('Im up')
})

app.get('/movies', async (req, res) => {
  try{
    const authors = await knex('movies_table')
      .select("*")
      res.status(201).json(authors)
  }catch(err){
    res.status(500).json({message:err})
  }
})

app.listen(port, () => console.log(`Express server listening on port ${port}.`))