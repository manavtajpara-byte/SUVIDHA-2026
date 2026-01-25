'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, MessageSquarePlus, Bot, User, Brain, Image as ImageIcon } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { usePathname } from 'next/navigation';
import { aiLearningEngine } from '@/utils/AILearningEngine';
import { fullTrainingDataset } from '@/utils/trainingDataset';
import { webSearchService } from '@/services/WebSearchService';
import { mathEngine } from '@/utils/MathEngine';
import { schemeAnalyzer } from '@/utils/SchemeAnalyzer';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    feedbackGiven?: boolean;
    userQuestion?: string; // Store original question for learning
    category?: string; // Response category for learning
    reasoning?: string[]; // Chain of thought
}

export default function Chatbot() {
    const { language, addToast } = useAppState();
    const t = (translations[language] || translations.en) as any;
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const [isEdgeAI, setIsEdgeAI] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [learnedCount, setLearnedCount] = useState(0);
    const [isDeepReasoning, setIsDeepReasoning] = useState(false);
    const [isVisionMode, setIsVisionMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [isProactiveDismissed, setIsProactiveDismissed] = useState(true); // Default true to avoid flash, set false in effect

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem('suvidha_proactive_dismissed') === 'true';
            setIsProactiveDismissed(dismissed);
        }
    }, []);

    // Initialize AI training on first load
    useEffect(() => {
        const hasTrainedKey = 'suvidha_ai_initial_training';
        const hasTrained = localStorage.getItem(hasTrainedKey);

        if (!hasTrained) {
            setIsTraining(true);
            // Train AI with all 105 questions in background
            setTimeout(() => {
                aiLearningEngine.bulkTrain(fullTrainingDataset);
                localStorage.setItem(hasTrainedKey, 'true');
                setIsTraining(false);
                const analytics = aiLearningEngine.getAnalytics();
                setLearnedCount(analytics.totalPatterns);
            }, 1000);
        } else {
            const analytics = aiLearningEngine.getAnalytics();
            setLearnedCount(analytics.totalPatterns);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            if (messages.length === 0) {
                // Initial greeting
                setMessages([{
                    id: '1',
                    text: t.botGreeting,
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }
        }
    }, [isOpen, t.botGreeting]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, processingStep]);


    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue;
        setInputValue('');
        setIsTyping(true);
        setProcessingStep(t.thinking || 'Thinking...');

        // Multi-stage thinking simulation
        setTimeout(() => {
            setProcessingStep(t.analyzing || 'Analyzing your request...');

            setTimeout(async () => {
                const { response: botResponse, category, reasoning } = await generateResponse(currentInput, pathname, language);
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: botResponse,
                    sender: 'bot',
                    timestamp: new Date(),
                    userQuestion: currentInput,
                    category,
                    reasoning
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
                setProcessingStep('');
            }, 1000);
        }, 800);
    };

    const generateResponse = async (input: string, path: string, lang: string): Promise<{ response: string; category: string; reasoning?: string[] }> => {
        const lowerInput = input.toLowerCase();

        // --- PHASE 4: MULTI-INTENT RECOGNITION ---
        if (lowerInput.includes(' and ') && !lowerInput.includes('between')) {
            const parts = lowerInput.split(' and ');
            if (parts.length === 2) {
                const res1 = await generateResponse(parts[0], path, lang);
                const res2 = await generateResponse(parts[1], path, lang);
                return {
                    response: `1️⃣ ${res1.response}\n\n2️⃣ ${res2.response}`,
                    category: 'multi_intent'
                };
            }
        }

        // --- PHASE 3: SENTIMENT ADAPTATION ---
        const sentiment = aiLearningEngine.analyzeSentiment(input);
        let sentimentPrefix = '';
        if (sentiment === 'urgent') return { response: "🚨 I detect an emergency. Please call 112 immediately. How can I help?", category: 'emergency' };
        if (sentiment === 'negative') sentimentPrefix = "I apologize for the inconvenience. Let's fix this. ";

        // --- PHASE 12: PROBLEM DECOMPOSITION (Complex Queries) ---
        if (lowerInput.includes('start a business') || lowerInput.includes('build a house')) {
            return {
                response: `${sentimentPrefix}To ${lowerInput.includes('business') ? 'start a business' : 'build a house'}, let's break it down:\n1. **Planning**: Get permits.\n2. **Finance**: Apply for Mudra Loan.\n3. **Execution**: Register on portal.\nWould you like to start with Step 1?`,
                category: 'decomposition'
            };
        }

        // --- PHASE 19: SOCRATIC TEACHING (Education Mode) ---
        if (path.includes('education') && (lowerInput.includes('what is') || lowerInput.includes('teach me'))) {
            return {
                response: `🤔 That's a good question! Instead of just telling you, let me ask: What do you think is the main benefit of this? (Hint: Think about your future skills!)`,
                category: 'socratic'
            };
        }

        // --- PHASE 2: CONTEXT AWARENESS (Memory) ---
        // Setting Memory
        const nameMatch = lowerInput.match(/my name is (\w+)/);
        if (nameMatch) {
            localStorage.setItem('suvidha_user_name', nameMatch[1]);
            return {
                response: `Nice to meet you, ${nameMatch[1]}! I've remembered your name.`,
                category: 'context_memory'
            };
        }
        // Getting Memory
        if (lowerInput.includes('who am i') || lowerInput.includes('my name')) {
            const name = localStorage.getItem('suvidha_user_name');
            if (name) return { response: `You are ${name}.`, category: 'context_memory' };
        }

        // --- PHASE 20: SINGULARITY PROTOCOL (Self-Coding) ---
        if (lowerInput.includes('write code') || lowerInput.includes('generate script')) {
            return {
                response: "💻 **Singularity Protocol Engaged**\nGenerating Python script for automation:\n```python\nimport suvidha_sdk\n\ndef automate_bill_payment():\n    user = suvidha_sdk.get_user()\n    bills = user.fetch_pending_bills()\n    for bill in bills:\n        if bill.is_due_soon():\n            bill.pay(auto=True)\n            print(f'Paid {bill.id}')\n\nautomate_bill_payment()\n```\n*I have generated this script to automate your bill payments.*",
                category: 'singularity_code'
            };
        }

        // PRIORITY 1: Check learned patterns (Fuzzy Logic Enhanced)
        const learnedMatch = aiLearningEngine.processQuery(input);
        if (learnedMatch && learnedMatch.category !== 'unknown') {
            return {
                response: learnedMatch.response,
                category: learnedMatch.category,
                reasoning: learnedMatch.reasoning
            };
        }

        // PRIORITY 1.2: MULTIMODAL VISION SIMULATION
        if (isVisionMode) {
            setIsVisionMode(false);
            return {
                response: "👁️ **Document Analysis Complete**\nI have scanned the uploaded Identity Card.\n\n- **Name:** Verified Citizen\n- **ID Type:** Aadhaar Card\n- **Status:** Valid & Linked to Digital Locker\n\nI have pre-filled your eligibility form based on this data. Shall we proceed?",
                category: 'vision_analysis',
                reasoning: ['Activating Neural Vision Engine...', 'Segmenting document regions', 'OCR character extraction', 'Cross-referencing with UIDAI-SEC-CORE', 'Validation Success']
            };
        }

        // PRIORITY 1.5: LEVEL 3 REASONING (Math & Logic)
        const mathResult = mathEngine.solve(input, lang);
        if (mathResult) {
            return {
                response: mathResult,
                category: 'calculation',
                reasoning: ['Parsing mathematical expression', 'Checking operator precedence', 'Computing via Aethel-Arith Core']
            };
        }

        const schemeResult = schemeAnalyzer.analyzeEligibility(input, lang);
        if (schemeResult) {
            return { response: schemeResult, category: 'scheme_logic' };
        }

        // PRIORITY 2: Comprehensive SUVIDHA Knowledge Base
        const knowledgeBase: Record<string, any> = {
            // ... (keep existing)
            en: {
                // Core Utility Services
                electricity: {
                    keywords: ['electricity', 'power', 'bill', 'outage', 'meter', 'connection', 'electric', 'light', 'bijli'],
                    response: "⚡ Electricity Services: You can pay bills, report outages, apply for new connections, or check consumption history. Quick Pay is available for instant bill payment. Current grid status: All systems operational."
                },
                gas: {
                    keywords: ['gas', 'cylinder', 'lpg', 'refill', 'booking', 'subsidy', 'ujjwala'],
                    response: "🔥 Gas Services: Book LPG cylinders, check subsidy status, report leaks (dial 1906), or apply for new connections. Ujjwala beneficiaries get priority delivery within 24 hours."
                },
                water: {
                    keywords: ['water', 'jal', 'supply', 'tanker', 'quality', 'complaint', 'leak'],
                    response: "💧 Water Services: Report supply issues, request tankers, check water quality reports, or pay water bills. Emergency tanker requests are processed within 2 hours."
                },

                // Financial & Banking
                finance: {
                    keywords: ['money', 'bank', 'withdrawal', 'aeps', 'loan', 'pension', 'finance', 'payment', 'cash', 'account', 'balance'],
                    response: "💰 Financial Services: AEPS Micro-ATM supports cash withdrawal (₹10,000 limit), balance inquiry, and mini statements. For loans, check PM-SVANidhi or Mudra schemes. Jan Dhan accounts can be opened instantly."
                },
                pension: {
                    keywords: ['pension', 'senior', 'widow', 'disability', 'social security', 'elderly'],
                    response: "👴 Pension Services: Check pension status, update bank details, or apply for social security schemes. Aadhaar-based life certificates can be submitted digitally."
                },

                // Identity & Documents
                identity: {
                    keywords: ['aadhaar', 'pan', 'document', 'verify', 'passport', 'id', 'card', 'digital locker'],
                    response: "🆔 Identity Services: Digital Locker now uses Quantum-Secure encryption (L6 Trust). Store Aadhaar, PAN, driving license, and certificates. All documents are blockchain-verified."
                },
                ration: {
                    keywords: ['ration', 'food', 'grain', 'pds', 'ration card', 'subsidy'],
                    response: "🌾 Ration Card Services: Apply for new cards, update family details, check entitlement, or download digital ration cards. PDS allocation is updated monthly."
                },

                // Health Services
                health: {
                    keywords: ['doctor', 'medicine', 'health', 'hospital', 'appointment', 'sick', 'vaccine', 'abha', 'ayushman'],
                    response: "🏥 Health Services: Start eSanjeevani video consultations, book appointments, get ABHA health ID, or check Ayushman Bharat eligibility. Prescriptions are digitally signed and stored."
                },
                vaccine: {
                    keywords: ['vaccination', 'immunization', 'cowin', 'vaccine certificate'],
                    response: "💉 Vaccination: Download CoWIN certificates, check vaccination status, or book slots for upcoming drives. All records are linked to your ABHA ID."
                },

                // Education & Skills
                education: {
                    keywords: ['learn', 'course', 'study', 'education', 'job', 'skill', 'student', 'training', 'certificate'],
                    response: "📚 Education Hub: 500+ Skill India courses available. High-demand sectors for 2026: Cyber-Security, Agri-Robotics, Green Energy. Courses include certification and job placement support."
                },
                scholarship: {
                    keywords: ['scholarship', 'fee', 'student aid', 'education loan'],
                    response: "🎓 Scholarships: Check eligibility for NSP (National Scholarship Portal), apply for education loans, or track disbursement status. Merit-based and need-based options available."
                },

                // Agriculture
                agriculture: {
                    keywords: ['farmer', 'crop', 'soil', 'agriculture', 'fertilizer', 'drone', 'farming', 'kisan', 'mandi'],
                    response: "🌱 Agriculture Services: Book soil health drones, check PM-Kisan status, get MSP rates, access weather forecasts, or sell produce on e-NAM. Bio-fertilizers mandatory for Green Export Scheme."
                },

                // Transport
                transport: {
                    keywords: ['bus', 'metro', 'pass', 'ticket', 'transport', 'travel', 'recharge'],
                    response: "🚌 Transport Services: Issue bus passes, recharge metro cards, check route schedules, or apply for senior citizen concessions. Digital passes activate instantly."
                },
                license: {
                    keywords: ['driving license', 'dl', 'learner', 'vehicle', 'registration'],
                    response: "🚗 Driving License: Apply for learner's license, renew DL, check application status, or download digital DL. Vehicle registration services also available."
                },

                // Governance & Transparency
                grievance: {
                    keywords: ['complaint', 'grievance', 'problem', 'issue', 'report', 'feedback'],
                    response: "📢 Grievance Redressal: File complaints via CPGRAMS integration. Track status in real-time. Average resolution time: 15 days. Escalation available after 7 days."
                },
                transparency: {
                    keywords: ['transparency', 'blockchain', 'audit', 'fund', 'grant', 'ledger'],
                    response: "🔗 Transparency Portal: View blockchain-verified public grants, audit trails, and fund allocation. All transactions are immutable and publicly verifiable."
                },

                // Vision 2030 Modules
                vision2030: {
                    keywords: ['vision', '2030', 'future', 'smart village', 'iot', 'singularity', 'ar training', 'predictive'],
                    response: "🚀 Vision 2030 Hub: Explore futuristic services - Smart Village IoT, AEPS Micro-ATM, Education Hub, AR Training, Predictive Governance, and The Singularity (autonomous AI). India's digital future, today."
                },
                iot: {
                    keywords: ['sensor', 'monitoring', 'real-time', 'telemetry', 'smart'],
                    response: "📡 Smart Village IoT: Monitor water purity (98%), air quality (AQI 42), street-lights, and soil pH in real-time. Remote control actions available for all nodes."
                },

                // Commerce & Business
                commerce: {
                    keywords: ['sell', 'buy', 'market', 'bazaar', 'shop', 'business', 'vendor'],
                    response: "🛒 Gram Bazaar: Village e-commerce platform. Sell agricultural produce, handicrafts, or local products. Camera-based product listing with instant QR codes."
                },

                // Emergency Services
                emergency: {
                    keywords: ['emergency', 'police', 'ambulance', 'fire', 'leak', 'accident', 'urgent', 'help', 'danger'],
                    response: "🚨 EMERGENCY: Dial 112 for national emergency, 1906 for gas leaks, 102 for ambulance. Exit premises immediately if you smell gas. Stay calm, help is on the way."
                },

                // Technical Support
                tech: {
                    keywords: ['internet', 'wi-fi', 'network', 'kiosk', 'offline', 'ai', 'system', 'error', 'not working'],
                    response: "🖥️ Technical Support: This kiosk runs on Edge AI with offline capability. Network issues? System auto-switches to local processing. For hardware problems, use AR Training module or contact support."
                },

                // General India & Development
                general: {
                    keywords: ['india', 'development', 'government', 'country', 'digital india', 'scheme'],
                    response: "🇮🇳 Digital India: SUVIDHA Kiosks deliver 500+ government schemes with zero leakages. Part of the Omni-Project for last-mile service delivery. India leads global digital governance."
                },

                // Greetings
                greeting: {
                    keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening'],
                    response: "🙏 Namaste! I'm SUVIDHA AI, your intelligent assistant for all government services. Ask me about electricity, health, education, agriculture, or any of our 500+ services. How can I help you today?"
                },

                // Help & Navigation
                help: {
                    keywords: ['help', 'guide', 'how to', 'what can you do', 'services', 'list'],
                    response: "ℹ️ I can help with: ⚡Utilities (Electricity/Gas/Water) 💰Finance (AEPS/Loans/Pension) 🆔Documents (Aadhaar/PAN/Ration) 🏥Health (Doctors/ABHA) 📚Education 🌱Agriculture 🚌Transport 🚀Vision 2030. What do you need?"
                }
            },
            hi: {
                electricity: {
                    keywords: ['बिजली', 'पावर', 'बिल', 'आउटेज', 'मीटर', 'कनेक्शन'],
                    response: "⚡ बिजली सेवाएं: बिल भुगतान, आउटेज रिपोर्ट, नए कनेक्शन के लिए आवेदन, या खपत इतिहास देखें। त्वरित भुगतान उपलब्ध है। ग्रिड स्थिति: सभी सिस्टम चालू हैं।"
                },
                gas: {
                    keywords: ['गैस', 'सिलेंडर', 'एलपीजी', 'रिफिल', 'बुकिंग', 'सब्सिडी', 'उज्ज्वला'],
                    response: "🔥 गैस सेवाएं: एलपीजी सिलेंडर बुक करें, सब्सिडी स्थिति जांचें, लीक रिपोर्ट करें (1906 डायल करें), या नए कनेक्शन के लिए आवेदन करें। उज्ज्वला लाभार्थियों को 24 घंटे में डिलीवरी।"
                },
                water: {
                    keywords: ['पानी', 'जल', 'आपूर्ति', 'टैंकर', 'गुणवत्ता'],
                    response: "💧 जल सेवाएं: आपूर्ति समस्याओं की रिपोर्ट करें, टैंकर का अनुरोध करें, पानी की गुणवत्ता रिपोर्ट देखें। आपातकालीन टैंकर 2 घंटे में।"
                },
                finance: {
                    keywords: ['पैसा', 'बैंक', 'निकासी', 'एईपीएस', 'ऋण', 'पेंशन', 'वित्त', 'भुगतान'],
                    response: "💰 वित्तीय सेवाएं: एईपीएस माइक्रो-एटीएम नकद निकासी (₹10,000 सीमा), बैलेंस पूछताछ, और मिनी स्टेटमेंट का समर्थन करता है। ऋण के लिए पीएम-स्वनिधि या मुद्रा योजनाएं देखें।"
                },
                health: {
                    keywords: ['डॉक्टर', 'दवा', 'स्वास्थ्य', 'अस्पताल', 'अपॉइंटमेंट', 'बीमार', 'टीका'],
                    response: "🏥 स्वास्थ्य सेवाएं: ई-संजीवनी वीडियो परामर्श शुरू करें, अपॉइंटमेंट बुक करें, आभा स्वास्थ्य आईडी प्राप्त करें। प्रिस्क्रिप्शन डिजिटल रूप से संग्रहीत हैं।"
                },
                agriculture: {
                    keywords: ['किसान', 'फसल', 'मिट्टी', 'कृषि', 'उर्वरक', 'ड्रोन', 'खेती'],
                    response: "🌱 कृषि सेवाएं: मृदा स्वास्थ्य ड्रोन बुक करें, पीएम-किसान स्थिति जांचें, एमएसपी दरें प्राप्त करें, मौसम पूर्वानुमान देखें। ई-नाम पर उपज बेचें।"
                },
                education: {
                    keywords: ['सीखना', 'पाठ्यक्रम', 'अध्ययन', 'शिक्षा', 'नौकरी', 'कौशल', 'छात्र'],
                    response: "📚 शिक्षा केंद्र: 500+ स्किल इंडिया पाठ्यक्रम उपलब्ध। 2026 के लिए उच्च मांग: साइबर-सुरक्षा, कृषि-रोबोटिक्स। प्रमाणन और नौकरी सहायता शामिल।"
                },
                identity: {
                    keywords: ['आधार', 'पैन', 'दस्तावेज', 'सत्यापित', 'पासपोर्ट', 'आईडी'],
                    response: "🆔 पहचान सेवाएं: डिजिटल लॉकर अब क्वांटम-सुरक्षित एन्क्रिप्शन (L6 ट्रस्ट) का उपयोग करता है। आधार, पैन, ड्राइविंग लाइसेंस स्टोर करें। सभी दस्तावेज़ ब्लॉकचेन-सत्यापित हैं।"
                },
                greeting: {
                    keywords: ['नमस्ते', 'हैलो', 'हाय', 'शुभ प्रभात'],
                    response: "🙏 नमस्ते! मैं सुविधा एआई हूं, सभी सरकारी सेवाओं के लिए आपका बुद्धिमान सहायक। बिजली, स्वास्थ्य, शिक्षा, कृषि, या हमारी 500+ सेवाओं के बारे में पूछें। आज मैं आपकी कैसे मदद कर सकता हूं?"
                },
                help: {
                    keywords: ['मदद', 'गाइड', 'कैसे', 'सेवाएं', 'सूची'],
                    response: "ℹ️ मैं मदद कर सकता हूं: ⚡उपयोगिताएं (बिजली/गैस/पानी) 💰वित्त (एईपीएस/ऋण/पेंशन) 🆔दस्तावेज़ (आधार/पैन/राशन) 🏥स्वास्थ्य 📚शिक्षा 🌱कृषि 🚌परिवहन 🚀विज़न 2030। आपको क्या चाहिए?"
                }
            }
        };

        const currentDict = knowledgeBase[lang] || knowledgeBase.en;

        // Smart Multi-Keyword Matching with Priority Scoring
        let bestMatch = { category: '', score: 0 };

        for (const category in currentDict) {
            const matchCount = currentDict[category].keywords.filter((key: string) =>
                lowerInput.includes(key)
            ).length;

            if (matchCount > bestMatch.score) {
                bestMatch = { category, score: matchCount };
            }
        }

        // Return best match if found
        if (bestMatch.score > 0) {
            return {
                response: currentDict[bestMatch.category].response,
                category: bestMatch.category
            };
        }

        // Context-aware fallback based on current page
        if (path.includes('electricity')) return {
            response: lang === 'en'
                ? "⚡ You're on the Electricity page. I can help with bill payments, outage reports, new connections, or consumption tracking. What do you need?"
                : "⚡ आप बिजली पृष्ठ पर हैं। मैं बिल भुगतान, आउटेज रिपोर्ट, नए कनेक्शन में मदद कर सकता हूं। आपको क्या चाहिए?",
            category: 'electricity'
        };

        if (path.includes('gas')) return {
            response: lang === 'en'
                ? "🔥 You're on the Gas Services page. Book cylinders, check subsidies, or report emergencies. How can I assist?"
                : "🔥 आप गैस सेवा पृष्ठ पर हैं। सिलेंडर बुक करें, सब्सिडी जांचें। मैं कैसे मदद करूं?",
            category: 'gas'
        };

        if (path.includes('water')) return {
            response: lang === 'en'
                ? "💧 You're on Water Services. Report issues, request tankers, or check quality reports. What do you need?"
                : "💧 आप जल सेवा पर हैं। समस्याएं रिपोर्ट करें, टैंकर का अनुरोध करें। क्या चाहिए?",
            category: 'water'
        };

        if (path.includes('vision')) return {
            response: lang === 'en'
                ? "🚀 Welcome to Vision 2030 - India's future governance hub. Explore Smart Village IoT, AEPS, Education, AR Training, or Predictive Governance. Which interests you?"
                : "🚀 विज़न 2030 में आपका स्वागत है। स्मार्ट विलेज, एईपीएस, शिक्षा, एआर प्रशिक्षण देखें। क्या देखना चाहेंगे?",
            category: 'vision2030'
        };

        if (path.includes('health')) return {
            response: lang === 'en'
                ? "🏥 You're on Health Services. Start video consultations, book appointments, or get your ABHA ID. How can I help?"
                : "🏥 आप स्वास्थ्य सेवा पर हैं। वीडियो परामर्श, अपॉइंटमेंट, आभा आईडी। मैं कैसे मदद करूं?",
            category: 'health'
        };

        // PRIORITY 3: LEVEL 2 CONNECTIVITY (Google Search Fallback)
        if (!isEdgeAI) { // Only search web if not in Edge/Offline mode
            const webResult = await webSearchService.searchWeb(input);

            // --- PHASE 10: DYNAMIC KNOWLEDGE GRAPH (Auto-Learn from Web) ---
            // Save this new fact to local DB so next time it works offline!
            aiLearningEngine.learnFromInteraction(input, webResult, 'web_learned', true);

            return {
                response: webResult,
                category: 'web_search'
            };
        }

        // Intelligent fallback - suggest relevant services
        return {
            response: lang === 'en'
                ? "🤔 I understand you need assistance. I specialize in:\n\n⚡ Utilities (Electricity, Gas, Water)\n💰 Finance (Banking, Loans, Pension)\n🆔 Documents (Aadhaar, PAN, Ration Card)\n🏥 Health (Doctors, Medicines, ABHA)\n📚 Education & Skills\n🌱 Agriculture\n🚌 Transport\n🚀 Vision 2030 Services\n\nPlease tell me which service you need, and I'll provide detailed guidance!"
                : "🤔 मैं समझता हूं कि आपको सहायता चाहिए। मैं इनमें विशेषज्ञ हूं:\n\n⚡ उपयोगिताएं (बिजली, गैस, पानी)\n💰 वित्त (बैंकिंग, ऋण, पेंशन)\n🆔 दस्तावेज़ (आधार, पैन, राशन कार्ड)\n🏥 स्वास्थ्य\n📚 शिक्षा\n🌱 कृषि\n🚌 परिवहन\n🚀 विज़न 2030\n\nकृपया बताएं कि आपको किस सेवा की आवश्यकता है!",
            category: 'general'
        };
    };

    const handleFeedback = (id: string, positive: boolean) => {
        const message = messages.find(m => m.id === id);
        if (!message || !message.userQuestion || !message.category) return;

        // Update UI
        setMessages(prev => prev.map(m =>
            m.id === id ? { ...m, feedbackGiven: true } : m
        ));

        // Train AI from feedback
        // --- PHASE 15: SELF-CORRECTION LOOP (Reinforcement Learning) ---
        aiLearningEngine.learnFromInteraction(
            message.userQuestion,
            message.text,
            message.category,
            positive
        );

        // Update learned count
        const analytics = aiLearningEngine.getAnalytics();
        setLearnedCount(analytics.totalPatterns);
    };

    // --- FIX: Hooks must be called unconditionally ---
    // Moved the `if (!isOpen)` check inside the render return or kept custom styles logic below

    // Handle Proactive Nudge Dismissal via State (No direct DOM removal)
    const handleDismissNudge = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsProactiveDismissed(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem('suvidha_proactive_dismissed', 'true');
        }
    };

    if (!isOpen) {
        return (
            <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {/* Proactive Nudge (Level 4) */}
                {!isProactiveDismissed && (
                    <div className="proactive-nudge" style={styles.proactiveBubble}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span>💡 <b>Tip:</b> Your electricity bill is due in 2 days. Pay now?</span>
                            <button
                                onClick={handleDismissNudge}
                                style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px', color: '#666' }}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className="chatbot-bubble pulse"
                    onClick={() => setIsOpen(true)}
                    style={styles.bubble}
                >
                    <MessageCircle size={28} color="white" />
                    <span style={styles.bubbleLabel}>{t.chatWithUs}</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.window} className="glass-panel chatbot-window">
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <Bot size={20} />
                    <span>SUVIDHA AI</span>
                    {isTraining && <span style={styles.trainingBadge}>Training...</span>}
                    {!isTraining && learnedCount > 0 && (
                        <span style={styles.learnedBadge} title={`Trained on ${learnedCount} questions`}>
                            <Brain size={12} /> {learnedCount}
                        </span>
                    )}
                    <button
                        onClick={() => setIsEdgeAI(!isEdgeAI)}
                        style={{
                            ...styles.edgeToggle,
                            backgroundColor: isEdgeAI ? '#10b981' : 'rgba(255,255,255,0.2)'
                        }}
                        title={isEdgeAI ? "Edge Mode (Offline Intelligent)" : "Cloud Mode (Active Grid)"}
                    >
                        {isEdgeAI ? 'EDGE' : 'CLOUD'}
                    </button>
                    <button
                        onClick={() => setIsDeepReasoning(!isDeepReasoning)}
                        style={{
                            ...styles.reasonToggle,
                            backgroundColor: isDeepReasoning ? '#6366f1' : 'rgba(255,255,255,0.2)'
                        }}
                        title="Quantum Reasoning Mode"
                    >
                        <Brain size={12} /> REASON
                    </button>
                </div>
                <X
                    size={20}
                    onClick={() => setIsOpen(false)}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <div style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            ...styles.messageWrapper,
                            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                        }}
                    >
                        <div style={{
                            ...styles.avatar,
                            backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--secondary)'
                        }}>
                            {msg.sender === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="white" />}
                        </div>
                        <div style={{
                            ...styles.messageBubble,
                            backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                            color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                            borderRadius: msg.sender === 'user' ? '15px 15px 2px 15px' : '15px 15px 15px 2px',
                        }}>
                            {msg.text}

                            {msg.reasoning && (
                                <div style={styles.reasoningChain}>
                                    <div style={styles.reasoningTitle}>Deep Reasoning Mode Enabled:</div>
                                    {msg.reasoning.map((step, idx) => (
                                        <div key={idx} style={styles.reasoningStep}>↳ {step}</div>
                                    ))}
                                </div>
                            )}

                            {msg.sender === 'bot' && !msg.feedbackGiven && (
                                <div style={styles.feedbackRow}>
                                    <button
                                        onClick={() => handleFeedback(msg.id, true)}
                                        style={styles.feedbackBtn}
                                        title="Helpful"
                                    >
                                        <ThumbsUp size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleFeedback(msg.id, false)}
                                        style={styles.feedbackBtn}
                                        title="Not Helpful"
                                    >
                                        <ThumbsDown size={12} />
                                    </button>
                                </div>
                            )}
                            {msg.feedbackGiven && (
                                <div style={styles.thanksText}>{t.thanksFeedback}</div>
                            )}
                        </div>
                    </div>
                ))}

                {/* PROACTIVE ASSISTANT (Level 4) */}
                {/* Logic: If chat is open, maybe show a nudge inside? Or simple welcome. */}
                {(isTyping || processingStep) && (
                    <div style={styles.messageWrapper}>
                        <div style={{ ...styles.avatar, backgroundColor: 'var(--secondary)' }}>
                            <Bot size={14} color="white" />
                        </div>
                        <div style={{ ...styles.messageBubble, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '15px 15px 15px 2px' }}>
                            <div style={styles.processingWrapper}>
                                {processingStep && <span style={styles.processingText}>{processingStep}</span>}
                                {isTyping && (
                                    <div style={styles.typingIndicator}>
                                        <span></span><span></span><span></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputContainer}>
                <button
                    onClick={() => {
                        setIsVisionMode(true);
                        addToast({ message: "Camera Access Requested: Document Scanner active", type: 'info' });
                    }}
                    style={styles.visionBtn}
                    title="Multimodal Vision"
                >
                    <ImageIcon size={18} color="#6366f1" />
                </button>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isVisionMode ? "Analyzing document..." : t.chatPlaceholder}
                    style={styles.input}
                />
                <button onClick={handleSend} style={styles.sendBtn}>
                    <Send size={18} color="white" />
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    bubble: {
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        width: 'auto',
        minWidth: '60px',
        height: '60px',
        borderRadius: '30px',
        backgroundColor: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: 1000,
        padding: '0 1rem',
        gap: '0.5rem',
        transition: 'transform 0.3s ease',
    },
    bubbleLabel: {
        color: 'white',
        fontWeight: '600',
        fontSize: '0.9rem',
        whiteSpace: 'nowrap',
    },
    window: {
        position: 'fixed',
        bottom: '5.5rem',
        left: '2rem',
        width: '380px',
        height: '500px',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
        overflow: 'hidden',
    },
    header: {
        padding: '1rem',
        background: 'var(--primary)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 'bold',
        flex: 1,
    },
    edgeToggle: {
        fontSize: '0.6rem',
        border: 'none',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '10px',
        cursor: 'pointer',
        fontWeight: 800,
        transition: 'all 0.3s',
    },
    messagesContainer: {
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: 'rgba(255,255,255,0.5)',
    },
    messageWrapper: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'flex-end',
    },
    avatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2px',
    },
    messageBubble: {
        padding: '0.75rem 1rem',
        maxWidth: '80%',
        fontSize: '0.9rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        position: 'relative',
    },
    feedbackRow: {
        display: 'flex',
        gap: '0.4rem',
        marginTop: '0.5rem',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        paddingTop: '0.4rem',
    },
    feedbackBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        opacity: 0.6,
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.2s',
    },
    thanksText: {
        fontSize: '0.75rem',
        opacity: 0.7,
        marginTop: '0.4rem',
        fontStyle: 'italic',
    },
    typingIndicator: {
        display: 'flex',
        gap: '4px',
        padding: '4px 0',
        alignSelf: 'flex-start',
    },
    processingWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    processingText: {
        fontSize: '0.8rem',
        opacity: 0.8,
        fontStyle: 'italic',
        color: 'var(--text-dark)',
    },
    inputContainer: {
        padding: '1rem',
        display: 'flex',
        gap: '0.5rem',
        background: 'white',
        borderTop: '1px solid rgba(0,0,0,0.05)',
    },
    input: {
        flex: 1,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        outline: 'none',
    },
    sendBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    trainingBadge: {
        fontSize: '0.6rem',
        backgroundColor: '#fbbf24',
        color: '#78350f',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '8px',
        fontWeight: 800,
        animation: 'pulse 2s infinite',
    },
    learnedBadge: {
        fontSize: '0.6rem',
        backgroundColor: '#10b981',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '8px',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
    },
    proactiveBubble: {
        marginBottom: '1rem',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '12px 12px 12px 0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        fontSize: '0.9rem',
        maxWidth: '250px',
        animation: 'slideInUp 0.5s ease-out',
        border: '1px solid #e5e7eb',
        color: '#1f2937',
    },
    reasoningChain: {
        marginTop: '0.8rem',
        padding: '0.6rem',
        background: 'rgba(99, 102, 241, 0.05)',
        borderRadius: '8px',
        borderLeft: '2px solid #6366f1',
        fontSize: '0.8rem',
    },
    reasoningTitle: {
        fontWeight: 'bold',
        color: '#6366f1',
        marginBottom: '0.3rem',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    reasoningStep: {
        color: '#64748b',
        paddingLeft: '0.5rem',
        marginBottom: '0.2rem',
    },
    reasonToggle: {
        fontSize: '0.6rem',
        border: 'none',
        color: 'white',
        padding: '2px 6px',
        borderRadius: '4px',
        marginLeft: '10px',
        cursor: 'pointer',
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
    },
    visionBtn: {
        background: 'none',
        border: 'none',
        padding: '0 8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
