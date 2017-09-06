const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const jobPostsSchema = mongoose.Schema({
  jobTitle: {type: String, required: true},
  description: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zipcode: {type: Number, required: true},
  salary: {type: Number, required: true},
  jobType: {type: String, required: true},
  postedDate: {type: Date}
});


// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const jobPosts = mongoose.model('jobPosts', jobPostsSchema);

module.exports = {jobPosts};
