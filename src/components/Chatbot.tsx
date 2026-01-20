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
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulated AI response logic
        setTimeout(() => {
            const botResponse = generateResponse(inputValue, pathname, language);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const generateResponse = (input: string, path: string, lang: string) => {
        // Simple context-aware logic
        const lowerInput = input.toLowerCase();

        if (path.includes('electricity')) {
            return lang === 'en' ? "I see you're on the Electricity page. You can pay your bill or apply for a new connection here." : t.electricity + " - " + t.moreServices;
        }
        if (path.includes('ration')) {
            return lang === 'en' ? "For Ration Card services, ensure you have your family details ready." : t.rationCard + " - " + t.moreServices;
        }
        if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('namaste')) {
            return t.botGreeting;
        }

        return lang === 'en' ? "I'm here to help with all government services. What specific information do you need?" : t.moreServices;
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
                {isTyping && (
                    <div style={styles.typingIndicator}>
                        <span></span><span></span><span></span>
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
        right: '2rem',
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
        bottom: '2rem',
        right: '2rem',
        width: '350px',
        height: '500px',
        maxHeight: '80vh',
        maxWidth: '90vw',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease-out',
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
        padding: '10px',
        alignSelf: 'flex-start',
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
