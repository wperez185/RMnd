const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const contactSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String},
  content: {type: String}
});


// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const contact = mongoose.model('contact', contactSchema);

module.exports = {contact};
