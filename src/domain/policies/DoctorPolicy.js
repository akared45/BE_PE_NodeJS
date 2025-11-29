class DoctorPolicy {
    static canViewPatient(actor, targetUser) {
        return actor.isDoctor() && targetUser.isPatient();
    }

    static canEditOwnProfile(actor, targetUser) {
        return actor.isDoctor() && actor.id.equals(targetUser.id);
    }

    static canViewOtherDoctor(actor, targetUser) {
        return actor.isDoctor() && targetUser.isDoctor();
    }
}
module.exports = DoctorPolicy;
