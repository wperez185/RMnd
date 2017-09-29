const mongoose = require('mongoose');
const jobsAppliedSchema = mongoose.Schema({
  userId: {type: String, required: true},
  jobPostsId: {type: String, required: true},
  dateApplied: {type: Date}
});

const jobsApplied = mongoose.model('jobsApplied', jobsAppliedSchema);

module.exports = {jobsApplied};
