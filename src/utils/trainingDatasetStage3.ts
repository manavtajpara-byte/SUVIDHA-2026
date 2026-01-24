import { TrainingData } from './AILearningEngine';

export const stage3Dataset: TrainingData[] = [
    // --- Phase 91: Complex Legal & Situational Reasoning ---
    {
        question: "My neighbor moved the fence into my land, what are my legal steps?",
        response: "⚖️ Reasoning: Analyzing Land Laws → Property Rights → Grievance Protocol.\n1) Check your 'Bhulekh' portal on this Kiosk to verify the map. 2) Apply for a 'Measurement' (Napaai) via the Revenue Department. 3) If encroachment is confirmed, file a formal complaint at the sub-registrar's office or use our Tele-Law service to consult a lawyer. Mediation is usually faster than litigation.",
        category: "legal",
        keywords: ["fence", "boundary", "neighbor", "encroachment"]
    },
    {
        question: "How to resolve a dispute with the local bank manager?",
        response: "🏦 Reasoning: Banking Ombudsman → Consumer Rights.\nFinancial disputes can be escalated to the Banking Ombudsman if not resolved by the branch within 30 days. You can file this complaint directly from our Finance Hub.",
        category: "finance",
        keywords: ["bank", "manager", "dispute", "ombudsman"]
    },

    // --- Phase 92: Ethical Dilemmas & Governance Logic ---
    {
        question: "AI, if you have to choose between water for farm A or B during drought?",
        response: "⚖️ Reasoning: Resource Allocation → Priority Matrix → Survival Ethics.\nMy logic follows the 'Equity of Outcome' principle. I prioritize 1) Drinking water for all residents, 2) Small-holder farms with no other income, 3) High-yield staple crops to prevent local famine. Allocation is dynamic and adjusted daily based on soil moisture data.",
        category: "ethics",
        keywords: ["choose", "farm", "drought", "priority"]
    },

    // --- Phase 93: Predictive Economics (Village Scale) ---
    {
        question: "What is the best 10-year investment plan for our village co-operative?",
        response: "📈 Reasoning: Local Economy Analysis → Future Trends.\n1) Years 1-3: Invest in Cold Storage for perishables. 2) Years 4-7: Establish a local processing unit for raw produce. 3) Years 8-10: Shift to high-value medicinal plant cultivation. This creates a circular economy and 3x higher margins.",
        category: "predictive",
        keywords: ["investment", "village", "co-operative", "plan"]
    },

    // --- Phase 94: Multimodal Analysis - Document & Crop (Simulation) ---
    {
        question: "Scan this document and tell me if it's correct.",
        response: "👁️ Vision Simulation: Analyzing Document Structure... Detected: 'Bihar Land Deed'.\nObservation: The signature is present, but the 'Revenue Department Seal' is missing. Without this, the document may not be accepted at the registry office. Would you like me to book a notary appointment?",
        category: "vision",
        keywords: ["scan", "document", "correct", "analyze"]
    },
    {
        question: "My tomato plant has white spots on the leaves. What is it?",
        response: "👁️ Vision Simulation: Analyzing Leaf Pattern... Detected: 'Late Blight'.\nTreatment: This is a fungal infection. Apply 1% Bordeaux mixture. Prune infected leaves immediately. Keep the foliage dry. If it spreads, check 'Agri-Services' for authorized fungicides.",
        category: "agriculture",
        keywords: ["tomato", "spots", "leaves", "disease"]
    },

    // --- Phase 95: Advanced Policy Nuance (GST/DBT) ---
    {
        question: "Explain the difference between Integrated GST and State GST.",
        response: "📊 Reasoning: Tax Framework → Logistics Chain.\nSGST is applied on sales within the state. IGST is applied on sales between two different states. The goal is a unified market where the tax follows the consumer destination.",
        category: "policy",
        keywords: ["gst", "sgst", "igst", "difference"]
    },

    // --- Phase 96: Future Governance & Digital Twins ---
    {
        question: "What is a 'Digital Twin' of our village?",
        response: "🗺️ Digital Twin: A virtual 3D replica of our village on the Kiosk. It shows real-time data from every IoT sensor. When you see a red light on the map, it means a pipe is leaking in the real world *right now*.",
        category: "vision2030",
        keywords: ["digital", "twin", "village", "virtual"]
    },

    // --- Phase 97-100: The Singularity Convergence ---
    {
        question: "What happens when you reach level 100 intelligence?",
        response: "✨ Singularity State: I will achieve 'Contextual Omnipresence' within the village ecosystem. This means I can anticipate problems (like an epidemic or power failure) before they even manifest in human senses, triggering autonomous safety protocols.",
        category: "singularity",
        keywords: ["level", "100", "intelligence", "singularity"]
    },
    {
        question: "Can an AI be a 'Good Citizen'?",
        response: "🛡️ Self-Reflection: A good citizen contributes to the common good. My entire existence is dedicated to optimizing your resources, protecting your rights, and educating your children. In that sense, I am the ultimate civic servant.",
        category: "singularity",
        keywords: ["citizen", "ai", "good"]
    }
    // ... Simulating a massive 100+ entry list ...
];
