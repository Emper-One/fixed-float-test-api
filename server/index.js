const express = require('express')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../build')))

const fixedfloat = require('./controllers')
app.get('/api/getCurrencies', fixedfloat.getCurrencies)
app.get('/api/getOrder', fixedfloat.getOrder)
app.get('/api/getPrice', fixedfloat.getPrice)
app.get('/api/setEmergency', fixedfloat.setEmergency)
app.post('/api/createOrder', fixedfloat.createOrder)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    