const express = require("express");

const person = require("../controllers/person");

const router = express.Router();

//router.get("/populate", person.populateDb);
router.get("/test", person.test);
module.exports = router;
