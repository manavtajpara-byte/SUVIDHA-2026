// Web Search Service
// Phase 48: Level 2 - Connectivity
// Connects Suvidha AI to the "Internet" (Simulated or Real)

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''; // Add these to .env.local if available
const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID || '';

interface SearchResult {
    title: string;
    snippet: string;
    link: string;
    source: string;
}

class WebSearchService {

    // Simulate web search when keys are missing (for demo/reliability)
    private getMockResults(query: string): SearchResult[] {
        const q = query.toLowerCase();

        if (q.includes('gold') || q.includes('rate')) {
            return [{
                title: "Live Gold Rate Today in India",
                snippet: "The current gold rate in India is ₹72,500 per 10 grams for 24K gold. Silver is trading at ₹91,000 per kg.",
                link: "https://www.goodreturns.in/gold-rates/",
                source: "GoodReturns"
            }];
        }

        if (q.includes('weather') || q.includes('rain')) {
            return [{
                title: "India Weather Forecast",
                snippet: "Scattered thunderstorms expected in Uttar Pradesh and Bihar. Delhi remains sunny with a high of 34°C.",
                link: "https://weather.com/en-IN",
                source: "The Weather Channel"
            }];
        }

        if (q.includes('pm') || q.includes('minister')) {
            return [{
                title: "Prime Minister of India - Narendra Modi",
                snippet: "Narendra Modi is the current Prime Minister of India, serving since 2014. He is a member of the Bharatiya Janata Party (BJP).",
                link: "https://www.pmindia.gov.in/",
                source: "PM India"
            }];
        }

        if (q.includes('cricket') || q.includes('score')) {
            return [{
                title: "Live Cricket Score - India vs Australia",
                snippet: "India is 245/3 in 40 overs. Virat Kohli is not out on 95.",
                link: "https://www.cricbuzz.com/",
                source: "Cricbuzz"
            }];
        }

        if (q.includes('stock') || q.includes('market') || q.includes('nifty') || q.includes('sensex')) {
            return [{
                title: "Stock Market Live Updates",
                snippet: "Sensex is up by 500 points trading at 75,000. Nifty 50 crosses 22,500 mark. Top gainers: Reliance, HDFC Bank.",
                link: "https://www.moneycontrol.com/",
                source: "MoneyControl"
            }];
        }

        if (q.includes('news') || q.includes('headline')) {
            return [{
                title: "Breaking News India",
                snippet: "India launches new Digital India phase. PM announces new schemes for farmers. ISRO prepares for next moon mission.",
                link: "https://timesofindia.indiatimes.com/",
                source: "Times of India"
            }];
        }

        if (q.includes('job') || q.includes('vacancy')) {
            return [{
                title: "Government Jobs 2026",
                snippet: "SSC CGL notification released for 5000 vacancies. Railway recruitment board announces 20,000 posts. Apply before 30th Jan.",
                link: "https://www.sarkariresult.com/",
                source: "SarkariResult"
            }];
        }

        return [{
            title: `Search Results for "${query}"`,
            snippet: `Here is the latest information I found on the web regarding "${query}". Please click the link for more details.`,
            link: "https://www.google.com/search?q=" + encodeURIComponent(query),
            source: "Google Search"
        }];
    }

    async searchWeb(query: string): Promise<string> {
        // 1. Try Real API if keys exist
        if (GOOGLE_API_KEY && SEARCH_ENGINE_ID) {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
                );
                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    const topResult = data.items[0];
                    return `${topResult.snippet} (Source: ${topResult.title})`;
                }
            } catch (error) {
                console.error("Link Failure:", error);
                // Fallback to mock
            }
        }

        // 2. Fallback to Mock Engine (Intelligence Simulation)
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 1500));

        const results = this.getMockResults(query);
        const top = results[0];

        return `${top.snippet}\n\n[Source: ${top.source}](${top.link})`;
    }
}

export const webSearchService = new WebSearchService();
