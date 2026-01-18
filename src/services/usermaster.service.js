const IUserMasterService = require('../interfaces/usermaster.service.interface');
const UserMasterViewModel = require('../models/UserMasterViewModel');
const https = require('https');
const axios = require('axios');
class UserMasterService extends IUserMasterService {

 async getAllUserDetails() {
    try {
      const response = await axios.get('https://localhost:44382/api/UserMaster/getuserDetails', {
              httpsAgent: new (require('https').Agent)
              (
                { rejectUnauthorized: false }
              )
            }
          );

      const usersData = response.data;
      return usersData.map((u, index) => new UserMasterViewModel({
        srNo: u.srNo ?? index + 1,
        userId: u.userId,
        userName: u.userName,
        password: u.password, // consider removing before response if sensitive
        emailId: u.emailId,
        mobile: u.mobile,
        roleId: u.roleId,
        empCode: u.empCode,
        branchCode: u.branchCode,
        branchLocation: u.branchLocation,
        designation: u.designation,
        isActive: u.isActive,
        allowDownloadData: u.allowDownloadData,
        masK_Access: u.masK_Access,
        macM_Access: u.macM_Access,
        createdOn: u.createdOn ? new Date(u.createdOn) : null,
        createdBy: u.createdBy,
        role: u.role,
        fullName: u.fullName,
        unmaskpi: u.unmaskpi
      }));

    } catch (error) {
      console.error('[UserMasterService] getAllUserDetails error:', error.message);
      throw error;
    }
  }

  
  async getUserDataOnUserId(userId) {
   try{
    const response = await axios.get(
      'https://localhost:44382/api/UserMaster/getuserdetailbyid',
      {
        params: { userid: userId },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // DEV ONLY
        })
      }
    );

    if (!Array.isArray(response.data)) {
      console.error('Expected array, received:', response.data);
      return [];
    }
const userdata = response.data;
    return userdata.map((u, index) =>
      new UserMasterViewModel({
        srNo: u.srNo ?? index + 1,
        userId: u.userId,
        userName: u.userName,
        // 🚫 NEVER expose password
        emailId: u.emailId,
        mobile: u.mobile,
        roleId: u.roleId,
        empCode: u.empCode,
        branchCode: u.branchCode,
        branchLocation: u.branchLocation,
        designation: u.designation,
        isActive: u.isActive,
        allowDownloadData: u.allowDownloadData,
        masK_Access: u.masK_Access,
        macM_Access: u.macM_Access,
        createdOn: u.createdOn ? new Date(u.createdOn) : null,
        createdBy: u.createdBy,
        role: u.role,
        fullName: u.fullName,
        unmaskpi: u.unmaskpi
      })
    );
     

   }catch(error){
    console.error('[UserMasterService] getUserDataOnUserId error:', error.message);
    throw error;
   }
  }

  async setUserMaster(user) {
    try {
      console.log('setUserMaster called with:', user);

      const response = await axios.post(
        'https://localhost:44382/api/UserMaster/SetUserMaster',
        user, // DTO goes directly as body
        {
          headers: {
            'Content-Type': 'application/json'
          },
          httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
          })
        }
      );

      console.log('API response:', response.data);
      return response.data;

    } catch (error) {
      console.error('[UserMasterService] setUserMaster error:',
        error.response?.data || error.message
      );
      throw error;
    }
  }


 async updateUserMaster(user) {
  try {
    console.log('Updating user master for userId:', user.userId);

    const response = await axios.post(
      'https://localhost:44382/api/UserMaster/Updateuserdetails',
      user, // request body
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // DEV ONLY
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Update response:', response.data);
    return response.data; 

  } catch (error) {
    console.error('[UserMasterService] updateUserMaster error:',
      error.response?.data || error.message
    );
    throw error;
  }
}
}

module.exports = UserMasterService;
