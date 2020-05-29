const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    username : {type: String , required: true},
    phone : {type: Array, required: true}, 
    email : {type: Array},
    dob : {type: Date}
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;