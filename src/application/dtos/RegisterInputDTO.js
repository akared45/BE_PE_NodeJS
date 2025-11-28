class RegisterInputDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.username = data.username;
    this.userType = data.userType;
    this.profile = {
      fullName: data.profile.fullName,
      dateOfBirth: data.profile.dateOfBirth,
      gender: data.profile.gender,
      avataUrl: data.profile.avataUrl,
    };
  }
}

module.exports = RegisterInputDTO;
