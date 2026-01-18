const UserMasterDTO = require('../models/UserMasterDTO');
const logger = require('../utils/logger.util');

class UserMasterController {
  constructor(masterService, userMasterService) {
    this.masterService = masterService;
    this.userMasterService = userMasterService;

    this.getRoleList = this.getRoleList.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getUserDetailById = this.getUserDetailById.bind(this);
    this.setUserMaster = this.setUserMaster.bind(this);
    this.updateUserMaster = this.updateUserMaster.bind(this);
    this.checkExistingEmailId = this.checkExistingEmailId.bind(this);
    this.checkExistingEmpId = this.checkExistingEmpId.bind(this);
    this.checkExistingMobileNo = this.checkExistingMobileNo.bind(this);
    this.getDesignationList = this.getDesignationList.bind(this);
    this.getBranchList = this.getBranchList.bind(this);
  }

  async getRoleList(req, res) {
    try {
      logger.info('GetRoleList API called');
      const data = await this.masterService.getAllRoleList();
      logger.info('GetRoleList success', { count: data?.length || 0 });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      logger.error('GetRoleList failed', { message: err.message, stack: err.stack });
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch role list'
      });
    }
  }

  async getUserDetails(req, res) {
    try {
      logger.info('GetUserDetails API called');
      const data = await this.userMasterService.getAllUserDetails();
      logger.info('GetUserDetails success', { count: data?.length || 0 });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      logger.error('GetUserDetails failed', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  }

  async getUserDetailById(req, res) {
    try {
      const { userid } = req.query;
      logger.info('GetUserDetailById API called', { userid });
      const data = await this.userMasterService.getUserDataOnUserId(userid);
      logger.info('GetUserDetailById success', { userid });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      logger.error('GetUserDetailById failed', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch user detail' });
    }
  }

  async setUserMaster(req, res) {
    try {
      logger.info('SetUserMaster API called', { body: req.body });
      const userMasterData = new UserMasterDTO(req.body);
      await this.userMasterService.setUserMaster(userMasterData);
      logger.info('SetUserMaster success');
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error('SetUserMaster failed', err);
      return res.status(500).json({ success: false, message: 'Failed to create user' });
    }
  }

  async updateUserMaster(req, res) {
    try {
      logger.info('UpdateUserMaster API called', { body: req.body });
      const userMasterData = new UserMasterDTO(req.body);
      await this.userMasterService.updateUserMaster(userMasterData);
      logger.info('UpdateUserMaster success');
      return res.status(200).json({ success: true });
    } catch (err) {
      logger.error('UpdateUserMaster failed', err);
      return res.status(500).json({ success: false, message: 'Failed to update user' });
    }
  }

  async checkExistingEmailId(req, res) {
    try {
      const { emailid } = req.query;
      logger.info('CheckExistingEmailId called', { emailid });
      const exists = await this.masterService.checkExistingEmailId(emailid);
      logger.info('CheckExistingEmailId result', { emailid, exists });
      return res.status(200).json({ success: true, exists });
    } catch (err) {
      logger.error('CheckExistingEmailId failed', err);
      return res.status(500).json({ success: false });
    }
  }

  async checkExistingEmpId(req, res) {
    try {
      const { empid } = req.query;
      logger.info('CheckExistingEmpId called', { empid });
      const exists = await this.masterService.checkExistingEmpId(empid);
      logger.info('CheckExistingEmpId result', { empid, exists });
      return res.status(200).json({ success: true, exists });
    } catch (err) {
      logger.error('CheckExistingEmpId failed', err);
      return res.status(500).json({ success: false });
    }
  }

  async checkExistingMobileNo(req, res) {
    try {
      const { mobileno } = req.query;
      logger.info('CheckExistingMobileNo called', { mobileno });
      const exists = await this.masterService.checkExistingMobileNo(mobileno);
      logger.info('CheckExistingMobileNo result', { mobileno, exists });
      return res.status(200).json({ success: true, exists });
    } catch (err) {
      logger.error('CheckExistingMobileNo failed', err);
      return res.status(500).json({ success: false });
    }
  }

  async getDesignationList(req, res) {
    try {
      logger.info('GetDesignationList API called');
      const data = await this.masterService.getAllDesignationList();
      logger.info('GetDesignationList success', { count: data?.length || 0 });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      logger.error('GetDesignationList failed', err);
      return res.status(500).json({ success: false });
    }
  }

  async getBranchList(req, res) {
    try {
      logger.info('GetBranchList API called');
      const data = await this.masterService.getBranchListForDDL();
      logger.info('GetBranchList success', { count: data?.length || 0 });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      logger.error('GetBranchList failed', err);
      return res.status(500).json({ success: false });
    }
  }
}

module.exports = UserMasterController;
