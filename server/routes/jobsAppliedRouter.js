const {jobsApplied} = require("../models/jobsAppliedModels");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
  jobsApplied
    .find()
    .then(posts => {
      res.json(posts)
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.post("/", jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['userId', 'jobPostsId', 'dateApplied'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
      jobsApplied.create({
    userId: req.body.userId,
    jobPostsId: req.body.jobPostsId,
    dateApplied: req.body.dateApplied})
    .then(results => {
        res.status(201).json(results);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.delete('/:id', (req, res) => {
  jobsApplied
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['userId', 'jobPostsId', 'dateApplied'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  dataCollection.findByIdAndUpdate(req.params.id, {$set:{
    userId: req.body.userId,
    jobPostsId: req.body.jobPostsId,
    dateApplied: req.body.dateApplied
  }
},{new: true})
  .then(dataCollection => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;
