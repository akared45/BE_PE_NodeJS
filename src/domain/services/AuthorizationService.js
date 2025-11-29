const { AuthorizationException } = require('../exceptions');
const AdminPolicy = require('../policies/AdminPolicy');
const DoctorPolicy = require('../policies/DoctorPolicy');
const PatientPolicy = require('../policies/PatientPolicy');

class AuthorizationService {

    static requireAdmin(actor) {
        if (!AdminPolicy.canDoAnything(actor))
            throw new AuthorizationException('Admin only');
    }

    static requireDoctorCanViewPatient(actor, patient) {
        if (!DoctorPolicy.canViewPatient(actor, patient))
            throw new AuthorizationException('Doctors can only view patients');
    }

    static requireCanEditOwnProfile(actor, target) {
        if (actor.isAdmin()) return;
        if (!DoctorPolicy.canEditOwnProfile(actor, target) &&
            !PatientPolicy.canViewOwnProfile(actor, target)) {
            throw new AuthorizationException('You can edit only your own profile');
        }
    }

    static requirePatientViewDoctor(actor, doctor) {
        if (!PatientPolicy.canViewDoctor(actor, doctor))
            throw new AuthorizationException('Patients can only view doctors');
    }
}
module.exports = AuthorizationService;
