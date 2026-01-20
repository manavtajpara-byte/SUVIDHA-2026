'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ThumbsUp, MessageSquarePlus, Bot, User } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { usePathname } from 'next/navigation';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    feedbackGiven?: boolean;
}

export default function Chatbot() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [processingStep, setProcessingStep] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

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

            setTimeout(() => {
                const botResponse = generateResponse(currentInput, pathname, language);
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: botResponse,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
                setProcessingStep('');
            }, 1500);
        }, 1000);
    };

    const generateResponse = (input: string, path: string, lang: string): string => {
        const lowerInput = input.toLowerCase();

        // Comprehensive Solution Knowledge Base
        const solutions: Record<string, Record<string, string>> = {
            en: {
                bill: "To pay your bill, go to the respective sector (Electricity/Gas/Water) and click on 'Quick Bill Pay'. You will need your Consumer Number.",
                apply: "For new applications, select the service and click 'Apply New'. Keep your Aadhaar and proof of residence ready for scanning.",
                status: "You can track any application in the 'Track' section on the homepage by entering your Application ID.",
                leak: "URGENT: For gas leaks, please exit the building immediately and call the emergency helpline mentioned on the Gas page or dial 1906.",
                ration: "Ration Card updates take 7-10 working days. You can download the e-Ration card once the status shows 'Approved'.",
                payment: "We support UPI (QR Code), Debit/Credit Cards, and Net Banking. All transactions are secured by GOI encryption.",
                error: "I apologize for the technical issue. Please try refreshing the page or using the 'Grievance' section to report a bug.",
                hospital: "You can book vaccination slots or generate your ABHA health card in the Healthcare section.",
                transport: "Bus passes can be renewed instantly. For Metro cards, use the top-up feature and then verify at the station kiosk."
            },
            hi: {
                bill: "अपना बिल भुगतान करने के लिए, संबंधित क्षेत्र (बिजली/गैस/पानी) पर जाएं और 'त्वरित बिल भुगतान' पर क्लिक करें। आपको अपने उपभोक्ता नंबर की आवश्यकता होगी।",
                apply: "नए आवेदनों के लिए, सेवा चुनें और 'नया आवेदन करें' पर क्लिक करें। स्कैनिंग के लिए अपना आधार और निवास का प्रमाण तैयार रखें।",
                status: "आप अपने आवेदन आईडी दर्ज करके होमपेज पर 'ट्रैक' अनुभाग में किसी भी आवेदन को ट्रैक कर सकते हैं।",
                leak: "जरूरी: गैस रिसाव के लिए, कृपया तुरंत इमारत से बाहर निकलें और गैस पेज पर उल्लिखित आपातकालीन हेल्पलाइन पर कॉल करें या 1906 डायल करें।",
                ration: "राशन कार्ड अपडेट में 7-10 कार्य दिवस लगते हैं। स्थिति 'अनुमोदित' दिखने के बाद आप ई-राशन कार्ड डाउनलोड कर सकते हैं।",
                payment: "हम यूपीआई (क्यूआर कोड), डेबिट/क्रेडिट कार्ड और नेट बैंकिंग का समर्थन करते हैं। सभी लेनदेन भारत सरकार के एन्क्रिप्शन द्वारा सुरक्षित हैं।",
                error: "तकनीकी समस्या के लिए मैं क्षमा चाहता हूँ। कृपया पेज को रिफ्रेश करने का प्रयास करें या बग रिपोर्ट करने के लिए 'शिकायत' अनुभाग का उपयोग करें।",
                hospital: "आप टीकाकरण स्लॉट बुक कर सकते हैं या स्वास्थ्य सेवा अनुभाग में अपना आभा (ABHA) स्वास्थ्य कार्ड बना सकते हैं।",
                transport: "बस पास तुरंत नवीनीकृत किए जा सकते हैं। मेट्रो कार्ड के लिए, टॉप-अप सुविधा का उपयोग करें और फिर स्टेशन कियोस्क पर सत्यापित करें।"
            }
        };

        const currentSolutions = solutions[lang] || solutions.en;

        // Keyword Matching
        if (lowerInput.includes('bill') || lowerInput.includes('pay') || lowerInput.includes('भुगतान')) return currentSolutions.bill;
        if (lowerInput.includes('apply') || lowerInput.includes('new') || lowerInput.includes('नया')) return currentSolutions.apply;
        if (lowerInput.includes('status') || lowerInput.includes('track') || lowerInput.includes('स्थिति')) return currentSolutions.status;
        if (lowerInput.includes('leak') || lowerInput.includes('gas') || lowerInput.includes('रिसाव')) return currentSolutions.leak;
        if (lowerInput.includes('ration') || lowerInput.includes('card') || lowerInput.includes('राशन')) return currentSolutions.ration;
        if (lowerInput.includes('hospital') || lowerInput.includes('health') || lowerInput.includes('अस्पताल')) return currentSolutions.hospital;
        if (lowerInput.includes('transport') || lowerInput.includes('bus') || lowerInput.includes('परिवहन')) return currentSolutions.transport;
        if (lowerInput.includes('payment') || lowerInput.includes('upi')) return currentSolutions.payment;
        if (lowerInput.includes('error') || lowerInput.includes('help')) return currentSolutions.error;

        // Context-aware fallback
        if (path.includes('electricity')) return lang === 'en' ? "I'm analyzing your electricity account. You can pay bills or report outages here." : "मैं आपके बिजली खाते का विश्लेषण कर रहा हूँ। आप यहाँ बिल भुगतान कर सकते हैं या आउटेज की रिपोर्ट कर सकते हैं।";
        if (path.includes('ration')) return lang === 'en' ? "For Ration Card services, ensure your family details are updated in the system." : "राशन कार्ड सेवाओं के लिए, सुनिश्चित करें कि आपके परिवार का विवरण सिस्टम में अपडेट है।";

        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('namaste')) return t.botGreeting;

        return lang === 'en' ? "I have analyzed your query. To provide a proper solution, could you please specify which service (Electricity, Gas, Ration, etc.) you are inquiring about?" : "मैंने आपके प्रश्न का विश्लेषण किया है। उचित समाधान प्रदान करने के लिए, क्या आप कृपया बता सकते हैं कि आप किस सेवा (बिजली, गैस, राशन, आदि) के बारे में पूछ रहे हैं?";
    };

    const handleFeedback = (id: string) => {
        setMessages(prev => prev.map(m =>
            m.id === id ? { ...m, feedbackGiven: true } : m
        ));
        // In a real app, send feedback to server
    };

    if (!isOpen) {
        return (
            <div
                className="chatbot-bubble pulse"
                onClick={() => setIsOpen(true)}
                style={styles.bubble}
            >
                <MessageCircle size={28} color="white" />
                <span style={styles.bubbleLabel}>{t.chatWithUs}</span>
            </div>
        );
    }

    return (
        <div style={styles.window} className="glass-panel chatbot-window">
            <div style={styles.header}>
                <div style={styles.headerTitle}>
                    <Bot size={20} />
                    <span>SUVIDHA AI</span>
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

                            {msg.sender === 'bot' && !msg.feedbackGiven && (
                                <div style={styles.feedbackRow}>
                                    <button
                                        onClick={() => handleFeedback(msg.id)}
                                        style={styles.feedbackBtn}
                                        title={t.helpful}
                                    >
                                        <ThumbsUp size={12} />
                                    </button>
                                    <button
                                        onClick={() => handleFeedback(msg.id)}
                                        style={styles.feedbackBtn}
                                        title={t.suggestCorrection}
                                    >
                                        <MessageSquarePlus size={12} />
                                    </button>
                                </div>
                            )}
                            {msg.feedbackGiven && (
                                <div style={styles.thanksText}>{t.thanksFeedback}</div>
                            )}
                        </div>
                    </div>
                ))}
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
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chatPlaceholder}
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
};
