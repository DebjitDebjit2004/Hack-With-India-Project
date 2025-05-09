const mongoose =  require('mongoose');

const animalSchema = new mongoose.Schema({
    animalName: { type: String, required: true }, 
    timestamp: { type: Date },
    location: {
      lat: { type: Number, required: true, default: 0 },
      lng: { type: Number, required: true, default: 0 },
    },
    temperature: { type: Number, default: 0 },
    description: String,
    image: String,
    isMoving: { type: Boolean, default: false },
})

module.exports= mongoose.model('AnimalUpdate',animalSchema)

