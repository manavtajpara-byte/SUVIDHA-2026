'use client';

import { useState, useCallback } from 'react';
import { useAppState } from '@/context/StateContext';

export default function useVoiceForm(onFieldFill: (field: string, value: string) => void) {
    const { addToast } = useAppState();
    const [isListening, setIsListening] = useState(false);

    const startVoiceFill = useCallback((fieldLabel: string) => {
        if (!('webkitSpeechRecognition' in window)) {
            addToast({ message: 'Speech Recognition not supported in this browser', type: 'error' });
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.lang = 'en-IN'; // Can be dynamic based on app language
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            addToast({ message: `Listening for ${fieldLabel}...`, type: 'info' });
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onFieldFill(fieldLabel, transcript);
            setIsListening(false);
            addToast({ message: `Filled ${fieldLabel}: ${transcript}`, type: 'success' });
        };

        recognition.onerror = () => {
            setIsListening(false);
            addToast({ message: 'Speech recognition error', type: 'error' });
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    }, [addToast, onFieldFill]);

    return { isListening, startVoiceFill };
}
