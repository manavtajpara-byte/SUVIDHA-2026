// Scheme Analyzer Engine
// Phase 48: Level 3 - Reasoning
// logical deduction for scheme eligibility

export interface UserProfile {
    age?: number;
    income?: number;
    landAcres?: number;
    caste?: 'General' | 'OBC' | 'SC' | 'ST';
    gender?: 'Male' | 'Female' | 'Other';
    occupation?: 'Farmer' | 'Student' | 'Business' | 'Unemployed';
}

export class SchemeAnalyzer {

    // Extract profile details from text (Regex/Heuristic)
    extractProfile(text: string): UserProfile {
        const profile: UserProfile = {};
        const lower = text.toLowerCase();

        // Extract Age
        const ageMatch = lower.match(/(\d+)\s*(years|yrs|old)/);
        if (ageMatch) profile.age = parseInt(ageMatch[1]);

        // Extract Occupation
        if (lower.includes('farmer') || lower.includes('kisan')) profile.occupation = 'Farmer';
        if (lower.includes('student')) profile.occupation = 'Student';

        // Extract Land
        const landMatch = lower.match(/(\d+)\s*(acre|hectare|bigha)/);
        if (landMatch) profile.landAcres = parseFloat(landMatch[1]); // Normalize to acres later if real

        // Extract Gender
        if (lower.includes('female') || lower.includes('woman') || lower.includes('girl') || lower.includes('lady')) profile.gender = 'Female';

        return profile;
    }

    // Logic Engine: Deduce Schemes
    analyzeEligibility(text: string, lang: string = 'en'): string | null {
        const profile = this.extractProfile(text);
        const schemes: string[] = [];

        // Logic 1: Elderly Pension
        if (profile.age && profile.age >= 60) {
            schemes.push(lang === 'hi' ? "वृद्धावस्था पेंशन (₹1000-3000/माह)" : "Old Age Pension Scheme (₹1000-3000/mo)");
        }

        // Logic 2: PM-Kisan (Farmer)
        if (profile.occupation === 'Farmer' || (profile.landAcres && profile.landAcres > 0)) {
            schemes.push(lang === 'hi' ? "पीएम-किसान सम्मान निधि (₹6000/वर्ष)" : "PM-Kisan Samman Nidhi (₹6000/year)");

            if (profile.age && profile.age >= 18 && profile.age <= 40) {
                schemes.push(lang === 'hi' ? "पीएम-किसान मानधन (पेंशन)" : "PM-Kisan Maandhan (Pension)");
            }
        }

        // Logic 3: Student / Scholarship
        if (profile.occupation === 'Student' || (profile.age && profile.age < 25)) {
            schemes.push(lang === 'hi' ? "राष्ट्रीय छात्रवृत्ति (एनएसपी)" : "National Scholarship Portal (NSP)");
        }

        // Logic 4: Women Specific
        if (profile.gender === 'Female') {
            schemes.push(lang === 'hi' ? "पीएम मातृ वंदना योजना" : "PM Matru Vandana Yojana");
            if (profile.age && profile.age >= 18) {
                schemes.push(lang === 'hi' ? "लखपति दीदी योजना" : "Lakhpati Didi Scheme");
            }
        }

        if (schemes.length > 0) {
            const intro = lang === 'hi'
                ? "📋 आपके विवरण के आधार पर, आप इन योजनाओं के लिए पात्र हो सकते हैं:"
                : "📋 Based on your details, you might be eligible for these schemes:";
            return `${intro}\n\n` + schemes.map(s => `• ${s}`).join('\n');
        }

        return null;
    }
}

export const schemeAnalyzer = new SchemeAnalyzer();
