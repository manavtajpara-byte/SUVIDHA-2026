// AI Learning Engine - Self-Training System
// Stores learned patterns, calculates similarity, manages confidence scores

export interface LearnedPattern {
    id: string;
    question: string;
    keywords: string[];
    response: string;
    category: string;
    confidence: number;
    feedbackCount: { positive: number; negative: number };
    usageCount: number;
    learnedAt: Date;
    lastUsed?: Date;
    approved: boolean;
}

export interface TrainingData {
    question: string;
    response: string;
    category: string;
    keywords: string[];
}

import { fullTrainingDataset } from './trainingDataset';

class AILearningEngine {
    processQuery(query: string): { response: string, category: string, reasoning?: string[] } {
        const q = query.toLowerCase();

        // Find best match in dataset
        const match = fullTrainingDataset.find(item =>
            item.keywords.some(k => q.includes(k.toLowerCase())) ||
            q.includes(item.question.toLowerCase())
        );

        if (match) {
            // Generate simulated reasoning for Stage 3
            let reasoning: string[] = [];
            if (match.response.includes('Reasoning:')) {
                const parts = match.response.split('\n');
                reasoning = parts[0].replace('Reasoning:', '').split('→').map(p => p.trim());
            }

            return {
                response: match.response,
                category: match.category,
                reasoning: reasoning.length > 0 ? reasoning : undefined
            };
        }

        return {
            response: "I am analyzing your request across all government databases... I don't have a specific local answer yet. Would you like me to perform a Global Web Search?",
            category: "unknown"
        };
    }

    private storageKey = 'suvidha_ai_learned_patterns';
    private conversationKey = 'suvidha_ai_context'; // New Context Stoarge

    // Levenshtein Distance for Fuzzy Matching (Phase 48 - Level 1)
    private levenshtein(a: string, b: string): number {
        const matrix = [];

        // Increment along the first column of each row
        let i;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // Increment each column in the first row
        let j;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1)); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    }

    // Extract keywords from text
    extractKeywords(text: string): string[] {
        const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'from', 'how', 'what', 'when', 'where', 'who', 'why', 'can', 'i', 'my', 'me', 'do', 'does', 'get', 'need', 'want'];

        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2 && !stopWords.includes(word));

        return [...new Set(words)];
    }

    // Calculate similarity between two questions (0-1 score)
    // UPGRADED with Fuzzy Logic
    calculateSimilarity(q1: string, q2: string): number {
        // Method 1: Keyword Intersection (Legacy)
        const keywords1 = this.extractKeywords(q1);
        const keywords2 = this.extractKeywords(q2);

        // Method 2: Fuzzy String Matching (Levenshtein)
        // Normalize strings
        const s1 = q1.toLowerCase().replace(/[^\w\s]/g, '');
        const s2 = q2.toLowerCase().replace(/[^\w\s]/g, '');

        const distance = this.levenshtein(s1, s2);
        const maxLength = Math.max(s1.length, s2.length);
        const fuzzyScore = 1 - (distance / maxLength);

        if (keywords1.length === 0 || keywords2.length === 0) return fuzzyScore; // Fallback to pure fuzzy if no keywords

        const intersection = keywords1.filter(k => keywords2.includes(k));
        const union = [...new Set([...keywords1, ...keywords2])];
        const keywordScore = intersection.length / union.length;

        // Weighted Average: 70% Keyword, 30% Fuzzy 
        // This handles both "typos" (fuzzy helps) and "topic" (keyword helps)
        return (keywordScore * 0.7) + (fuzzyScore * 0.3);
    }

    // Get all learned patterns from storage
    getLearnedPatterns(): LearnedPattern[] {
        if (typeof window === 'undefined') return [];

        try {
            const stored = localStorage.getItem(this.storageKey);
            if (!stored) return [];

            const patterns = JSON.parse(stored);
            return patterns.map((p: any) => ({
                ...p,
                learnedAt: new Date(p.learnedAt),
                lastUsed: p.lastUsed ? new Date(p.lastUsed) : undefined
            }));
        } catch (error) {
            console.error('Error loading learned patterns:', error);
            return [];
        }
    }

    // Save patterns to storage
    saveLearnedPatterns(patterns: LearnedPattern[]): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(patterns));
        } catch (error) {
            console.error('Error saving learned patterns:', error);
        }
    }

    // Find similar patterns for a given question
    findSimilarPatterns(question: string, minSimilarity = 0.5): LearnedPattern[] {
        const patterns = this.getLearnedPatterns();

        return patterns
            .map(pattern => ({
                pattern,
                similarity: this.calculateSimilarity(question, pattern.question)
            }))
            .filter(({ similarity }) => similarity >= minSimilarity)
            .sort((a, b) => b.similarity - a.similarity)
            .map(({ pattern }) => pattern);
    }

    // Learn from a new interaction
    learnFromInteraction(question: string, response: string, category: string, feedback?: boolean): void {
        const patterns = this.getLearnedPatterns();
        const keywords = this.extractKeywords(question);

        // Check if similar pattern exists
        const similar = this.findSimilarPatterns(question, 0.85); // High threshold for exact match update

        if (similar.length > 0 && feedback !== undefined) {
            // Update existing pattern
            const pattern = similar[0];
            this.updateConfidence(pattern.id, feedback);
        } else {
            // Create new pattern
            const newPattern: LearnedPattern = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                question,
                keywords,
                response,
                category,
                confidence: 0.5,
                feedbackCount: { positive: 0, negative: 0 },
                usageCount: 1,
                learnedAt: new Date(),
                approved: false
            };

            patterns.push(newPattern);
            this.saveLearnedPatterns(patterns);
        }
    }

    // Update confidence based on feedback
    updateConfidence(patternId: string, positive: boolean): void {
        const patterns = this.getLearnedPatterns();
        const pattern = patterns.find(p => p.id === patternId);

        if (!pattern) return;

        if (positive) {
            pattern.feedbackCount.positive++;
            pattern.confidence = Math.min(1, pattern.confidence + 0.1);
        } else {
            pattern.feedbackCount.negative++;
            pattern.confidence = Math.max(0, pattern.confidence - 0.15);
        }

        pattern.usageCount++;
        pattern.lastUsed = new Date();

        // Auto-approve if confidence is high
        if (pattern.feedbackCount.positive >= 5 && pattern.confidence >= 0.8) {
            pattern.approved = true;
        }

        this.saveLearnedPatterns(patterns);
    }

    // Get best matching pattern for a question (Legacy - please use processQuery)
    getBestMatch(question: string): LearnedPattern | null {
        const similar = this.findSimilarPatterns(question, 0.55);
        if (similar.length === 0) return null;
        return similar.sort((a, b) => b.confidence - a.confidence)[0];
    }

    // Bulk train from dataset
    bulkTrain(trainingData: TrainingData[]): void {
        const patterns = this.getLearnedPatterns();

        trainingData.forEach(data => {
            const newPattern: LearnedPattern = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                question: data.question,
                keywords: data.keywords,
                response: data.response,
                category: data.category,
                confidence: 0.8, // Pre-trained data starts with high confidence
                feedbackCount: { positive: 3, negative: 0 },
                usageCount: 0,
                learnedAt: new Date(),
                approved: true // Pre-approved training data
            };

            patterns.push(newPattern);
        });

        this.saveLearnedPatterns(patterns);
    }

    // Get analytics
    getAnalytics() {
        const patterns = this.getLearnedPatterns();

        return {
            totalPatterns: patterns.length,
            approvedPatterns: patterns.filter(p => p.approved).length,
            pendingApproval: patterns.filter(p => !p.approved).length,
            averageConfidence: patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length || 0,
            categoryCounts: patterns.reduce((acc, p) => {
                acc[p.category] = (acc[p.category] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            mostUsed: patterns.sort((a, b) => b.usageCount - a.usageCount).slice(0, 10)
        };
    }

    // --- PHASE 3: SENTIMENT ANALYSIS (Level 1) ---
    analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' | 'urgent' {
        const lower = text.toLowerCase();
        if (lower.includes('emergency') || lower.includes('help') || lower.includes('danger') || lower.includes('leak')) return 'urgent';
        if (lower.includes('angry') || lower.includes('bad') || lower.includes('worst') || lower.includes('fail')) return 'negative';
        if (lower.includes('thanks') || lower.includes('good') || lower.includes('great')) return 'positive';
        return 'neutral';
    }

    // --- PHASE 5: SELF-CLEANING KNOWLEDGE BASE (Level 1) ---
    // Finds and merges duplicate patterns
    cleanKnowledgeBase(): string {
        const patterns = this.getLearnedPatterns();
        const initialCount = patterns.length;

        // Remove duplicates based on exact question match
        const uniqueParams = new Map();
        patterns.forEach(p => {
            if (!uniqueParams.has(p.question)) {
                uniqueParams.set(p.question, p);
            } else {
                // Merge usage counts
                const existing = uniqueParams.get(p.question);
                existing.usageCount += p.usageCount;
                existing.confidence = (existing.confidence + p.confidence) / 2;
            }
        });

        const cleaned = Array.from(uniqueParams.values());
        this.saveLearnedPatterns(cleaned);

        return `Cleaned KB. Removed ${initialCount - cleaned.length} duplicates.`;
    }
}

export const aiLearningEngine = new AILearningEngine();
