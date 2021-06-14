const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

// подключаем базу данных mongoDB
async function start () {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start() // вызываем функцию подключения БД

app.listen(5000, console.log(`App has been started on ${PORT}`))
