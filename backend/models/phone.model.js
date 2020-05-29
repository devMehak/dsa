const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phoneSchema = new Schema({
    phone : {type: String, 
        required: true,
        unique: true, 
        trim: true, 
        minlength: 10},
    username: {
        type : String,
        required: true,
        trim: true
    }
});

const Phone = mongoose.model('Phone', phoneSchema);
module.exports = Phone;