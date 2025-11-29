class PatientPolicy {
    static canViewOwnProfile(actor, targetUser) {
        return actor.isPatient() && actor.id.equals(targetUser.id);
    }

    static canViewDoctor(actor, targetUser) {
        return actor.isPatient() && targetUser.isDoctor();
    }
}
module.exports = PatientPolicy;
