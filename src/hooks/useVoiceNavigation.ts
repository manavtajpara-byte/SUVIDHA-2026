'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function useVoiceNavigation() {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');

    // Safe access to window.webkitSpeechRecognition or window.SpeechRecognition
    const startListening = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Speech recognition is not supported in this browser. Please use Chrome.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US'; // We can make this dynamic based on AppState language later
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening... (Try 'Go Home' or 'Electricity')");
        };

        recognition.onresult = (event: any) => {
            const command = event.results[0][0].transcript.toLowerCase();
            setTranscript(command);
            processCommand(command);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setFeedback("Error listening. Please try again.");
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    }, [router]);

    const processCommand = (command: string) => {
        setFeedback(`Heard: "${command}"`);

        // Simple keywords mapping
        if (command.includes('home') || command.includes('dashboard')) {
            router.push('/');
            setFeedback("Navigating Home...");
        } else if (command.includes('electricity') || command.includes('light') || command.includes('bill')) {
            router.push('/electricity/pay');
            setFeedback("Opening Electricity Services...");
        } else if (command.includes('gas') || command.includes('cylinder')) {
            router.push('/gas/pay');
            setFeedback("Opening Gas Services...");
        } else if (command.includes('emergency') || command.includes('help') || command.includes('police')) {
            router.push('/emergency');
            setFeedback("Opening Emergency Help...");
        } else if (command.includes('about') || command.includes('info')) {
            router.push('/about');
        } else {
            setFeedback("Command not recognized. Try 'Go Home'.");
        }
    };

    return { isListening, startListening, transcript, feedback };
}
