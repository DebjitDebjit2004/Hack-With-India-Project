const express = require('express')
const router = express.Router()

const animalController = require('../controllers/animal.controller')
const upload = require('../middlewares/upload')


router.post('/register',upload.single('image'),animalController.registerAnimal)


module.exports = router
