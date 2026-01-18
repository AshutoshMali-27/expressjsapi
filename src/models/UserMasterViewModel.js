class UserMasterViewModel {
  constructor({
    srNo = null,
    userId = null,
    userName = null,
    password = null,
    emailId = null,
    mobile = null,
    roleId = null,
    empCode = null,
    branchCode = null,
    branchLocation = null,
    designation = null,
    isActive = null,
    allowDownloadData = null,
    masK_Access = null,
    macM_Access = null,
    createdOn = null,
    createdBy = null,
    role = null,
    fullName = null,
    unmaskpi = null
  } = {}) {
    this.srNo = srNo;
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.emailId = emailId;
    this.mobile = mobile;
    this.roleId = roleId;
    this.empCode = empCode;
    this.branchCode = branchCode;
    this.branchLocation = branchLocation;
    this.designation = designation;
    this.isActive = isActive;
    this.allowDownloadData = allowDownloadData;
    this.masK_Access = masK_Access;
    this.macM_Access = macM_Access;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
    this.role = role;
    this.fullName = fullName;
    this.unmaskpi = unmaskpi;
  }
}

module.exports = UserMasterViewModel;
