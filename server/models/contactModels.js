const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String},
  content: {type: String}
});

const contact = mongoose.model('contact', contactSchema);

module.exports = {contact};
