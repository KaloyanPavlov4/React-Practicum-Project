import express from 'express'
const app = express()
import morgan from 'morgan'
const port = 3001

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`)
})
