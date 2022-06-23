const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler')

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

routerApi(app)

//middlewares
app.use(express.json())

const whitelist = [
  'http://localhost:8080',
  'https://myapp.co'
]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Permission denied'))
    }
  }
}

app.use(cors(options))

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
