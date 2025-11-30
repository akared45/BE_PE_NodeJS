const bcrypt = require('bcryptjs');
const hash = (p) => bcrypt.hashSync(p, 10);

// ================= SPECIALIZATIONS (OK) =================
exports.specializations = [
    {
        _id: "CARD",
        name: "Tim mạch",
        category: "INTERNAL",
        base_fee: 500000,
        increment: 100000,
        fee_structure: { "0-4": 0, "5-9": 1, "10-14": 2, "15+": 3 }
    },
];

// ================= MEDICATIONS =================
exports.medications = [
    {
        _id: "PARA500",
        name: "Paracetamol 500mg",
        generic: "Paracetamol",
        class: "ANALG",
        common_dosage: "1-2 viên/lần"
    },
];

// ================= USERS =================
exports.userSeeds = () => [
    {
        _id: "U001",
        username: "patient01",
        email: "patient01@email.com",
        passwordHash: hash("123456"),
        userType: "patient",
        isActive: true,
        createdAt: new Date("2024-01-01T10:00:00Z"),
        profile: {
            fullName: "Nguyễn Văn A",
            dateOfBirth: new Date("1990-05-15"),
            gender: "Male",
            avatarUrl: "/avatars/u001.jpg"
        },
        contacts: [
            { type: "phone", value: "123456789", isPrimary: true },
            { type: "email", value: "patient@email.com", isPrimary: true }
        ],
        medicalConditions: [
            {
                name: "Tiểu đường type 2",
                diagnosedDate: new Date("2020-03-15"),
                status: "chronic",
                treatmentPlan: "Kiểm soát bằng Metformin",
                notes: "Theo dõi đường huyết"
            }
        ],
        allergies: [
            {
                name: "Penicillin",
                severity: "high",
                reaction: "Sốc phản vệ",
                notes: "Tránh sử dụng"
            }
        ]
    },
    {
        _id: "U002",
        username: "doctor01",
        email: "doctor01@email.com",
        passwordHash: hash("123456"),
        userType: "doctor",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        profile: {
            fullName: "BS. Trần Văn C",
            dateOfBirth: new Date("1980-03-10"),
            gender: "Male",
            avatarUrl: "/avatars/doctor01.jpg"
        },
        licenseNumber: "BS-12345",
        specCode: "CARD",
        yearsExperience: 10,
        rating: 4.8,
        reviewCount: 47,
        bio: "Chuyên gia tim mạch hàng đầu...",
        fee: { base: 500000, increment: 100000, level: "senior", final: 700000 },
        schedules: [
            { day: "Monday", start: "08:00", end: "12:00", maxPatients: 10 },
            { day: "Wednesday", start: "13:00", end: "17:00", maxPatients: 8 }
        ],
        unavailableDates: [
            { date: new Date("2024-12-25"), reason: "Holiday", allDay: true },
            { start: new Date("2024-06-15"), end: new Date("2024-06-17"), reason: "Conference" }
        ]
    },
    {
        _id: "U003",
        username: "admin01",
        email: "admin@telemedicine.com",
        passwordHash: hash("admin123"),
        userType: "admin",
        isActive: true,
        createdAt: new Date(),
        profile: {
            fullName: "Quản trị viên",
            gender: "Male",
            avatarUrl: "/avatars/admin.jpg"
        }
    }
];


// ================= APPOINTMENTS=================
exports.appointmentSeeds = [
    {
        _id: "A001",
        patientId: "U001",
        doctorId: "U002",
        type: "video",
        appointmentDate: new Date("2024-01-15T09:00:00Z"),
        durationMinutes: 30,
        status: "completed",
        calculatedFee: 700000,
        symptoms: "Đau đầu, sốt",
        doctorNotes: "Bệnh nhân cần nghỉ ngơi",
        createdAt: new Date("2024-01-10T08:00:00Z"),
        symptomDetails: [
            { name: "Đau đầu", severity: "medium" },
            { name: "Sốt", severity: "high" }
        ],
        prescriptions: [
            {
                medCode: "PARA500",
                dosage: "1 viên",
                frequency: "3 lần/ngày",
                duration: "5 ngày",
                instructions: "Sau khi ăn"
            }
        ],
        messages: [
            {
                sender: "U001",
                type: "text",
                content: "Xin chào bác sĩ...",
                ts: new Date("2024-01-15T08:30:00Z"),
                read: true
            }
        ]
    }
];

// ================= NOTIFICATIONS =================
exports.notificationSeeds = [
    {
        _id: "NOT001",
        userId: "U001",
        type: "appointment_reminder",
        title: "Lịch hẹn sắp tới",
        message: "Bạn có lịch hẹn với Dr. Trần Thị B vào 9:00 ngày 15/01",
        read: false,
        createdAt: new Date("2024-01-14T09:00:00Z"),
        expiresAt: new Date("2024-01-16T09:00:00Z")
    }
];

// ================= USER SESSIONS =================
exports.userSessions = [
    {
        _id: "SESS001",
        userId: "U001",
        refreshToken: "xxx",
        expiresAt: new Date("2025-01-08T10:00:00Z"),
        revoked: false
    }
];