// src/config/container.js
const MasterService = require('../services/master.service');
const UserMasterService = require('../services/usermaster.service');
const UserMasterController = require('../controllers/usermaster.controller');

function scopedContainer(req, res, next) {
  // Create scoped service instances per request
  const masterService = new MasterService();
  const userMasterService = new UserMasterService();

  // Create controller instance with services injected
  req.userMasterController = new UserMasterController(masterService, userMasterService);

  next();
}

module.exports = scopedContainer;
