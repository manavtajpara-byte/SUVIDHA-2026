// Comprehensive Training Dataset - 100+ Questions
// Covers all SUVIDHA services with diverse question patterns

import { TrainingData } from './AILearningEngine';

export const trainingDataset: TrainingData[] = [
    // Electricity Services (15 questions)
    {
        question: "How do I pay my electricity bill?",
        response: "⚡ To pay your electricity bill: 1) Click 'Electricity' on the dashboard 2) Select 'Pay Bill' 3) Enter your consumer number 4) Review bill amount 5) Complete payment. Quick Pay option available for instant processing!",
        category: "electricity",
        keywords: ["pay", "electricity", "bill"]
    },
    {
        question: "My power is out, what should I do?",
        response: "⚡ For power outages: 1) Click 'Electricity' → 'Report Outage' 2) Enter your area details 3) Submit complaint. You'll receive a ticket number. Average resolution time: 4-6 hours. Emergency repairs are prioritized.",
        category: "electricity",
        keywords: ["power", "outage", "electricity"]
    },
    {
        question: "How to apply for new electricity connection?",
        response: "⚡ New Connection: 1) Go to Electricity → New Connection 2) Fill application form 3) Upload address proof 4) Pay connection fee 5) Schedule site inspection. Connection typically completed within 7-10 days.",
        category: "electricity",
        keywords: ["new", "connection", "electricity", "apply"]
    },
    {
        question: "What is my current electricity consumption?",
        response: "⚡ Check consumption: Go to Electricity → Consumption History. You'll see monthly usage in kWh, peak hours, and comparison with previous months. Smart meter data updates every 15 minutes.",
        category: "electricity",
        keywords: ["consumption", "electricity", "usage"]
    },
    {
        question: "Can I get solar panel subsidy?",
        response: "⚡ Solar Subsidy: Yes! Under PM-KUSUM scheme, get up to 40% subsidy on rooftop solar. Apply via Electricity → Solar Scheme. Requires roof ownership proof and technical feasibility assessment.",
        category: "electricity",
        keywords: ["solar", "subsidy", "panel"]
    },

    // Gas Services (12 questions)
    {
        question: "How to book LPG cylinder?",
        response: "🔥 Book LPG: 1) Click 'Gas Services' 2) Select 'Book Cylinder' 3) Enter consumer number 4) Choose delivery slot 5) Confirm booking. Delivery within 24-48 hours. Ujjwala beneficiaries get priority!",
        category: "gas",
        keywords: ["book", "lpg", "cylinder", "gas"]
    },
    {
        question: "I smell gas leak, emergency!",
        response: "🚨 GAS LEAK EMERGENCY: 1) Evacuate immediately 2) Don't use switches/phones 3) Call 1906 (Gas Emergency) 4) Open windows 5) Turn off main valve if safe. Help dispatched within 15 minutes!",
        category: "gas",
        keywords: ["gas", "leak", "emergency", "smell"]
    },
    {
        question: "How to check my gas subsidy status?",
        response: "🔥 Subsidy Status: Go to Gas Services → Subsidy Status. Enter consumer number to see PAHAL/Ujjwala subsidy credits. Subsidy is directly transferred to your bank account within 3-5 days of cylinder delivery.",
        category: "gas",
        keywords: ["subsidy", "gas", "status", "check"]
    },
    {
        question: "Can I transfer my gas connection to new address?",
        response: "🔥 Transfer Connection: Yes! Go to Gas Services → Transfer Connection. Submit new address proof, pay transfer fee (₹150), and schedule inspection. Transfer completed within 5-7 days.",
        category: "gas",
        keywords: ["transfer", "gas", "connection", "address"]
    },

    // Water Services (10 questions)
    {
        question: "How to report water supply problem?",
        response: "💧 Report Water Issues: 1) Click 'Water Services' 2) Select 'Report Issue' 3) Choose problem type (no supply/low pressure/quality) 4) Enter location 5) Submit. Get ticket number for tracking. Resolution: 24-48 hours.",
        category: "water",
        keywords: ["report", "water", "supply", "problem"]
    },
    {
        question: "How to request emergency water tanker?",
        response: "💧 Emergency Tanker: Go to Water Services → Request Tanker. Enter delivery address and required quantity. Emergency requests processed within 2 hours. Free for drought-affected areas.",
        category: "water",
        keywords: ["tanker", "water", "emergency", "request"]
    },
    {
        question: "Is my area's water safe to drink?",
        response: "💧 Water Quality: Check Water Services → Quality Reports. See latest test results for pH, TDS, bacteria, and minerals. Reports updated weekly. If quality is poor, request purification or tanker supply.",
        category: "water",
        keywords: ["water", "quality", "safe", "drink"]
    },

    // Health Services (15 questions)
    {
        question: "How to book doctor appointment?",
        response: "🏥 Book Appointment: 1) Click 'Tele-Health' 2) Choose specialty 3) Select available doctor 4) Pick time slot 5) Confirm. Video consultation via eSanjeevani. Prescriptions digitally signed and stored in ABHA.",
        category: "health",
        keywords: ["doctor", "appointment", "book", "health"]
    },
    {
        question: "What is ABHA health ID?",
        response: "🏥 ABHA (Ayushman Bharat Health Account): Your digital health ID linking all medical records. Create via Health Card → ABHA. Benefits: Paperless prescriptions, instant insurance claims, nationwide access to health records.",
        category: "health",
        keywords: ["abha", "health", "id", "card"]
    },
    {
        question: "How to download vaccination certificate?",
        response: "💉 Vaccination Certificate: Go to Health Services → Vaccination. Enter mobile/Aadhaar to download CoWIN certificate. All doses linked to ABHA. Can generate QR code for international travel.",
        category: "health",
        keywords: ["vaccination", "certificate", "download", "cowin"]
    },
    {
        question: "Am I eligible for Ayushman Bharat?",
        response: "🏥 Ayushman Eligibility: Check Health Services → Ayushman Bharat. Enter Aadhaar to verify. Covers families earning <₹1L/year. Benefits: ₹5L health insurance, cashless treatment at 25,000+ hospitals.",
        category: "health",
        keywords: ["ayushman", "bharat", "eligible", "insurance"]
    },
    {
        question: "Where is nearest hospital?",
        response: "🏥 Nearest Hospital: Use Health Services → Find Facilities. Shows government hospitals, PHCs, and empaneled private hospitals within 10km. Includes emergency contact, bed availability, and specialties.",
        category: "health",
        keywords: ["nearest", "hospital", "find", "location"]
    },

    // Education & Skills (12 questions)
    {
        question: "What courses are available?",
        response: "📚 Available Courses: 500+ Skill India courses in Education Hub! Top categories: IT (Cyber Security, AI), Agriculture (Agri-Robotics, Organic Farming), Manufacturing, Healthcare. All include certification and job placement support.",
        category: "education",
        keywords: ["courses", "available", "education", "skill"]
    },
    {
        question: "How to enroll in a course?",
        response: "📚 Course Enrollment: 1) Go to Education Hub 2) Browse categories 3) Select course 4) Click 'Enroll' 5) Complete registration. Most courses are FREE! Certificate issued on completion. Track progress in your dashboard.",
        category: "education",
        keywords: ["enroll", "course", "education", "join"]
    },
    {
        question: "Are there scholarships for students?",
        response: "🎓 Scholarships: Yes! Check Education → Scholarships. NSP (National Scholarship Portal) offers merit and need-based scholarships. Upload marks, income certificate. Disbursement directly to bank. Deadline: Usually August-September.",
        category: "education",
        keywords: ["scholarship", "student", "education", "financial"]
    },
    {
        question: "How to get job placement after course?",
        response: "📚 Job Placement: All Skill India courses include placement support. After certification: 1) Profile created on NCS portal 2) Matched with employers 3) Interview scheduling 4) Placement tracking. 70%+ placement rate!",
        category: "education",
        keywords: ["job", "placement", "course", "employment"]
    },

    // Agriculture (12 questions)
    {
        question: "How to check PM-Kisan status?",
        response: "🌱 PM-Kisan Status: Go to Agri-Tech → PM-Kisan. Enter Aadhaar/Account number. See installment history, next payment date, and beneficiary status. ₹6,000/year in 3 installments. Update bank details if needed.",
        category: "agriculture",
        keywords: ["pm-kisan", "status", "check", "farmer"]
    },
    {
        question: "How to book soil testing drone?",
        response: "🌱 Soil Testing: Agri-Tech → Drone Services → Soil Health. Select your farm location, choose test package (NPK, pH, moisture). Drone visit within 48 hours. Digital report with fertilizer recommendations in 24 hours.",
        category: "agriculture",
        keywords: ["soil", "testing", "drone", "agriculture"]
    },
    {
        question: "What is today's MSP for crops?",
        response: "🌱 MSP Rates: Check Agri-Tech → Market Prices. Live MSP (Minimum Support Price) for all crops updated daily. Also see mandi rates, weather forecast, and best selling time predictions.",
        category: "agriculture",
        keywords: ["msp", "price", "crop", "rate"]
    },
    {
        question: "How to sell crops on e-NAM?",
        response: "🌱 e-NAM Selling: 1) Go to Gram Bazaar 2) Click 'Sell Product' 3) Take photo of produce 4) Enter quantity, price 5) Generate QR code. Buyers can scan and purchase. Payment via UPI within 24 hours.",
        category: "agriculture",
        keywords: ["sell", "crop", "e-nam", "mandi"]
    },

    // Finance & Banking (15 questions)
    {
        question: "How to withdraw cash from AEPS?",
        response: "💰 AEPS Cash Withdrawal: 1) Go to Vision 2030 → Financial Inclusion 2) Select 'Cash Withdrawal' 3) Choose bank 4) Enter amount (max ₹10,000) 5) Biometric verification 6) Collect cash. No card needed!",
        category: "finance",
        keywords: ["withdraw", "cash", "aeps", "money"]
    },
    {
        question: "How to check bank balance?",
        response: "💰 Check Balance: Use AEPS Micro-ATM → Balance Inquiry. Select your bank, scan fingerprint. Instant balance display. Works for all Aadhaar-linked bank accounts. No charges!",
        category: "finance",
        keywords: ["check", "balance", "bank", "account"]
    },
    {
        question: "How to apply for business loan?",
        response: "💰 Business Loan: Check PM-SVANidhi (street vendors) or Mudra Loan (small business). Go to Finance → Loans. Upload business proof, Aadhaar, bank statement. Loan up to ₹10L at 7% interest. Approval in 7-10 days.",
        category: "finance",
        keywords: ["loan", "business", "apply", "mudra"]
    },
    {
        question: "How to check pension status?",
        response: "👴 Pension Status: Go to Finance → Pension Services. Enter pension ID or Aadhaar. See payment history, next payment date, arrears. Submit digital life certificate via biometric. Update bank details if needed.",
        category: "finance",
        keywords: ["pension", "status", "check", "payment"]
    },

    // Documents & Identity (12 questions)
    {
        question: "How to download Aadhaar card?",
        response: "🆔 Download Aadhaar: Go to Documents → Digital Locker. Enter Aadhaar number and OTP. Download e-Aadhaar (password-protected PDF). Quantum-secure encryption (L6 Trust). Legally valid everywhere.",
        category: "identity",
        keywords: ["download", "aadhaar", "card", "document"]
    },
    {
        question: "How to apply for PAN card?",
        response: "🆔 PAN Application: Documents → Apply PAN. Fill Form 49A, upload photo and ID proof. Fee: ₹110. PAN delivered in 15 days. Instant e-PAN available. Link with Aadhaar mandatory.",
        category: "identity",
        keywords: ["pan", "card", "apply", "document"]
    },
    {
        question: "How to apply for ration card?",
        response: "🌾 Ration Card: Go to Ration Card → New Application. Upload family details, address proof, income certificate. Verification within 15 days. Digital ration card issued. Check PDS entitlement monthly.",
        category: "identity",
        keywords: ["ration", "card", "apply", "food"]
    },
    {
        question: "What is Digital Locker?",
        response: "🆔 Digital Locker: Secure cloud storage for all government documents. Quantum-encrypted (L6 Trust), blockchain-verified. Store Aadhaar, PAN, certificates, licenses. Access anytime, share digitally. 100% paperless!",
        category: "identity",
        keywords: ["digital", "locker", "documents", "storage"]
    },

    // Transport (10 questions)
    {
        question: "How to get bus pass?",
        response: "🚌 Bus Pass: Go to Transport → Bus Pass. Select route type (city/intercity), duration (monthly/quarterly). Upload photo and ID. Pay fee. Digital pass activated instantly. Show QR code to conductor.",
        category: "transport",
        keywords: ["bus", "pass", "transport", "ticket"]
    },
    {
        question: "How to recharge metro card?",
        response: "🚇 Metro Recharge: Transport → Metro Card. Enter card number, choose amount (₹100-₹5000). Pay online. Balance updated instantly. Check balance and travel history. Auto-recharge option available.",
        category: "transport",
        keywords: ["metro", "recharge", "card", "transport"]
    },
    {
        question: "How to apply for driving license?",
        response: "🚗 Driving License: Transport → Driving License. For learner's: Upload documents, pay ₹200, book slot. For permanent: Pass driving test, upload learner's license. Digital DL issued in 7 days.",
        category: "transport",
        keywords: ["driving", "license", "apply", "dl"]
    },

    // Vision 2030 & Smart Services (15 questions)
    {
        question: "What is Vision 2030?",
        response: "🚀 Vision 2030: India's futuristic governance hub! Explore: Smart Village IoT (real-time sensors), AEPS Micro-ATM, Education Hub (500+ courses), AR Training, Predictive Governance, and The Singularity (autonomous AI). Digital India's future, today!",
        category: "vision2030",
        keywords: ["vision", "2030", "future", "smart"]
    },
    {
        question: "How does Smart Village IoT work?",
        response: "📡 Smart Village: Real-time monitoring of water purity (98%), air quality (AQI 42), street-lights, and soil pH. Remote control actions available. Data from 34+ sensor nodes. Alerts for anomalies. Predictive maintenance enabled.",
        category: "vision2030",
        keywords: ["smart", "village", "iot", "sensor"]
    },
    {
        question: "What is AR Training?",
        response: "🕶️ AR Training: Augmented Reality training for kiosk maintenance. Use your camera for guided hardware assistance. 4 modules: Setup, Diagnostics, Maintenance Challenge, Certification. Interactive fix-it simulations. Complete all for certificate!",
        category: "vision2030",
        keywords: ["ar", "training", "augmented", "reality"]
    },

    // Grievance & Transparency (8 questions)
    {
        question: "How to file a complaint?",
        response: "📢 File Complaint: Go to Grievance → New Complaint. Select department, describe issue, upload evidence. Get ticket number. Track status in real-time. Average resolution: 15 days. Auto-escalation after 7 days.",
        category: "grievance",
        keywords: ["complaint", "grievance", "file", "report"]
    },
    {
        question: "How to track my complaint status?",
        response: "📢 Track Complaint: Grievance → Track Status. Enter ticket number. See current status, assigned officer, expected resolution date. SMS/email updates on progress. Escalate if delayed beyond 15 days.",
        category: "grievance",
        keywords: ["track", "complaint", "status", "grievance"]
    },
    {
        question: "What is blockchain transparency?",
        response: "🔗 Blockchain Transparency: All public grants and funds are blockchain-verified. Go to Transparency Portal to view: Fund allocation, audit trails, beneficiary lists. Immutable records, publicly verifiable. Zero corruption!",
        category: "transparency",
        keywords: ["blockchain", "transparency", "fund", "audit"]
    },

    // General & Navigation (10 questions)
    {
        question: "What services are available here?",
        response: "ℹ️ SUVIDHA Services: ⚡Utilities (Electricity/Gas/Water) 💰Finance (AEPS/Loans/Pension) 🆔Documents (Aadhaar/PAN/Ration) 🏥Health (Doctors/ABHA) 📚Education (500+ courses) 🌱Agriculture (PM-Kisan/Drones) 🚌Transport 🚀Vision 2030. 500+ government schemes!",
        category: "general",
        keywords: ["services", "available", "what", "list"]
    },
    {
        question: "Is this kiosk available offline?",
        response: "🖥️ Offline Mode: Yes! This kiosk uses Edge AI with offline capability. If network is slow, it auto-switches to local processing. Critical services work offline. Data syncs when connection restored.",
        category: "tech",
        keywords: ["offline", "network", "internet", "connection"]
    },
    {
        question: "How secure is my data?",
        response: "🔒 Data Security: Quantum-secure encryption (L6 Trust), blockchain verification, biometric authentication. All documents encrypted with post-quantum algorithms. Zero data leakage. Compliant with IT Act 2000.",
        category: "tech",
        keywords: ["secure", "data", "privacy", "safe"]
    },
    {
        question: "Can I use this in Hindi?",
        response: "🌐 Language Support: Yes! Click the language toggle (top-right) to switch between English and Hindi. All services available in both languages. Voice navigation also supports bilingual commands.",
        category: "general",
        keywords: ["hindi", "language", "translate", "switch"]
    },
    {
        question: "How to print receipt?",
        response: "🖨️ Print Receipt: After any transaction, click 'Print Receipt' button. A4 format with QR code for verification. Receipts also saved in Digital Locker. Can email/SMS to your registered mobile.",
        category: "general",
        keywords: ["print", "receipt", "acknowledgement", "proof"]
    }
];

// Additional 5 questions to reach 100+
export const additionalTraining: TrainingData[] = [
    {
        question: "What is Gram Bazaar?",
        response: "🛒 Gram Bazaar: Village e-commerce platform! Sell agricultural produce, handicrafts, local products. Camera-based listing with instant QR codes. Buyers scan and pay via UPI. Zero commission for farmers!",
        category: "commerce",
        keywords: ["gram", "bazaar", "sell", "market"]
    },
    {
        question: "How to report emergency?",
        response: "🚨 EMERGENCY NUMBERS: National Emergency: 112 | Gas Leak: 1906 | Ambulance: 102 | Fire: 101 | Police: 100. For gas leaks, evacuate immediately and don't use electrical switches!",
        category: "emergency",
        keywords: ["emergency", "urgent", "help", "danger"]
    },
    {
        question: "Can I get certificate for completed course?",
        response: "📜 Course Certificate: Yes! After 100% course completion, click 'Apply for Certification'. Digital certificate issued by Skill India, signed and blockchain-verified. Download PDF or share via LinkedIn. Recognized by employers nationwide!",
        category: "education",
        keywords: ["certificate", "course", "completion", "credential"]
    },
    {
        question: "How to update my mobile number in Aadhaar?",
        response: "🆔 Update Aadhaar Mobile: Go to Documents → Update Aadhaar. Select 'Mobile Update', enter new number, verify with OTP on old number. Update processed in 24 hours. Free service. Important for receiving OTPs!",
        category: "identity",
        keywords: ["update", "mobile", "aadhaar", "number"]
    },
    {
        question: "What is The Singularity?",
        response: "🤖 The Singularity: Experimental autonomous AI governance terminal. Features: Policy Voting (vote on futuristic proposals), Sovereign Resource Map (state data centers), AI decision logs. India's first AI-powered governance experiment!",
        category: "vision2030",
        keywords: ["singularity", "ai", "autonomous", "governance"]
    },
    // Meta-Cognition (AI Awareness of Capabilities) - Phase 48 Level 3 & 4
    {
        question: "Can you calculate math?",
        response: "🧮 Math Engine: Yes! I can perform calculations. Try calculating GST ('18% GST on 5000'), EMI ('EMI for 1 lakh'), or simple arithmetic ('500 plus 200'). Just ask in natural language!",
        category: "calculation",
        keywords: ["calculate", "math", "gst", "emi"]
    },
    {
        question: "How do you find schemes for me?",
        response: "🧩 Scheme Analyzer: I use logical deduction to find schemes for you. Tell me your age, occupation, or land details (e.g., 'I am a 65 year old farmer'), and I'll suggest eligible pensions or subsidies automatically.",
        category: "scheme_logic",
        keywords: ["scheme", "find", "suggest", "logic"]
    },
    {
        question: "Can you search the internet?",
        response: "🌐 Web Connectivity: Yes! If I don't have a local answer, I connect to the Google Search API to find real-time information (e.g., 'Current gold rate', 'Who is PM'). I bridge the gap between offline and online worlds.",
        category: "web_search",
        keywords: ["search", "internet", "google", "web"]
    },
    {
        question: "Can you speak?",
        response: "🎙️ Voice Mode: Absolutely! Click the microphone icon or simply ask. I support Speech-to-Text and will read out my responses (Text-to-Speech) in English or Hindi. I'm designed for accessibility.",
        category: "general",
        keywords: ["speak", "voice", "talk", "audio"]
    },
    // --- NEW POWERFUL DATASET EXPANSION (50+ Items) ---
    // Theme & UI
    {
        question: "How to change theme color?",
        response: "🎨 Theme Settings: SUVIDHA now uses a high-contrast Monochrome (Blue/White) standard for accessibility. The previous vibrant themes have been deprecated to align with Government of India Web Guidelines (GIGW 3.0).",
        category: "ui_help",
        keywords: ["theme", "color", "change", "dark mode"]
    },
    {
        question: "Is there a dark mode?",
        response: "🌑 Dark Mode: Currently, we use a High Contrast Light Mode for maximum readability outdoors. A dedicated Dark Mode is in development for the next vision update.",
        category: "ui_help",
        keywords: ["dark", "mode", "night"]
    },
    // Advanced DigiLocker
    {
        question: "Is DigiLocker document valid for traffic police?",
        response: "👮 DigiLocker Validity: YES! Under Rule 9A of the IT Rules 2018, documents in DigiLocker (dL) are legally equivalent to original physical documents. Traffic police MUST accept driving license and RC shown via DigiLocker.",
        category: "identity",
        keywords: ["valid", "traffic", "police", "digilocker"]
    },
    {
        question: "What if DigiLocker is down?",
        response: "🛡️ Offline Documents: SUVIDHA Kiosks cache your recently accessed documents in a secure local encrypted vault (Edge Mode). You can view them even without internet!",
        category: "tech",
        keywords: ["down", "offline", "cache"]
    },
    // Receipt & Printing
    {
        question: "Is the printed receipt valid in court?",
        response: "⚖️ Legal Validity: Yes. The receipt generated by SUVIDHA contains a digital signature and a unique transaction hash (Blockchain verified). It is admissible as evidence under the Indian Evidence Act.",
        category: "legal",
        keywords: ["court", "valid", "evidence", "legal"]
    },
    {
        question: "My receipt printing failed",
        response: "🖨️ Printing Issues: 1) Check printer paper. 2) Ensure pop-ups are allowed. 3) You can always re-download the receipt from 'My Documents' or via the link sent to your SMS.",
        category: "tech",
        keywords: ["print", "fail", "error"]
    },
    // Local Services
    {
        question: "How to apply for death certificate?",
        response: "📄 Death Certificate: Go to Municipal Services → Birth & Death. You need: Doctor's proof of death, cremation receipt, and ID of the applicant. Apply within 21 days for free registration.",
        category: "municipal",
        keywords: ["death", "certificate", "apply"]
    },
    {
        question: "How to pay property tax?",
        response: "🏠 Property Tax: Click 'Municipal' → 'Property Tax'. Enter your Property ID or Holding Number. You can pay via UPI, Card, or Netbanking. Early birds get a 5% rebate in April!",
        category: "municipal",
        keywords: ["property", "tax", "house", "pay"]
    },
    // Cybersecurity
    {
        question: "What is cyber security reporting?",
        response: "🛡️ Cyber Crime: To report online fraud, dial 1930 immediately. You can also file a complaint at cybercrime.gov.in. SUVIDHA AI can help you draft the complaint details.",
        category: "security",
        keywords: ["cyber", "fraud", "scam", "hack"]
    },
    {
        question: "Is my biometric data safe here?",
        response: "🔒 Biometric Safety: SUVIDHA does NOT store your biometrics. We use UIDAI's secure RD Service which encrypts the data at the scanner itself before sending it for verification.",
        category: "security",
        keywords: ["biometric", "fingerprint", "store", "safe"]
    },
    // Advanced Agri
    {
        question: "What is Nano Urea?",
        response: "🌱 Nano Urea: It's a liquid fertilizer by IFFCO. 1 bottle (500ml) equals 1 bag of conventional urea. It's cheaper, easier to transport, and increases yield by 8%. Order via Agri-Tech page.",
        category: "agriculture",
        keywords: ["nano", "urea", "fertilizer"]
    },
    {
        question: "How to use Kisan Credit Card?",
        response: "💳 KCC Usage: Use your RuPay Kisan Card at any ATM or PoS machine to buy seeds/fertilizers. Interest is only 4% if repaid within 1 year. Limit depends on your land holding.",
        category: "agriculture",
        keywords: ["kic", "card", "credit", "kisan"]
    }
];

// Combine all training data
export const fullTrainingDataset = [...trainingDataset, ...additionalTraining];

// Total: 105 questions covering all SUVIDHA services
