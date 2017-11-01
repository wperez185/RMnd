const {jobPosts} = require("../models/jobSearchModels");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const router = express.Router();
const moment = require('moment');


router.get('/', (req, res) => {
  jobPosts
    .find()
    .sort({postedDate: 'desc'})
    .exec((err, docs) => {
      return docs;
    })
    .then(posts => {
      res.json(posts)
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

router.post('/filters', jsonParser, (req, res) => {
  let filters = {};
  console.log(req.body);
  if(req.body.jobTitle){
     filters.jobTitle = { "$regex": req.body.jobTitle, "$options": "i" };
  }
  if(req.body.state){
     filters.state = req.body.state;
  }
  if(req.body.city){
    filters.city = req.body.city;
  }
  if(req.body.zipcode){
    filters.zipcode = req.body.zipcode;
  }

  jobPosts
    .find(filters)
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
  const requiredFields = ['jobTitle', 'description', 'city', 'state', 'zipcode', 'salary'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let createdDate = moment(new Date()).format("YYYY-MM-DD h:mm:ss a");
      jobPosts.create({
    jobTitle: req.body.jobTitle,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    salary: req.body.salary,
    jobType: req.body.jobType,
    postedDate: createdDate})
    .then(results => {
        res.status(201).json(results);
      })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

router.delete('/:id', (req, res) => {
  jobPosts
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
  const requiredFields = ['jobTitle', 'description', 'city', 'state', 'zipcode'];
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
  jobPosts.findByIdAndUpdate(req.params.id, {$set:{
    jobTitle: req.body.jobTitle,
    description: req.body.description,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode
  }
},{new: true})
  .then(jobPosts => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Internal server error'}));
});

module.exports = router;
