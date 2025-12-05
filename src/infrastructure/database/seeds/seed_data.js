const bcrypt = require('bcryptjs');
const hash = (p) => bcrypt.hashSync(p, 10);

// ================= SPECIALIZATIONS =================
exports.specializations = [
    {
        _id: "CARD",
        name: "Tim mạch",
        category: "INTERNAL"
    },
    {
        _id: "NEURO",
        name: "Thần kinh",
        category: "INTERNAL"
    },
    {
        _id: "GASTRO",
        name: "Tiêu hóa",
        category: "INTERNAL"
    },
    {
        _id: "PULMO",
        name: "Hô hấp",
        category: "INTERNAL"
    },
    {
        _id: "ENDO",
        name: "Nội tiết",
        category: "INTERNAL"
    },
    {
        _id: "DERMA",
        name: "Da liễu",
        category: "EXTERNAL"
    },
    {
        _id: "PEDIA",
        name: "Nhi khoa",
        category: "PEDIATRIC"
    },
    {
        _id: "OBGYN",
        name: "Sản phụ khoa",
        category: "WOMEN"
    },
    {
        _id: "PSYCH",
        name: "Tâm thần",
        category: "MENTAL"
    },
    {
        _id: "ORTHO",
        name: "Chỉnh hình",
        category: "SURGICAL"
    }
];

// ================= MEDICATIONS =================
exports.medications = [
    {
        _id: "PARA500",
        name: "Paracetamol 500mg",
        generic: "Paracetamol",
        class: "ANALG",
        commonDosage: "1-2 viên/lần"
    },
    {
        _id: "IBU400",
        name: "Ibuprofen 400mg",
        generic: "Ibuprofen",
        class: "NSAID",
        commonDosage: "1 viên/lần"
    },
    {
        _id: "AMOX500",
        name: "Amoxicillin 500mg",
        generic: "Amoxicillin",
        class: "ANTIBIOTIC",
        commonDosage: "1 viên x 3 lần/ngày"
    },
    {
        _id: "OMEP20",
        name: "Omeprazole 20mg",
        generic: "Omeprazole",
        class: "PPI",
        commonDosage: "1 viên/ngày"
    },
    {
        _id: "LOSA50",
        name: "Losartan 50mg",
        generic: "Losartan",
        class: "ARB",
        commonDosage: "1 viên/ngày"
    },
    {
        _id: "METF850",
        name: "Metformin 850mg",
        generic: "Metformin",
        class: "ANTIDIABETIC",
        commonDosage: "1 viên x 2 lần/ngày"
    },
    {
        _id: "ATOR20",
        name: "Atorvastatin 20mg",
        generic: "Atorvastatin",
        class: "STATIN",
        commonDosage: "1 viên/ngày"
    },
    {
        _id: "CETI10",
        name: "Cetirizine 10mg",
        generic: "Cetirizine",
        class: "ANTIHISTAMINE",
        commonDosage: "1 viên/ngày"
    },
    {
        _id: "SERT50",
        name: "Sertraline 50mg",
        generic: "Sertraline",
        class: "SSRI",
        commonDosage: "1 viên/ngày"
    },
    {
        _id: "ALPR05",
        name: "Alprazolam 0.5mg",
        generic: "Alprazolam",
        class: "BENZODIAZEPINE",
        commonDosage: "1/2-1 viên khi cần"
    }
];

exports.userSeeds = () => {
    const baseDate = new Date("2024-01-01T10:00:00Z");
    
    // Tạo 10 bệnh nhân
    const patients = [];
    for (let i = 1; i <= 10; i++) {
        const patientNum = i.toString().padStart(2, '0');
        patients.push({
            _id: `PAT${patientNum}`,
            username: `patient${patientNum}`,
            email: `patient${patientNum}@email.com`,
            passwordHash: hash("123456"),
            userType: "patient",
            isActive: true,
            createdAt: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
            isDeleted: i === 9, // Chỉ patient 09 bị xóa
            deletedAt: i === 9 ? new Date("2024-06-15T14:30:00Z") : null,
            profile: {
                fullName: `Nguyễn Văn ${String.fromCharCode(64 + i)}`,
                dateOfBirth: new Date(1990 - (i % 10), (i % 12), 15),
                gender: i % 2 === 0 ? "Female" : "Male",
                avatarUrl: `/avatars/patient${patientNum}.jpg`,
                address: `Số ${i * 10}, Đường ABC, Quận ${i}, TP.HCM`,
                bloodType: ["A", "B", "AB", "O"][i % 4],
                height: 160 + (i % 20),
                weight: 50 + (i % 15)
            },
            contacts: [
                { type: "phone", value: `0987${10000 + i}`, isPrimary: true },
                { type: "email", value: `patient${patientNum}@email.com`, isPrimary: true }
            ],
            medicalConditions: [
                {
                    name: i % 3 === 0 ? "Tiểu đường type 2" : 
                           i % 3 === 1 ? "Cao huyết áp" : "Hen suyễn",
                    diagnosedDate: new Date(2020 - (i % 5), (i % 12), 15),
                    status: i % 2 === 0 ? "chronic" : "controlled",
                    treatmentPlan: i % 3 === 0 ? "Kiểm soát bằng Metformin" : 
                                   i % 3 === 1 ? "Thuốc huyết áp hàng ngày" : "Xịt Ventolin khi cần",
                    notes: `Theo dõi định kỳ ${i} tháng/lần`
                }
            ],
            allergies: [
                {
                    name: i % 2 === 0 ? "Penicillin" : "Sulfa",
                    severity: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
                    reaction: i % 2 === 0 ? "Sốc phản vệ" : "Phát ban",
                    notes: "Tránh sử dụng"
                }
            ],
            emergencyContacts: [
                {
                    name: `Trần Thị ${String.fromCharCode(64 + i)}`,
                    relationship: i % 2 === 0 ? "Vợ" : "Chồng",
                    phone: `0909${20000 + i}`,
                    isPrimary: true
                }
            ]
        });
    }

    // Tạo 10 bác sĩ
    const doctors = [];
    for (let i = 1; i <= 10; i++) {
        const docNum = i.toString().padStart(2, '0');
        const specializations = ["CARD", "NEURO", "GASTRO", "PULMO", "ENDO", 
                               "DERMA", "PEDIA", "OBGYN", "PSYCH", "ORTHO"];
        
        doctors.push({
            _id: `DOC${docNum}`,
            username: `doctor${docNum}`,
            email: `doctor${docNum}@hospital.com`,
            passwordHash: hash("123456"),
            userType: "doctor",
            isActive: i !== 8, // Doctor 08 không active
            createdAt: new Date(baseDate.getTime() + i * 2 * 24 * 60 * 60 * 1000),
            isDeleted: i === 7, // Chỉ doctor 07 bị xóa
            deletedAt: i === 7 ? new Date("2024-08-20T09:15:00Z") : null,
            profile: {
                fullName: `BS. ${i % 2 === 0 ? 'Trần' : 'Lê'} Thị ${String.fromCharCode(65 + (i % 26))}`,
                dateOfBirth: new Date(1980 - (i % 10), (i % 12), 10),
                gender: i % 3 === 0 ? "Male" : "Female",
                avatarUrl: `/avatars/doctor${docNum}.jpg`,
                bio: `Chuyên gia về ${["Tim mạch", "Thần kinh", "Tiêu hóa", "Hô hấp", "Nội tiết",
                                      "Da liễu", "Nhi khoa", "Sản phụ khoa", "Tâm thần", "Chỉnh hình"][i-1]} với ${10 + i} năm kinh nghiệm.`
            },
            licenseNumber: `BS-${10000 + i}`,
            specCode: specializations[i-1],
            yearsExperience: 10 + i,
            rating: 4.0 + (i * 0.08),
            reviewCount: i * 15,
            consultationFee: 500000 + (i * 50000),
            schedules: [
                { 
                    day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][i % 5],
                    start: "08:00",
                    end: "12:00",
                    maxPatients: 10,
                    sessionType: "morning"
                },
                { 
                    day: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][i % 5],
                    start: "13:00",
                    end: "17:00",
                    maxPatients: 8,
                    sessionType: "afternoon"
                }
            ],
            unavailableDates: [
                { 
                    date: new Date(2024, 11, 25),
                    reason: "Nghỉ lễ",
                    allDay: true 
                },
                { 
                    start: new Date(2024, 5, 15 + i),
                    end: new Date(2024, 5, 17 + i),
                    reason: "Hội thảo y khoa"
                }
            ],
            qualifications: [
                { 
                    degree: "Bác sĩ Đa khoa",
                    institution: `Đại học Y Hà Nội`,
                    year: 2000 + (i % 5)
                },
                { 
                    degree: `Thạc sĩ ${["Tim mạch", "Thần kinh", "Tiêu hóa", "Hô hấp", "Nội tiết",
                                      "Da liễu", "Nhi khoa", "Sản phụ khoa", "Tâm thần", "Chỉnh hình"][i-1]}`,
                    institution: `Đại học Y Dược TP.HCM`,
                    year: 2005 + (i % 5)
                }
            ],
            workHistory: [
                { 
                    position: "Bác sĩ nội trú",
                    place: `Bệnh viện ${["Bạch Mai", "Chợ Rẫy", "Vinmec", "Hòa Hảo", "115"][i % 5]}`,
                    from: new Date(2005, 0, 1),
                    to: new Date(2010, 0, 1)
                },
                { 
                    position: `Trưởng khoa ${["Tim mạch", "Thần kinh", "Tiêu hóa", "Hô hấp", "Nội tiết",
                                             "Da liễu", "Nhi khoa", "Sản phụ khoa", "Tâm thần", "Chỉnh hình"][i-1]}`,
                    place: `Bệnh viện ${["Chợ Rẫy", "Bạch Mai", "115", "Vinmec", "Đại học Y Dược"][i % 5]}`,
                    from: new Date(2010, 1, 1),
                    to: null
                }
            ],
            languages: ["Vietnamese", i % 2 === 0 ? "English" : "French"],
            awards: [
                {
                    name: `Giải thưởng ${["Bác sĩ xuất sắc", "Đổi mới y học", "Phục vụ cộng đồng"][i % 3]}`,
                    year: 2020 - (i % 5),
                    organization: `Bộ Y tế`
                }
            ]
        });
    }

    // Tạo 10 admin (nhưng thực tế chỉ cần 1-2, tôi sẽ tạo 3 thôi)
    const admins = [];
    for (let i = 1; i <= 3; i++) {
        admins.push({
            _id: `ADM${i.toString().padStart(2, '0')}`,
            username: `admin${i}`,
            email: `admin${i}@telemedicine.com`,
            passwordHash: hash(`admin${i}123`),
            userType: "admin",
            isActive: true,
            createdAt: new Date(baseDate.getTime() + i * 3 * 24 * 60 * 60 * 1000),
            isDeleted: i === 3, // Admin thứ 3 bị xóa
            deletedAt: i === 3 ? new Date("2024-10-05T16:45:00Z") : null,
            profile: {
                fullName: `Quản trị viên ${i}`,
                gender: i % 2 === 0 ? "Female" : "Male",
                avatarUrl: `/avatars/admin${i}.jpg`,
                department: i === 1 ? "Technical" : i === 2 ? "Medical" : "Customer Support"
            }
        });
    }

    return [...patients, ...doctors, ...admins];
};

// ================= APPOINTMENTS =================
exports.appointmentSeeds = (function() {
    const appointments = [];
    const baseDate = new Date("2024-01-15T09:00:00Z");
    const statuses = ["completed", "confirmed", "pending", "cancelled", "no_show"];
    const types = ["video", "in_person", "phone"];
    const medications = ["PARA500", "IBU400", "AMOX500", "OMEP20", "LOSA50", 
                        "METF850", "ATOR20", "CETI10", "SERT50", "ALPR05"];
    
    for (let i = 1; i <= 10; i++) {
        const appNum = i.toString().padStart(3, '0');
        const patientNum = (i % 10 || 10).toString().padStart(2, '0');
        const doctorNum = ((i % 10) + 1).toString().padStart(2, '0');
        const appointmentDate = new Date(baseDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        
        appointments.push({
            _id: `APP${appNum}`,
            patientId: `PAT${patientNum}`,
            doctorId: `DOC${doctorNum}`,
            type: types[i % types.length],
            appointmentDate: appointmentDate,
            durationMinutes: i % 3 === 0 ? 15 : i % 3 === 1 ? 30 : 45,
            status: statuses[i % statuses.length],
            calculatedFee: 500000 + (i * 50000),
            symptoms: ["Đau đầu, sốt", "Ho, khó thở", "Đau bụng, buồn nôn", 
                      "Đau ngực", "Mất ngủ, lo âu", "Đau khớp", "Ngứa da", 
                      "Mệt mỏi kéo dài", "Chóng mặt", "Đau lưng"][i-1],
            doctorNotes: i % 2 === 0 ? "Bệnh nhân cần nghỉ ngơi" : 
                        i % 3 === 0 ? "Cần theo dõi thêm" : 
                        "Đã kê đơn thuốc",
            createdAt: new Date(appointmentDate.getTime() - 5 * 24 * 60 * 60 * 1000),
            symptomDetails: [
                { 
                    name: ["Đau đầu", "Sốt", "Ho", "Khó thở", "Đau bụng", 
                          "Buồn nôn", "Đau ngực", "Mất ngủ", "Lo âu", "Đau khớp"][i-1],
                    severity: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
                    durationDays: i * 2
                },
                { 
                    name: ["Mệt mỏi", "Chóng mặt", "Ớn lạnh", "Đổ mồ hôi", "Ngứa", 
                          "Sưng", "Tê", "Yếu", "Chán ăn", "Sụt cân"][i-1],
                    severity: i % 3 === 1 ? "high" : i % 3 === 2 ? "medium" : "low",
                    durationDays: i
                }
            ],
            prescriptions: [
                {
                    medicationCode: medications[i-1],
                    dosage: i % 3 === 0 ? "1 viên" : i % 3 === 1 ? "2 viên" : "1/2 viên",
                    frequency: i % 2 === 0 ? "3 lần/ngày" : "2 lần/ngày",
                    duration: `${i * 3} ngày`,
                    instructions: i % 2 === 0 ? "Sau khi ăn" : "Trước khi ăn",
                    refills: i % 3,
                    prescribedDate: appointmentDate
                }
            ],
            diagnosis: [
                {
                    code: `ICD-10-${i}`,
                    name: ["Cảm cúm", "Viêm phế quản", "Viêm dạ dày", "Rối loạn lo âu",
                          "Cao huyết áp", "Viêm khớp", "Viêm da dị ứng", "Mất ngủ",
                          "Tiểu đường", "Đau lưng cơ học"][i-1],
                    description: `Chẩn đoán chính cho bệnh nhân số ${i}`,
                    isPrimary: true
                }
            ],
            vitalSigns: {
                bloodPressure: `${120 + (i % 20)}/${80 + (i % 10)}`,
                heartRate: 70 + (i % 20),
                temperature: 36.5 + (i % 2),
                respiratoryRate: 16 + (i % 4),
                oxygenSaturation: 96 + (i % 3),
                measuredAt: new Date(appointmentDate.getTime() - 30 * 60 * 1000)
            },
            messages: [
                {
                    senderId: `PAT${patientNum}`,
                    type: "text",
                    content: `Xin chào bác sĩ, tôi có triệu chứng ${["đau đầu", "sốt", "ho", "đau bụng", "mất ngủ"][i % 5]}`,
                    timestamp: new Date(appointmentDate.getTime() - 60 * 60 * 1000),
                    read: true
                },
                {
                    senderId: `DOC${doctorNum}`,
                    type: "text",
                    content: `Chào bạn, tôi đã nhận được thông tin. Vui lòng chuẩn bị cho buổi tư vấn.`,
                    timestamp: new Date(appointmentDate.getTime() - 30 * 60 * 1000),
                    read: true
                }
            ],
            followUp: i % 4 === 0 ? {
                recommendedDate: new Date(appointmentDate.getTime() + 30 * 24 * 60 * 60 * 1000),
                reason: "Theo dõi tiến triển",
                testsRequired: ["Xét nghiệm máu", "Đo huyết áp 24h"][i % 2]
            } : null,
            payment: {
                amount: 500000 + (i * 50000),
                method: i % 3 === 0 ? "credit_card" : i % 3 === 1 ? "bank_transfer" : "cash",
                status: i % 2 === 0 ? "paid" : "pending",
                transactionId: `TRANS${1000 + i}`,
                paidAt: i % 2 === 0 ? new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000) : null
            }
        });
    }
    
    return appointments;
})();

// ================= NOTIFICATIONS =================
exports.notificationSeeds = (function() {
    const notifications = [];
    const baseDate = new Date("2024-01-14T09:00:00Z");
    const notificationTypes = ["appointment_reminder", "prescription_ready", 
                              "test_result", "payment_confirmation", "system_alert"];
    
    for (let i = 1; i <= 10; i++) {
        const notifNum = i.toString().padStart(3, '0');
        const patientNum = (i % 10 || 10).toString().padStart(2, '0');
        const doctorNum = ((i % 10) + 1).toString().padStart(2, '0');
        
        notifications.push({
            _id: `NOT${notifNum}`,
            userId: i % 3 === 0 ? `DOC${doctorNum}` : `PAT${patientNum}`,
            type: notificationTypes[i % notificationTypes.length],
            title: ["Lịch hẹn sắp tới", "Đơn thuốc đã sẵn sàng", "Kết quả xét nghiệm", 
                   "Xác nhận thanh toán", "Cảnh báo hệ thống"][i % 5],
            message: i % 3 === 0 ? 
                `Bác sĩ có lịch hẹn với bệnh nhân PAT${patientNum} vào ${9 + (i % 4)}:00 ngày ${15 + i}/01` :
                `Bạn có lịch hẹn với BS. ${["Trần", "Lê", "Nguyễn", "Phạm", "Hoàng"][i % 5]} vào ${9 + (i % 4)}:00 ngày ${15 + i}/01`,
            read: i % 4 === 0,
            priority: i % 3 === 0 ? "high" : i % 3 === 1 ? "medium" : "low",
            createdAt: new Date(baseDate.getTime() + i * 3 * 60 * 60 * 1000),
            expiresAt: new Date(baseDate.getTime() + (i + 2) * 24 * 60 * 60 * 1000),
            relatedEntity: {
                type: i % 2 === 0 ? "appointment" : "prescription",
                id: i % 2 === 0 ? `APP${i.toString().padStart(3, '0')}` : `RX${i}`
            },
            actions: i % 3 === 0 ? [
                { label: "Xem chi tiết", url: `/appointments/APP${i.toString().padStart(3, '0')}` },
                { label: "Hủy lịch", url: `/appointments/APP${i.toString().padStart(3, '0')}/cancel` }
            ] : [
                { label: "Xem đơn thuốc", url: `/prescriptions/RX${i}` }
            ]
        });
    }
    
    return notifications;
})();

// ================= USER SESSIONS =================
exports.userSessions = (function() {
    const sessions = [];
    const baseDate = new Date("2024-01-08T10:00:00Z");
    
    for (let i = 1; i <= 10; i++) {
        const sessNum = i.toString().padStart(3, '0');
        const userId = i % 3 === 0 ? `DOC${((i % 10) + 1).toString().padStart(2, '0')}` : 
                      i % 3 === 1 ? `PAT${(i % 10 || 10).toString().padStart(2, '0')}` : 
                      `ADM${Math.ceil(i / 3).toString().padStart(2, '0')}`;
        
        sessions.push({
            _id: `SESS${sessNum}`,
            userId: userId,
            refreshToken: `refresh_token_${userId}_${Date.now()}_${i}`,
            deviceInfo: {
                userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${90 + (i % 10)}.0.0.0 Safari/537.36`,
                ipAddress: `192.168.1.${i}`,
                deviceType: i % 3 === 0 ? "mobile" : i % 3 === 1 ? "desktop" : "tablet",
                os: i % 2 === 0 ? "Windows" : "iOS"
            },
            loginAt: new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000),
            expiresAt: new Date(baseDate.getTime() + (i + 30) * 24 * 60 * 60 * 1000),
            lastActivityAt: new Date(baseDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000),
            revoked: i % 10 === 0,
            revokedAt: i % 10 === 0 ? new Date(baseDate.getTime() + (i + 5) * 24 * 60 * 60 * 1000) : null,
            revocationReason: i % 10 === 0 ? "user_logout" : null
        });
    }
    
    return sessions;
})();

// ================= ADDITIONAL DATA =================

// Medical Tests
exports.medicalTests = (function() {
    const tests = [];
    const testTypes = ["blood_test", "urine_test", "xray", "ultrasound", "ecg", 
                      "mri", "ct_scan", "endoscopy", "biopsy", "stress_test"];
    
    for (let i = 1; i <= 10; i++) {
        tests.push({
            _id: `TEST${i.toString().padStart(3, '0')}`,
            patientId: `PAT${(i % 10 || 10).toString().padStart(2, '0')}`,
            doctorId: `DOC${((i % 10) + 1).toString().padStart(2, '0')}`,
            appointmentId: `APP${i.toString().padStart(3, '0')}`,
            testType: testTypes[i-1],
            name: [`Xét nghiệm máu toàn phần`, `Xét nghiệm nước tiểu`, `X-quang ngực`, 
                  `Siêu âm bụng`, `Điện tâm đồ`, `Chụp MRI não`, `Chụp CT ngực`, 
                  `Nội soi dạ dày`, `Sinh thiết da`, `Test gắng sức`][i-1],
            orderedDate: new Date(2024, 0, 10 + i),
            performedDate: new Date(2024, 0, 12 + i),
            resultsAvailable: i % 3 !== 0,
            resultsDate: i % 3 !== 0 ? new Date(2024, 0, 14 + i) : null,
            findings: i % 3 !== 0 ? `Kết quả ${i % 2 === 0 ? 'bình thường' : 'có bất thường nhẹ'}` : null,
            notes: i % 3 !== 0 ? `Bệnh nhân cần theo dõi thêm` : `Đang chờ kết quả`,
            labName: `Phòng xét nghiệm ${["A", "B", "C", "D", "E"][i % 5]}`,
            files: i % 3 !== 0 ? [
                {
                    name: `ket_qua_${i}.pdf`,
                    url: `/reports/test${i}.pdf`,
                    size: 1024 * (100 + i),
                    uploadedAt: new Date(2024, 0, 14 + i)
                }
            ] : []
        });
    }
    
    return tests;
})();

// Invoices
exports.invoices = (function() {
    const invoices = [];
    
    for (let i = 1; i <= 10; i++) {
        const appointmentId = `APP${i.toString().padStart(3, '0')}`;
        const patientId = `PAT${(i % 10 || 10).toString().padStart(2, '0')}`;
        const doctorId = `DOC${((i % 10) + 1).toString().padStart(2, '0')}`;
        
        invoices.push({
            _id: `INV${i.toString().padStart(3, '0')}`,
            invoiceNumber: `INV-2024-${1000 + i}`,
            appointmentId: appointmentId,
            patientId: patientId,
            doctorId: doctorId,
            issueDate: new Date(2024, 0, 15 + i),
            dueDate: new Date(2024, 0, 30 + i),
            items: [
                {
                    description: "Phí tư vấn bác sĩ",
                    quantity: 1,
                    unitPrice: 500000,
                    amount: 500000
                },
                {
                    description: i % 2 === 0 ? "Phí đơn thuốc" : "Phí xét nghiệm",
                    quantity: 1,
                    unitPrice: 100000 + (i * 10000),
                    amount: 100000 + (i * 10000)
                }
            ],
            subtotal: 600000 + (i * 10000),
            tax: (600000 + (i * 10000)) * 0.1,
            total: (600000 + (i * 10000)) * 1.1,
            status: i % 4 === 0 ? "pending" : i % 4 === 1 ? "paid" : i % 4 === 2 ? "overdue" : "cancelled",
            paymentMethod: i % 3 === 0 ? "credit_card" : i % 3 === 1 ? "bank_transfer" : "cash",
            paidAt: i % 4 !== 0 ? new Date(2024, 0, 16 + i) : null,
            notes: i % 3 === 0 ? "Thanh toán trong vòng 15 ngày" : ""
        });
    }
    
    return invoices;
})();