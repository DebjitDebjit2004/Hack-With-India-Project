const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    forestId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
});

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'2h'});
}

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;

