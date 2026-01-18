class DesignationViewModel {
  constructor({
    srNo,
    designationId,
    designation,
    isActive
  }) {
    this.srNo = srNo;
    this.designationId = designationId;
    this.designation = designation;
    this.isActive = isActive;
  }
}

module.exports = DesignationViewModel;
