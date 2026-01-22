'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

interface VoiceState {
    isListening: boolean;
    isSpeaking: boolean;
    transcript: string;
    lastCommand: string;
    feedback: string;
}

export default function useVoiceNavigation() {
    const router = useRouter();
    const { language } = useAppState();
    const [state, setState] = useState<VoiceState>({
        isListening: false,
        isSpeaking: false,
        transcript: '',
        lastCommand: '',
        feedback: ''
    });

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);

    // Initialize Speech Synthesis
    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
        }
    }, []);

    // Speak Function
    const speak = useCallback((text: string, forceLang?: string) => {
        if (!synthesisRef.current) return;

        // Cancel current speech
        synthesisRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Select Voice based on language
        const voices = synthesisRef.current.getVoices();
        const langCode = forceLang || (language === 'hi' ? 'hi-IN' : 'en-US');

        // Try to find a matching voice
        const voice = voices.find(v => v.lang.includes(langCode)) || voices[0];
        if (voice) utterance.voice = voice;

        utterance.lang = langCode;
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;

        utterance.onstart = () => setState(prev => ({ ...prev, isSpeaking: true }));
        utterance.onend = () => setState(prev => ({ ...prev, isSpeaking: false }));
        utterance.onerror = () => setState(prev => ({ ...prev, isSpeaking: false }));

        synthesisRef.current.speak(utterance);
    }, [language]);

    // Command Processor
    const processCommand = useCallback((cmd: string) => {
        const command = cmd.toLowerCase();
        let feedbackText = '';
        let targetPath = '';

        // HINDI & ENGLISH COMMANDS MAPPING
        if (command.includes('home') || command.includes('ghar') || command.includes('main menu')) {
            targetPath = '/';
            feedbackText = language === 'hi' ? "Main Menu par ja rahe hain" : "Going to Main Menu";
        }
        else if (command.includes('electricity') || command.includes('bijli') || command.includes('bill')) {
            targetPath = '/electricity/pay';
            feedbackText = language === 'hi' ? "Bijli Vibhaag khol rahe hain" : "Opening Electricity Services";
        }
        else if (command.includes('water') || command.includes('pani') || command.includes('jal')) {
            targetPath = '/water'; // Assuming we have this, or map to nearest
            feedbackText = language === 'hi' ? "Pani Sewa khol rahe hain" : "Opening Water Services";
        }
        else if (command.includes('gas') || command.includes('cylinder')) {
            targetPath = '/gas/pay';
            feedbackText = language === 'hi' ? "Gas booking khol rahe hain" : "Opening Gas Booking";
        }
        else if (command.includes('emergency') || command.includes('madad') || command.includes('help') || command.includes('police')) {
            targetPath = '/emergency';
            feedbackText = language === 'hi' ? "Apatkalin sewa khol rahe hain" : "Opening Emergency Services";
        }
        else if (command.includes('vision') || command.includes('future') || command.includes('2030')) {
            targetPath = '/vision/singularity';
            feedbackText = "Opening Vision 2030";
        }
        else if (command.includes('about') || command.includes('jankari') || command.includes('info')) {
            targetPath = '/about';
            feedbackText = "Opening Information";
        }
        else {
            feedbackText = language === 'hi' ? "Maaf karein, samajh nahi aya." : "Sorry, I didn't catch that.";
        }

        setState(prev => ({ ...prev, lastCommand: command, feedback: feedbackText }));

        if (feedbackText) speak(feedbackText);

        if (targetPath) {
            router.push(targetPath);
        }
    }, [router, language, speak]);

    // Initializer for Speech Recognition
    const startListening = useCallback(() => {
        if (typeof window === 'undefined') return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Chrome.");
            return;
        }

        // Cancel speech before listening to avoid feedback loop
        if (synthesisRef.current) synthesisRef.current.cancel();

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setState(prev => ({ ...prev, isListening: true, feedback: 'Listening...' }));
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setState(prev => ({ ...prev, transcript }));
            processCommand(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech error", event.error);
            setState(prev => ({ ...prev, isListening: false, feedback: 'Error. Try again.' }));
        };

        recognition.onend = () => {
            setState(prev => ({ ...prev, isListening: false }));
        };

        recognition.start();
    }, [language, processCommand]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    return {
        ...state,
        startListening,
        stopListening,
        speak
    };
}
