<<<<<<< HEAD
require('dotenv').config()
const express = require('express')
const app= express()
const animalRoutes = require('./routes/animal.routes')

const PORT = process.env.PORT || 3000

const userRoutes = require('./routes/user.route')
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/animal',animalRoutes)
app.use('/user',userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
=======
require('dotenv').config()
const express = require('express')
const app= express()
const animalRoutes = require('./routes/animal.routes')

const PORT = process.env.PORT || 3000
const cors = require('cors')

const userRoutes = require('./routes/user.route')
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('/animal',animalRoutes)
app.use('/user',userRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
>>>>>>> refs/remotes/origin/samir
