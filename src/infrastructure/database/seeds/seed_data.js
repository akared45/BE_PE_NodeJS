const bcrypt = require('bcrypt');
const hash = (p) => bcrypt.hashSync(p, 10);

// ================= SPECIALIZATIONS =================
exports.specializations = [
    {
        _id: "CARD",
        name: "Tim mạch",
        category: "INTERNAL",
        base_fee: 500000,
        increment: 100000,
        fee_structure: { "0-4": 0, "5-9": 1, "10-14": 2, "15+": 3 }
    },
    {
        _id: "DERM",
        name: "Da liễu",
        category: "INTERNAL",
        base_fee: 400000,
        increment: 80000,
        fee_structure: { "0-4": 0, "5-9": 1, "10-14": 2, "15+": 3 }
    },
    {
        _id: "PEDI",
        name: "Nhi khoa",
        category: "NHI",
        base_fee: 350000,
        increment: 70000,
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
    {
        _id: "VITC100",
        name: "Vitamin C 100mg",
        generic: "Ascorbic Acid",
        class: "VITAMIN",
        common_dosage: "1 viên/ngày"
    },
    {
        _id: "AMOX500",
        name: "Amoxicillin 500mg",
        generic: "Amoxicillin",
        class: "ANTIBIOTIC",
        common_dosage: "1 viên/3 lần/ngày"
    }
];

// ================= USERS =================
exports.userSeeds = () => [
    {
        _id: "U001",
        username: "patient01",
        email: "patient01@email.com",
        password_hash: hash("123456"),
        user_type: "patient",
        is_active: true,
        created_at: new Date("2024-01-01T10:00:00Z"),
        profile: {
            full_name: "Nguyễn Văn A",
            date_of_birth: new Date("1990-05-15"),
            gender: "Male",
            avatar_url: "/avatars/u001.jpg"
        },
        contacts: [
            { type: "phone", value: "123456789", is_primary: true },
            { type: "email", value: "patient@email.com", is_primary: true }
        ],
        medical_conditions: [
            {
                name: "Tiểu đường type 2",
                diagnosed_date: new Date("2020-03-15"),
                status: "chronic",
                treatment_plan: "Kiểm soát bằng Metformin",
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
        password_hash: hash("123456"),
        user_type: "doctor",
        is_active: true,
        created_at: new Date("2024-01-01"),
        profile: {
            full_name: "BS. Trần Văn C",
            date_of_birth: new Date("1980-03-10"),
            gender: "Male",
            avatar_url: "/avatars/doctor01.jpg"
        },
        license_number: "BS-12345",
        spec_code: "CARD",
        years_experience: 10,
        rating: 4.8,
        review_count: 47,
        bio: "Chuyên gia tim mạch hàng đầu...",
        fee: { base: 500000, increment: 100000, level: "senior", final: 700000 },
        schedules: [
            { day: "Monday", start: "08:00", end: "12:00", max_patients: 10 },
            { day: "Wednesday", start: "13:00", end: "17:00", max_patients: 8 }
        ],
        unavailable_dates: [
            { date: new Date("2024-12-25"), reason: "Holiday", all_day: true },
            { start: new Date("2024-06-15"), end: new Date("2024-06-17"), reason: "Conference" }
        ]
    },
    {
        _id: "U003",
        username: "admin01",
        email: "admin@telemedicine.com",
        password_hash: hash("admin123"),
        user_type: "admin",
        is_active: true,
        created_at: new Date(),
        profile: {
            full_name: "Quản trị viên",
            gender: "Male",
            avatar_url: "/avatars/admin.jpg"
        }
    }
];


// ================= APPOINTMENTS =================
exports.appointmentSeeds = [
    {
        _id: "A001",
        patient_id: "U001",
        doctor_id: "U002",
        type: "video",
        appointment_date: new Date("2024-01-15T09:00:00Z"),
        duration_minutes: 30,
        status: "completed",
        calculated_fee: 700000,
        symptoms: "Đau đầu, sốt",
        doctor_notes: "Bệnh nhân cần nghỉ ngơi",
        created_at: new Date("2024-01-10T08:00:00Z"),
        symptom_details: [
            { name: "Đau đầu", severity: "medium" },
            { name: "Sốt", severity: "high" }
        ],
        prescriptions: [
            {
                med_code: "PARA500",
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
        user_id: "U001",
        type: "appointment_reminder",
        title: "Lịch hẹn sắp tới",
        message: "Bạn có lịch hẹn với Dr. Trần Thị B vào 9:00 ngày 15/01",
        read: false,
        created_at: new Date("2024-01-14T09:00:00Z"),
        expires_at: new Date("2024-01-16T09:00:00Z")
    }
];

// ================= USER SESSIONS =================
exports.userSessions = [
    {
        _id: "SESS001",
        user_id: "U001",
        refresh_token: "xxx",
        expires_at: new Date("2025-01-08T10:00:00Z"),
        revoked: false
    }
];
