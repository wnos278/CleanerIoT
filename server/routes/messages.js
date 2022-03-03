var express = require('express');
var router = express.Router();

const Message = require('../models/message');

router.post('/roominfo', async function(req, res, next) {
  console.log( req.body["time_begin"] + " " + req.body["time_end"] );
  const results = await Message.getRoomInfo(req.body["time_begin"], req.body["time_end"]);
  if (results != null) {
    res.statusCode = 200;
    res.data = { "result": results };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
});

router.get('/turnright', async function(req, res, next) {
  console.log("Sang phải");
  result = await Message.makeTurnRightMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
});

router.get('/turnleft', async function(req, res, next) {
  result = await Message.makeTurnLeftMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
});

router.get('/turndown', async function(req, res, next) {
  result = await Message.makeTurnDownMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
});

router.get('/turnup', async function(req, res, next) {
  result = await Message.makeTurnUpMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
});

router.get('/turnonauto', async function(req, res, next) {
  result = await Message.makeTurnOnAutoMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
});

router.get('/turnoffauto', async function(req, res, next) {
  result = await Message.makeTurnOffAutoMessage()
  if (result == 1) {
    res.statusCode = 200;
    res.data = { "result": result };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  else {
    res.statusCode = 200;
    res.data = {  };
    res.status(res.statusCode || 200).send({ status: true, response: res.data });
  }
  
});

module.exports = router;
