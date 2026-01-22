// Math & Calculation Engine
// Phase 48: Level 3 - Reasoning
// Handles natural language calculation requests

export class MathEngine {

    // Check if input is a math question
    isMathQuery(input: string): boolean {
        const keywords = ['calculate', 'compute', 'how much is', 'gst', 'percentage', '%', 'plus', 'minus', 'multiply', 'divide', 'interest', 'emi'];
        return keywords.some(k => input.toLowerCase().includes(k)) || /[\d+\-*/]/.test(input);
    }

    // Solve the query
    solve(input: string, lang: string = 'en'): string | null {
        const lower = input.toLowerCase();

        // 1. Percentage / GST
        // "18% of 5000" or "GST on 5000" (assuming 18%)
        if (lower.includes('%') || lower.includes('gst')) {
            const numbers = lower.match(/[\d,.]+/g);
            if (numbers && numbers.length >= 1) {
                const amount = parseFloat(numbers.length === 1 ? numbers[0] : numbers[numbers.length - 1].replace(/,/g, ''));
                const percent = numbers.length > 1 ? parseFloat(numbers[0]) : 18; // Default GST 18% if not specified but 'gst' keyword used

                const result = (amount * percent) / 100;
                const total = amount + result;

                return lang === 'hi'
                    ? `🧮 गणना: ₹${amount.toLocaleString()} का ${percent}% = ₹${result.toLocaleString()}\nकुल राशि: ₹${total.toLocaleString()}`
                    : `🧮 Calculation: ${percent}% of ₹${amount.toLocaleString()} is ₹${result.toLocaleString()}.\nTotal Amount: ₹${total.toLocaleString()}`;
            }
        }

        // 2. Simple Arithmetic (Plus/Minus)
        // "500 plus 200" or "500 + 200"
        if (lower.match(/(\d+)\s*(\+|plus|minus|-|\*|x|multiply|\/|divide|by)\s*(\d+)/)) {
            try {
                // Safe eval alternative for simple math
                const sanitized = lower
                    .replace(/plus/g, '+')
                    .replace(/minus/g, '-')
                    .replace(/multiply|x/g, '*')
                    .replace(/divide|by/g, '/')
                    .replace(/[^\d+\-*/().]/g, '');

                // eslint-disable-next-line no-new-func
                const result = new Function('return ' + sanitized)();
                return lang === 'hi'
                    ? `🧮 उत्तर: ${result}`
                    : `🧮 Answer: ${result}`;
            } catch (e) {
                return null;
            }
        }

        // 3. EMI Calculator (Simple Approximation)
        // "EMI for 100000" (Defaults: 10% interest, 1 year if not found)
        if (lower.includes('emi') || lower.includes('loan')) {
            const numbers = lower.match(/[\d,.]+/g);
            if (numbers && numbers.length > 0) {
                const principal = parseFloat(numbers[0].replace(/,/g, ''));
                const rate = 10; // 10% annual default
                const years = 1; // 1 year default

                const r = rate / (12 * 100); // monthly rate
                const n = years * 12; // months

                const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

                return lang === 'hi'
                    ? `💰 अनुमानित ईएमआई: ₹${Math.round(emi).toLocaleString()}/माह (1 वर्ष के लिए 10% ब्याज पर)`
                    : `💰 Estimated EMI: ₹${Math.round(emi).toLocaleString()}/month (assuming 10% interest for 1 year).`;
            }
        }

        return null; // Not a solvable math query
    }
}

export const mathEngine = new MathEngine();
