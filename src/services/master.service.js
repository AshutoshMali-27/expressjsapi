const IMasterService = require('../interfaces/imaster.service.interface');
const RoleMaster = require('../models/rolemaster');
const DesignationViewModel = require('../models/DesignationViewModel');
const BranchDDLViewModel = require('../models/BranchDDLViewModel');
const axios = require('axios');
const https = require('https');
class MasterService extends IMasterService {

  async getAllRoleList() {
    try {
      // Call external API
      const response = await axios.get('https://localhost:44382/api/UserMaster/GetRoleList', {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
      });

      const rolesData = response.data; 

      return rolesData.map((r, index) => new RoleMaster({
        srNo: r.srNo ?? index + 1,       // fallback SrNo
        roleId: r.roleId,
        role: r.role,
        createdOn: r.createdOn ? new Date(r.createdOn) : new Date(),
        createdBy: r.createdBy,
        roleCreatedBy: r.roleCreatedBy,
        isActive: r.isActive ?? 1
      }));

    } catch (error) {
      console.error('[MasterService] getAllRoleList error:', error.message);
      throw error;
    }
     
  }


  async checkExistingEmailId(email) {
    return false;
  }

  async checkExistingMobileNo(mobileNo) {
    return false;
  }

  async checkExistingQuestions(questions) {
    return false;
  }

  async getUserNameDetails() {
    return [];
  }

  async getPageNameDetails() {
    return [];
  }

  async getAccessType() {
    return [];
  }

  async checkExistingReignName(name) {
    return false;
  }

  async getAllDesignationList() {
  try {
    console.log('Fetching designation list');

    const response = await axios.get(
      'https://localhost:44382/api/UserMaster/GetDesignationList',
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // DEV ONLY
        })
      }
    );

    console.log('RAW designation response:', response.data);

    const designations = response.data;

    // 🛡️ Safety guard
    if (!Array.isArray(designations)) {
      console.error('Expected array, received:', designations);
      return [];
    }

    return designations.map((d, index) =>
      new DesignationViewModel({
        srNo: d.srNo ?? index + 1,
        designationId: d.designationId,
        designation: d.designation,
        isActive: d.isActive
      })
    );

  } catch (error) {
    console.error(
      '[UserMasterService] getAllDesignationList error:',
      error.response?.data || error.message
    );
    throw error;
  }
}

  async checkExistingDesignationName(descName) {
    return false;
  }

 async getBranchListForDDL() {
  try {
    console.log('Fetching branch list for DDL');

    const response = await axios.get(
      'https://localhost:44382/api/UserMaster/getBranchlist',
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // DEV ONLY
        })
      }
    );

    console.log('RAW branch response:', response.data);

    const branches = response.data;

    // 🛡️ Safety guard
    // if (!Array.isArray(branches)) {
    //   console.error('Expected array, received:', branches);
    //   return [];
    // }

 return branches.map(b =>
  new BranchDDLViewModel({
    branchCode: b.branchCode,
    branchLocation: b.branchLocation
  })
);


  } catch (error) {
    console.error(
      '[UserMasterService] getBranchListForDDL error:',
      error.response?.data || error.message
    );
    throw error;
  }
}

  async checkExistingEmpId(empId) {
    return false;
  }
}

module.exports = MasterService;
