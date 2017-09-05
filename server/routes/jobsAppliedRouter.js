const {jobsApplied} = require("../models/jobsAppliedModels");
// Not sure if jobPosts is needed here to reference for the data
// const {jobPosts} = require("../models/jobPostsModels");

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

// router.get('/:state', (req, res) => {
//   let state = req.params.state;
//   jobPosts
//     .find({state})
//     .then(posts => {
//       res.json(posts)
//     })
//     .catch(
//       err => {
//         console.error(err);
//         res.status(500).json({message: 'Internal server error'});
//     });
// });

// router.post('/filters', jsonParser, (req, res) => {
//   let filters = {};
//   if(req.body.state){
//      filters.state = req.body.state;
//   }
//   if(req.body.city){
//     filters.city = req.body.city;
//   }
//   if(req.body.zipcode){
//     filters.zipcode = req.body.zipcode;
//   }
//   dataCollection
//     .find(filters)
//     .then(posts => {
//       res.json(posts)
//     })
//     .catch(
//       err => {
//         console.error(err);
//         res.status(500).json({message: 'Internal server error'});
//     });
// });

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
  // let today = moment().format();
  // res.status(201).json(item);
});

// router.delete('/:id', (req, res) => {
//   jobPosts.delete(req.params.id);
//   console.log(`Deleted job post \`${req.params.id}\``);
//   res.status(204).end();
// });

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
