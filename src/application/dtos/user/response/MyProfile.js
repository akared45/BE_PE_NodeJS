class MyProfile {
  constructor(user) {
    this.id = user.id.toString();
    this.username = user.username;
    this.email = user.email;
    this.role = user.role.value;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt.toISOString();
    this.profile = {
      fullName: user.profile.fullName,
      dateOfBirth: user.profile.dateOfBirth ? user.profile.dateOfBirth.toISOString().split('T')[0] : null,
      gender: user.profile.gender,
      avatarUrl: user.profile.avatarUrl || '/avatars/default.jpg'
    };
    this.contacts = user.contacts;

    if (user.isPatient()) {
      this.medicalRecord = {
        medicalConditions: user.medicalConditions,
        allergies: user.allergies
      };
    }

    if (user.isDoctor()) {
      this.doctorInfo = {
        licenseNumber: user.licenseNumber,
        specCode: user.specCode,
        yearsExperience: user.yearsExperience,
        rating: Number(user.rating).toFixed(1),
        reviewCount: user.reviewCount,
        bio: user.bio,
        fee: {
          base: user.fee.base.toNumber(),
          increment: user.fee.increment.toNumber(),
          final: user.fee.final.toNumber()
        },
        schedules: user.schedules,
        unavailableDates: user.unavailableDates
      };
    }
  }
}
module.exports = MyProfile;