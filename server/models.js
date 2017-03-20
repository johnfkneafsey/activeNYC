const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    gender: {type: String},
    id: {type: String, required: true},
    last_name: {type: String, required: true},
    link: {type: String, required: true},
    name: {type: String, required: true}
})

userSchema.methods.apiRepr = function () {
  return {
    first_name: this.first_name,
    gender: this.gender,
    id: this.id,
    last_name: this.last_name,
    link: this.link,
    name: this.name
  };
};

const User = mongoose.model('User', userSchema);

module.exports = { User };