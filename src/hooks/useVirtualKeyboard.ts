'use client';

import { useState, useCallback } from 'react';

export function useVirtualKeyboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeInput, setActiveInput] = useState<string | null>(null);
    const [values, setValues] = useState<Record<string, string>>({});

    const openKeyboard = useCallback((inputName: string) => {
        setActiveInput(inputName);
        setIsOpen(true);
    }, []);

    const closeKeyboard = useCallback(() => {
        setIsOpen(false);
        setActiveInput(null);
    }, []);

    const handleInput = (char: string) => {
        if (!activeInput) return;
        setValues(prev => ({
            ...prev,
            [activeInput]: (prev[activeInput] || '') + char
        }));
    };

    const handleDelete = () => {
        if (!activeInput) return;
        setValues(prev => ({
            ...prev,
            [activeInput]: (prev[activeInput] || '').slice(0, -1)
        }));
    };

    return {
        isOpen,
        openKeyboard,
        closeKeyboard,
        handleInput,
        handleDelete,
        values,
        setValues
    };
}
