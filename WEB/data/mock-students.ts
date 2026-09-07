import { Application, calculateIiccScore } from "../types/scholarship";

export const PRESET_PERSONAS: Record<string, Application> = {
  // Persona 1: Draft / In Progress application — Mohd Zama
  draft: {
    id: "app-draft-001",
    applicationNumber: "IICC-2026-001024",
    scholarshipId: "iicc-ug-prof-2026",
    scholarshipName: "IICC Merit-cum-Means Undergraduate Professional Scholarship",
    studentId: "std-001",
    lastUpdated: "2026-09-06",
    status: "Draft",
    riskLevel: "Low",
    verificationStatus: "Pending",
    score: 80, // Academic 55 (92%) + Income 25 (2.5L-3.5L) + Special 0 = 80
    scoringBreakdown: {
      academicMarks: 55, // 90-94.99% gives 55
      incomeMarks: 25, // ₹2,50,001 - ₹3,50,000 gives 25
      specialCategoryMarks: 0,
      totalScore: 80
    },
    specialCategories: {
      isGirlStudent: false,
      isOrphan: false,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    },
    personalDetails: {
      id: "std-001",
      fullName: "MOHD ZAMA",
      email: "mohdzama92@gmail.com",
      mobile: "9876543210",
      dob: "2005-04-14",
      gender: "Male",
      religion: "Islam",
      category: "General",
      aadhaarMasked: "XXXX-XXXX-4921",
      panCardNumber: "ABCDE1234F",
      address: "House 42, Civil Lines, University Road",
      currentAddress: "Room 108, Hall of Residence, Campus",
      city: "Lucknow",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226001",
      photoUrl: "/file.svg"
    },
    academicDetails: {
      institution: "Indian Institute of Technology (IIT) Kanpur",
      institutionType: "IIT/NIT",
      boardOrUniversity: "IIT Kanpur (Autonomous)",
      course: "B.Tech in Computer Science and Engineering",
      degree: "Bachelor of Technology",
      yearOfStudy: "2nd Year",
      rollNumber: "230492CS",
      examinationPassed: "Class 12th Board Examination",
      yearOfPassing: "2024",
      markType: "Percentage",
      marksObtained: "460",
      totalMarks: "500",
      previousMarks: "92.0%",
      percentageNumeric: 92.0,
      previousScholarships: {
        availed: false
      }
    },
    familyDetails: {
      fatherName: "TARIQ AHMAD",
      fatherOccupation: "High School Teacher",
      motherName: "SALMA BEGUM",
      motherOccupation: "Homemaker",
      incomeBracket: "Rs.2,50,001 - Rs.3,50,000",
      annualFamilyIncome: "₹3,20,000",
      incomeNumeric: 320000,
      familySize: 4,
      isFirstGenerationGraduate: false
    },
    bankDetails: {
      bankName: "HDFC Bank",
      accountHolderName: "MOHD ZAMA",
      accountNumber: "50100492817291",
      ifscCode: "HDFC0001234",
      branchName: "Civil Lines Branch"
    },
    scholarshipAnswers: {
      careerGoals: "Aspiring AI researcher focused on natural language processing for Indian vernacular languages.",
      financialNeedStatement: "My father is a teacher supporting two college-going siblings. This IICC fellowship covers tuition and research equipment costs.",
      specialAchievements: "Published student paper at National Computing Symposium."
    },
    documents: [
      {
        id: "doc-1",
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Uploaded",
        fileName: "Aadhaar_Card_Masked.pdf",
        fileSize: "1.2 MB",
        uploadDate: "2026-09-02",
        ocrExtracted: {
          Name: "MOHD ZAMA",
          DOB: "14/04/2005",
          Gender: "Male",
          AadhaarNumber: "XXXX-XXXX-4921"
        },
        aiConfidence: 98,
        remarks: "Clear digital Aadhaar document"
      },
      {
        id: "doc-2",
        type: "Marksheet",
        name: "Previous Academic Marksheet",
        required: true,
        status: "Uploaded",
        fileName: "Class12_Marksheet.pdf",
        fileSize: "2.4 MB",
        uploadDate: "2026-09-02",
        ocrExtracted: {
          StudentName: "MOHD ZAMA",
          RollNo: "22619024",
          AggregatePercentage: "92.0%",
          Board: "CBSE"
        },
        aiConfidence: 96,
        remarks: "Marks match application records"
      },
      {
        id: "doc-3",
        type: "Income Certificate",
        name: "Income Certificate / Notarized Affidavit",
        required: true,
        status: "Not Uploaded"
      },
      {
        id: "doc-4",
        type: "Bonafide Certificate",
        name: "Bonafide Certificate (Proof of Enrolment)",
        required: true,
        status: "Not Uploaded"
      },
      {
        id: "doc-5",
        type: "Bank Document",
        name: "Bank Passbook / Cancelled Cheque",
        required: false,
        status: "Not Uploaded"
      }
    ],
    timeline: [
      {
        title: "Application Draft Created",
        description: "Student started application for IICC Undergraduate Professional Scholarship.",
        timestamp: "02 Sep 2026, 10:30 AM",
        completed: true,
        current: true
      },
      {
        title: "Application Submission",
        description: "Review details and complete official submission.",
        timestamp: "Pending",
        completed: false
      },
      {
        title: "Scrutiny & Document Verification",
        description: "IICC Education committee verification of uploaded proofs.",
        timestamp: "Pending",
        completed: false
      },
      {
        title: "Merit Shortlist Announcement",
        description: "Rank-ordered candidate selection based on 100-mark evaluation.",
        timestamp: "Pending",
        completed: false
      },
      {
        title: "Video KYC Verification",
        description: "Final identity confirmation for shortlisted applicants.",
        timestamp: "Pending",
        completed: false
      },
      {
        title: "Disbursement",
        description: "Direct bank transfer of award amount via DBT.",
        timestamp: "Pending",
        completed: false
      }
    ]
  },

  // Persona 2: Shortlisted (Ready for Video KYC!) — Priya Sharma
  shortlisted: {
    id: "app-shortlisted-002",
    applicationNumber: "IICC-2026-000412",
    scholarshipId: "iicc-ug-prof-2026",
    scholarshipName: "IICC Merit-cum-Means Undergraduate Professional Scholarship",
    studentId: "std-002",
    submissionDate: "2026-08-28",
    lastUpdated: "2026-09-03",
    status: "Shortlisted",
    riskLevel: "Low",
    verificationStatus: "Pending",
    score: 92, // Academic 60 (96.5% >= 95%) + Income 30 (1.5L-2.5L) + Special 2 (Girl) = 92
    scoringBreakdown: {
      academicMarks: 60, // >= 95%
      incomeMarks: 30, // ₹1,50,001 – ₹2,50,000
      specialCategoryMarks: 2, // Girl student
      totalScore: 92
    },
    specialCategories: {
      isGirlStudent: true,
      isOrphan: false,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    },
    rank: 18,
    personalDetails: {
      id: "std-002",
      fullName: "PRIYA SHARMA",
      email: "priya.sharma22@example.com",
      mobile: "9845123456",
      dob: "2004-11-20",
      gender: "Female",
      religion: "Hinduism",
      category: "General",
      aadhaarMasked: "XXXX-XXXX-8812",
      address: "Flat 302, Green Valley Apartments, Whitefield",
      city: "Bengaluru",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560066"
    },
    academicDetails: {
      institution: "National Institute of Technology (NIT) Surathkal",
      institutionType: "IIT/NIT",
      boardOrUniversity: "NIT Surathkal (Autonomous)",
      course: "B.Tech in Artificial Intelligence & Data Science",
      degree: "Bachelor of Technology",
      yearOfStudy: "3rd Year",
      rollNumber: "NITK22AI089",
      examinationPassed: "Semester 4 Annual Examination",
      yearOfPassing: "2024",
      markType: "CGPA",
      cgpa: "9.65",
      convertedPercentage: "91.68%",
      previousMarks: "96.5%",
      percentageNumeric: 96.5,
      previousScholarships: {
        availed: false
      }
    },
    familyDetails: {
      fatherName: "RAMESH SHARMA",
      fatherOccupation: "Small Business Owner",
      motherName: "SUNITA SHARMA",
      motherOccupation: "Primary School Teacher",
      incomeBracket: "Rs.1,50,001 - Rs.2,50,000",
      annualFamilyIncome: "₹2,40,000",
      incomeNumeric: 240000,
      familySize: 3,
      isFirstGenerationGraduate: true
    },
    bankDetails: {
      bankName: "State Bank of India",
      accountHolderName: "PRIYA SHARMA",
      accountNumber: "91238475928374",
      ifscCode: "SBIN0004521",
      branchName: "NITK Surathkal Campus"
    },
    scholarshipAnswers: {
      careerGoals: "Developing open source accessibility tools for visually challenged students.",
      financialNeedStatement: "Supports tuition and hostel fees so I can focus on full-time engineering research."
    },
    documents: [
      {
        id: "doc-s1",
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Verified",
        fileName: "Priya_Aadhaar.pdf",
        fileSize: "1.4 MB",
        uploadDate: "2026-08-28"
      },
      {
        id: "doc-s2",
        type: "Marksheet",
        name: "Qualifying Marksheet",
        required: true,
        status: "Verified",
        fileName: "GradeCard_Sem4.pdf",
        fileSize: "2.1 MB",
        uploadDate: "2026-08-28"
      },
      {
        id: "doc-s3",
        type: "Income Certificate",
        name: "Income Certificate",
        required: true,
        status: "Verified",
        fileName: "Income_Certificate_2026.pdf",
        fileSize: "1.1 MB",
        uploadDate: "2026-08-28"
      },
      {
        id: "doc-s4",
        type: "Bonafide Certificate",
        name: "Bonafide Certificate (Proof of Enrolment)",
        required: true,
        status: "Verified",
        fileName: "NITK_Bonafide_2026.pdf",
        fileSize: "0.9 MB",
        uploadDate: "2026-08-28"
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: "Application successfully submitted with reference IICC-2026-000412.",
        timestamp: "28 Aug 2026, 04:15 PM",
        completed: true
      },
      {
        title: "Scrutiny Cleared",
        description: "100-mark evaluation completed with Total Score 92/100.",
        timestamp: "31 Aug 2026, 11:20 AM",
        completed: true
      },
      {
        title: "Provisional Shortlist Selected",
        description: "Selected in provisional merit ranking (#18).",
        timestamp: "03 Sep 2026, 02:00 PM",
        completed: true,
        current: true
      },
      {
        title: "Final Video KYC Verification",
        description: "Complete your browser-based Video KYC to confirm your scholarship award.",
        timestamp: "Action Required",
        completed: false
      },
      {
        title: "Scholarship Disbursement",
        description: "Direct bank transfer of ₹50,000 upon KYC completion.",
        timestamp: "Pending",
        completed: false
      }
    ]
  },

  // Persona 3: Waitlisted (#12 on Waiting List) — Rahul Verma
  waitlisted: {
    id: "app-waitlisted-003",
    applicationNumber: "IICC-2026-000589",
    scholarshipId: "iicc-ug-prof-2026",
    scholarshipName: "IICC Merit-cum-Means Undergraduate Professional Scholarship",
    studentId: "std-003",
    submissionDate: "2026-08-25",
    lastUpdated: "2026-09-02",
    status: "Waitlisted",
    riskLevel: "Low",
    verificationStatus: "Pending",
    score: 75, // Academic 50 (88.2%) + Income 25 (2.5L-3.5L) + Special 0 = 75
    scoringBreakdown: {
      academicMarks: 50, // 85-89.99%
      incomeMarks: 25, // ₹2,50,001 – ₹3,50,000
      specialCategoryMarks: 0,
      totalScore: 75
    },
    specialCategories: {
      isGirlStudent: false,
      isOrphan: false,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    },
    rank: 132,
    waitlistPosition: 12,
    personalDetails: {
      id: "std-003",
      fullName: "RAHUL VERMA",
      email: "rahul.verma99@example.com",
      mobile: "9711234567",
      dob: "2005-01-18",
      gender: "Male",
      religion: "Hinduism",
      category: "OBC",
      aadhaarMasked: "XXXX-XXXX-3341",
      address: "14-B Sector 12, Indirapuram",
      city: "Ghaziabad",
      district: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201014"
    },
    academicDetails: {
      institution: "Delhi Technological University (DTU)",
      institutionType: "State University",
      boardOrUniversity: "Delhi Technological University",
      course: "B.Tech in Mechanical and Automation Engineering",
      degree: "Bachelor of Technology",
      yearOfStudy: "2nd Year",
      rollNumber: "2K23/ME/142",
      examinationPassed: "Semester 2 Annual Examination",
      yearOfPassing: "2024",
      markType: "Percentage",
      previousMarks: "88.2%",
      percentageNumeric: 88.2
    },
    familyDetails: {
      fatherName: "SANJAY VERMA",
      fatherOccupation: "Electrician",
      motherName: "ANITA VERMA",
      motherOccupation: "Homemaker",
      incomeBracket: "Rs.2,50,001 - Rs.3,50,000",
      annualFamilyIncome: "₹2,90,000",
      incomeNumeric: 290000,
      familySize: 5,
      isFirstGenerationGraduate: true
    },
    bankDetails: {
      bankName: "Punjab National Bank",
      accountHolderName: "RAHUL VERMA",
      accountNumber: "30948572019482",
      ifscCode: "PUNB0021400",
      branchName: "Indirapuram Branch"
    },
    scholarshipAnswers: {
      careerGoals: "Robotics and automation engineer building low-cost assistive prosthetics.",
      financialNeedStatement: "My father is a freelance technician. This fellowship will relieve major hostel boarding financial burden."
    },
    documents: [
      {
        id: "doc-w1",
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Verified",
        fileName: "Rahul_Aadhaar.pdf",
        uploadDate: "2026-08-25"
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: "Application submitted and scored 75/100 under IICC objective system.",
        timestamp: "25 Aug 2026, 02:40 PM",
        completed: true
      },
      {
        title: "Placed on Waitlist (#12)",
        description: "You are currently ranked #12 on the waiting list. If a shortlisted candidate does not complete Video KYC, you will be automatically promoted.",
        timestamp: "02 Sep 2026, 11:00 AM",
        completed: true,
        current: true
      }
    ]
  },

  // Persona 4: Approved & Disbursed — Ananya Patel
  approved: {
    id: "app-approved-004",
    applicationNumber: "IICC-2026-000109",
    scholarshipId: "iicc-ug-prof-2026",
    scholarshipName: "IICC Merit-cum-Means Undergraduate Professional Scholarship",
    studentId: "std-004",
    submissionDate: "2026-08-15",
    lastUpdated: "2026-09-01",
    status: "Approved",
    riskLevel: "Low",
    verificationStatus: "Passed",
    score: 95, // Academic 60 (98.4%) + Income 30 (1.5L-2.5L) + Special 5 (Orphan + Girl capped at 5) = 95
    scoringBreakdown: {
      academicMarks: 60,
      incomeMarks: 30,
      specialCategoryMarks: 5,
      totalScore: 95
    },
    specialCategories: {
      isGirlStudent: true,
      isOrphan: true,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    },
    rank: 4,
    personalDetails: {
      id: "std-004",
      fullName: "ANANYA PATEL",
      email: "ananya.patel@example.com",
      mobile: "9900112233",
      dob: "2004-08-09",
      gender: "Female",
      religion: "Hinduism",
      category: "General",
      aadhaarMasked: "XXXX-XXXX-9142",
      address: "B-201, Shivalik Enclave, Vastrapur",
      city: "Ahmedabad",
      district: "Ahmedabad",
      state: "Gujarat",
      pincode: "380015"
    },
    academicDetails: {
      institution: "Indian Institute of Science (IISc) Bangalore",
      institutionType: "Central University",
      boardOrUniversity: "IISc Bangalore",
      course: "Bachelor of Science (Research)",
      degree: "Bachelor of Science",
      yearOfStudy: "3rd Year",
      rollNumber: "IISCB22PH012",
      examinationPassed: "Semester 4 Annual Examination",
      yearOfPassing: "2024",
      markType: "Percentage",
      previousMarks: "98.4%",
      percentageNumeric: 98.4
    },
    familyDetails: {
      fatherName: "BHAVESH PATEL",
      fatherOccupation: "Deceased",
      motherName: "GEETA PATEL",
      motherOccupation: "Homemaker",
      incomeBracket: "Rs.1,50,001 - Rs.2,50,000",
      annualFamilyIncome: "₹2,10,000",
      incomeNumeric: 210000,
      familySize: 3,
      isFirstGenerationGraduate: true
    },
    bankDetails: {
      bankName: "Bank of Baroda",
      accountHolderName: "ANANYA PATEL",
      accountNumber: "20491827401928",
      ifscCode: "BARB0VASTRA",
      branchName: "Vastrapur Branch"
    },
    scholarshipAnswers: {
      careerGoals: "Theoretical quantum computing research.",
      financialNeedStatement: "Full tuition assistance is essential as an orphan student."
    },
    documents: [
      {
        id: "doc-a1",
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Verified",
        fileName: "Ananya_Aadhaar.pdf",
        uploadDate: "2026-08-15"
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: "Scored 95/100 under 100-mark system.",
        timestamp: "15 Aug 2026",
        completed: true
      },
      {
        title: "Video KYC Passed",
        description: "Biometric liveness 99.2% match verified.",
        timestamp: "29 Aug 2026",
        completed: true
      },
      {
        title: "Scholarship Award Conferred",
        description: "Conferred by Dr. Khwaja M. Shahid, Convener (Education), IICC. First tranche of ₹50,000 scheduled for PFMS/DBT transfer.",
        timestamp: "01 Sep 2026",
        completed: true,
        current: true
      }
    ]
  },

  // Persona 5: Correction Required — Vikram Singh
  correction: {
    id: "app-correction-005",
    applicationNumber: "IICC-2026-000781",
    scholarshipId: "iicc-senior-sec-2026",
    scholarshipName: "IICC Merit-cum-Means Senior Secondary Scholarship",
    studentId: "std-005",
    submissionDate: "2026-08-20",
    lastUpdated: "2026-09-03",
    status: "Correction Required",
    riskLevel: "Medium",
    verificationStatus: "Manual Review",
    score: 65, // Academic 40 (79%) + Income 25 (2.5L-3.5L) = 65
    scoringBreakdown: {
      academicMarks: 40,
      incomeMarks: 25,
      specialCategoryMarks: 0,
      totalScore: 65
    },
    specialCategories: {
      isGirlStudent: false,
      isOrphan: false,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    },
    personalDetails: {
      id: "std-005",
      fullName: "VIKRAM SINGH",
      email: "vikram.singh@example.com",
      mobile: "9414098765",
      dob: "2008-06-12",
      gender: "Male",
      religion: "Hinduism",
      category: "General",
      aadhaarMasked: "XXXX-XXXX-7729",
      address: "Ward No. 7, Near Old Fort",
      city: "Jodhpur",
      district: "Jodhpur",
      state: "Rajasthan",
      pincode: "342001"
    },
    academicDetails: {
      institution: "Government Senior Secondary School, Jodhpur",
      institutionType: "School",
      boardOrUniversity: "Board of Secondary Education Rajasthan (RBSE)",
      course: "Class XII (Science Stream)",
      degree: "Senior Secondary",
      yearOfStudy: "Class XII",
      rollNumber: "RBSE24/SC/412",
      examinationPassed: "Class X Board Examination",
      yearOfPassing: "2024",
      markType: "Percentage",
      previousMarks: "79.0%",
      percentageNumeric: 79.0
    },
    familyDetails: {
      fatherName: "MAHENDRA SINGH",
      fatherOccupation: "Artisan",
      motherName: "KAVITA KANWAR",
      motherOccupation: "Homemaker",
      incomeBracket: "Rs.2,50,001 - Rs.3,50,000",
      annualFamilyIncome: "₹3,10,000",
      incomeNumeric: 310000,
      familySize: 5,
      isFirstGenerationGraduate: true
    },
    bankDetails: {
      bankName: "State Bank of India",
      accountHolderName: "VIKRAM SINGH",
      accountNumber: "61029384756102",
      ifscCode: "SBIN0031124",
      branchName: "Jodhpur Branch"
    },
    scholarshipAnswers: {},
    documents: [
      {
        id: "doc-c1",
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Verified",
        fileName: "Vikram_Aadhaar.pdf",
        uploadDate: "2026-08-20"
      },
      {
        id: "doc-c2",
        type: "Income Certificate",
        name: "Income Certificate / Affidavit",
        required: true,
        status: "Needs Correction",
        fileName: "Income_Cert_Expired.pdf",
        uploadDate: "2026-08-20",
        remarks: "Income certificate is expired. Please upload valid current FY revenue certificate or Notarized Affidavit."
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: "Application submitted.",
        timestamp: "20 Aug 2026",
        completed: true
      },
      {
        title: "Correction Requested by Officer",
        description: "Income certificate expired. Please re-upload as per Section 45 before deadline.",
        timestamp: "03 Sep 2026",
        completed: false,
        current: true
      }
    ]
  }
};
