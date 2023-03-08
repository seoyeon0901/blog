const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : String,
    hashedPassword : String,
})

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10)
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
}

UserSchema.statics.findByUsername = function(username){
    return this.findOne({username})
}

const User = mongoose.moder('User',UserSchema)

module.exports = User;