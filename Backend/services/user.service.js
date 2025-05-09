const userModel = require('../models/user.model');

module.exports.createUser = async({name,email,password,forestId})=>{
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userModel.create({name,email,password:hashedPassword,forestId});
    return user;
}

