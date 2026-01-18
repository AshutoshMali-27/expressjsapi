class roleMaster {
  constructor({ srNo = null, roleId = null, role = null, createdOn = null, createdBy = null, roleCreatedBy = null, isActive = 1 } = {}) 
  {
    this.srNo = srNo;                 // number
    this.roleId = roleId;             // number
    this.role = role;                 // string
    this.createdOn = createdOn;       // Date or string
    this.createdBy = createdBy;       // number
    this.roleCreatedBy = roleCreatedBy; // string
    this.isActive = isActive;         // number (0 or 1)
  }
}

module.exports = roleMaster;