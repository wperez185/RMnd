const mongoose = require('mongoose');
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

const jobPosts = mongoose.model('jobPosts', jobPostsSchema);

module.exports = {jobPosts};
