const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const jobsAppliedSchema = mongoose.Schema({
  userId: {type: String, required: true},
  jobPostsId: {type: String, required: true},
  dateApplied: {type: Date}
});


// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const jobsApplied = mongoose.model('jobsApplied', jobsAppliedSchema);

module.exports = {jobsApplied};
