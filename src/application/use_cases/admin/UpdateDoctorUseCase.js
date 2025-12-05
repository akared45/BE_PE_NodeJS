const { Action, Resource } = require('../../../domain/enums/Permission');
const { AuthorizationException, NotFoundException } = require('../../../domain/exceptions');

class UpdateDoctorUseCase {
    constructor({ userRepository, authorizationService }) {
        this.userRepository = userRepository;
        this.authorizationService = authorizationService;
    }

    async execute(request) {
        console.log("\n🔍 [UpdateDoctorUseCase] --- START ---");
        
        // 1. Log dữ liệu đầu vào từ Controller
        console.log("📥 [Input] Request Data:", JSON.stringify(request, null, 2));

        const { 
            currentUserId, targetDoctorId, 
            fullName, licenseNumber, specCode, isActive, 
            qualifications, workHistory, bio 
        } = request;

        // 2. Check Admin
        const actor = await this.userRepository.findById(currentUserId);
        if (!actor) throw new AuthorizationException("User performing update not found");

        // 3. Check Target Doctor
        const targetDoctor = await this.userRepository.findById(targetDoctorId);
        if (!targetDoctor || !targetDoctor.isDoctor()) {
            throw new NotFoundException("Target doctor does not exist");
        }
        console.log("✅ [Check] Target Doctor found:", targetDoctor.username);

        // 4. Check Quyền
        const canUpdate = this.authorizationService.can(
            actor, Action.UPDATE, Resource.DOCTOR, targetDoctor
        );
        if (!canUpdate) throw new AuthorizationException("Permission denied");

        // 5. THỰC HIỆN UPDATE
        console.log("⚙️ [Process] Calling updateDetails...");
        
        const updatedDoctor = targetDoctor.updateDetails({
            fullName,
            licenseNumber,
            specCode,
            isActive,
            qualifications,
            workHistory,
            bio
        });

        // 6. LOG QUAN TRỌNG: Kiểm tra Entity sau khi update nhưng TRƯỚC KHI LƯU
        // Để đảm bảo các trường cũ (schedules) không bị mất và trường mới đã vào
        console.log("👀 [Inspect] Entity BEFORE Save:");
        console.log("   - Bio:", updatedDoctor.bio);
        console.log("   - Schedules Count:", updatedDoctor.schedules?.length); // Check xem có bị mất lịch không
        console.log("   - Qualifications:", updatedDoctor.qualifications?.length);
        console.log("   - WorkHistory:", updatedDoctor.workHistory?.length);

        // 7. Lưu xuống DB
        await this.userRepository.save(updatedDoctor);
        console.log("💾 [DB] Save executed successfully.");

        console.log("🔍 [UpdateDoctorUseCase] --- END ---\n");

        return {
            message: "Doctor updated successfully",
            id: updatedDoctor.id.toString()
        };
    }
}

module.exports = UpdateDoctorUseCase;