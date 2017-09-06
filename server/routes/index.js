const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/index.html"))
})

router.get("/jobPosts", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/data.html"))
})

router.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/settings/profile.html"))
})

router.get("/account", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/settings/admin.html"))
})

router.get("/hire", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/employers/employerPosting.html"))
})

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../..", "public/contact.html"))
})

module.exports = router;
