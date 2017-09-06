const {contact} = require("../models/contactModels");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const router = express.Router();
const moment = require('moment');


router.get('/', (req, res) => {
  contact
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
  const requiredFields = ['name', 'email', 'phone', 'content'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  let createdDate = moment(new Date()).format("YYYY-MM-DD h:mm:ss a");
      contact.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    content: req.body.content
    })
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



router.delete('/:id', (req, res) => {
  contact
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


module.exports = router;
