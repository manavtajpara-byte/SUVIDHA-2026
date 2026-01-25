/**
 * SUVIDHA 2026 - PrivacyManager
 * Implements Phase 127: Data Privacy (DPDP Compliance)
 * Manages user consent, data portability, and erasure requests.
 */

export interface ConsentProfile {
    aadhaar: boolean;
    location: boolean;
    healthRecords: boolean;
    marketing: boolean;
    lastUpdated: string;
}

class PrivacyManagerClass {
    private consentKey = 'suvidha_privacy_consent';

    public getConsent(): ConsentProfile {
        if (typeof window === 'undefined') return this.getDefaultConsent();
        const saved = localStorage.getItem(this.consentKey);
        return saved ? JSON.parse(saved) : this.getDefaultConsent();
    }

    public updateConsent(updates: Partial<ConsentProfile>) {
        const current = this.getConsent();
        const newState = {
            ...current,
            ...updates,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem(this.consentKey, JSON.stringify(newState));
        console.log('[PrivacyManager] DPDP Consent Profile Updated.');
        return newState;
    }

    private getDefaultConsent(): ConsentProfile {
        return {
            aadhaar: true,
            location: true,
            healthRecords: true,
            marketing: false,
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Simulation: Right to Erasure
     * Purges all local personal data.
     */
    public requestErasure() {
        console.warn('[PrivacyManager] ERASURE REQUEST RECEIVED. Purging citizen data nodes...');
        const keysToClear = [
            'suvidha_session_user',
            'suvidha_user_name',
            'suvidha_offline_queue',
            this.consentKey
        ];
        keysToClear.forEach(k => localStorage.removeItem(k));
        return true;
    }

    /**
     * Simulation: Data Portability
     * Generates a JSON dump of all stored data for the user.
     */
    public exportData(): string {
        const data = {
            profile: JSON.parse(localStorage.getItem('suvidha_session_user') || '{}'),
            consent: this.getConsent(),
            auditLog: ['Consent granted 12 Jan 2026', 'Profile updated 15 Jan 2026']
        };
        return JSON.stringify(data, null, 2);
    }
}

export const PrivacyManager = new PrivacyManagerClass();
