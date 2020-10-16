var express = require('express');
var router = express.Router();
var auth = require('../middleware/authorization');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
  '/time',
  auth.checkToken,
  function(req, res, next) {
    const epoch =  Math.floor(new Date().getTime() / 1000)
    
    res.status(200).json({epoch})
});

router.get(
  '/metrics',
  auth.checkToken,
  function(req, res, next) {
  next()
});

module.exports = router;
