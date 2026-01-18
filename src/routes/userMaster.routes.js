// src/routes/usermaster.routes.js
const express = require('express');
const router = express.Router();

/**
 * All requests use the controller created per request in scopedContainer middleware
 * Available at req.userMasterController
 */

// ------------------- Roles -------------------
/**
 * @swagger
 * /api/usermaster/GetRoleList:
 *   get:
 *     summary: Get all roles
 *     tags: [UserMaster]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get('/GetRoleList', (req, res, next) =>
  req.userMasterController.getRoleList(req, res, next)
);

// ------------------- Users -------------------
/**
 * @swagger
 * /api/usermaster/getuserDetails:
 *   get:
 *     summary: Get all users
 *     tags: [UserMaster]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/getuserDetails', (req, res, next) =>
  req.userMasterController.getUserDetails(req, res, next)
);

/**
 * @swagger
 * /api/usermaster/getuserdetailbyid:
 *   get:
 *     summary: Get user by ID
 *     tags: [UserMaster]
 *     parameters:
 *       - in: query
 *         name: userid
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details by ID
 */
router.get('/getuserdetailbyid', (req, res, next) =>
  req.userMasterController.getUserDetailById(req, res, next)
);

// ------------------- Create / Update -------------------
/**
 * @swagger
 * /api/UserMaster/SetUserMaster:
 *   post:
 *     summary: Create or update user
 *     tags:
 *       - UserMaster
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 0
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: Pass@123
 *               emailId:
 *                 type: string
 *                 example: john@example.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               empCode:
 *                 type: string
 *                 example: EMP001
 *               branchCode:
 *                 type: string
 *                 example: BR01
 *               designation:
 *                 type: string
 *                 example: Manager
 *               isActive:
 *                 type: integer
 *                 example: 1
 *               allowDownloadData:
 *                 type: integer
 *                 example: 1
 *               masK_Access:
 *                 type: integer
 *                 example: 0
 *               macM_Access:
 *                 type: integer
 *                 example: 0
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *               flag:
 *                 type: string
 *                 example: I
 *               unmaskpi:
 *                 type: integer
 *                 example: 0
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: User saved successfully
 *       500:
 *         description: Failed to create user
 */
router.post('/SetUserMaster', (req, res, next) =>
  req.userMasterController.setUserMaster(req, res, next)
);

/**
 * @swagger
 * /api/usermaster/Updateuserdetails:
 *   post:
 *     summary: Update existing user
 *     tags: [UserMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User updated
 */
router.post('/Updateuserdetails', (req, res, next) =>
  req.userMasterController.updateUserMaster(req, res, next)
);

// ------------------- Checks -------------------
/**
 * @swagger
 * /api/usermaster/CheckExistingemailid:
 *   get:
 *     summary: Check if email exists
 *     tags: [UserMaster]
 *     parameters:
 *       - in: query
 *         name: emailid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boolean value
 */
router.get('/CheckExistingemailid', (req, res, next) =>
  req.userMasterController.checkExistingEmailId(req, res, next)
);

/**
 * @swagger
 * /api/usermaster/checkexistingempid:
 *   get:
 *     summary: Check if employee ID exists
 *     tags: [UserMaster]
 *     parameters:
 *       - in: query
 *         name: empid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boolean value
 */
router.get('/checkexistingempid', (req, res, next) =>
  req.userMasterController.checkExistingEmpId(req, res, next)
);

/**
 * @swagger
 * /api/usermaster/CheckExistingmobileno:
 *   get:
 *     summary: Check if mobile number exists
 *     tags: [UserMaster]
 *     parameters:
 *       - in: query
 *         name: mobileno
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Boolean value
 */
router.get('/CheckExistingmobileno', (req, res, next) =>
  req.userMasterController.checkExistingMobileNo(req, res, next)
);

// ------------------- Designations & Branches -------------------
/**
 * @swagger
 * /api/usermaster/GetDesignationList:
 *   get:
 *     summary: Get all designations
 *     tags: [UserMaster]
 *     responses:
 *       200:
 *         description: List of designations
 */
router.get('/GetDesignationList', (req, res, next) =>
  req.userMasterController.getDesignationList(req, res, next)
);

/**
 * @swagger
 * /api/usermaster/getBranchlist:
 *   get:
 *     summary: Get all branches
 *     tags: [UserMaster]
 *     responses:
 *       200:
 *         description: List of branches
 */
router.get('/getBranchlist', (req, res, next) =>
  req.userMasterController.getBranchList(req, res, next)
);

module.exports = router;
