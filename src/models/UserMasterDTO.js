// src/dtos/UserMasterDTO.js
class UserMasterDTO {
  constructor(data) {
    this.userId = data.userId ?? null;
    this.userName = data.userName ?? null;
    this.password = data.password ?? null;
    this.emailId = data.emailId ?? null;
    this.mobile = data.mobile ?? null;
    this.roleId = data.roleId ?? null;
    this.empCode = data.empCode ?? null;
    this.branchCode = data.branchCode ?? null;
    this.designation = data.designation ?? null;
    this.isActive = data.isActive ?? 0;
    this.allowDownloadData = data.allowDownloadData ?? 0;
    this.masK_Access = data.masK_Access ?? 0;
    this.macM_Access = data.macM_Access ?? 0;
    this.createdOn = data.createdOn ?? null;
    this.createdBy = data.createdBy ?? null;
    this.flag = data.flag ?? null;
    this.unmaskpi = data.unmaskpi ?? 0;
    this.fullName = data.fullName ?? null;
  }
}

module.exports = UserMasterDTO;
