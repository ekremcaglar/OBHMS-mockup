
import { GoogleGenAI } from "@google/genai";
import { FleetData } from '../types';

// This is a placeholder for the actual API key which should be
// securely managed, e.g., through environment variables.
const API_KEY = process.env.API_KEY;

export const generateFleetHealthSummary = async (data: FleetData): Promise<string> => {
  if (!API_KEY) {
    console.warn("API_KEY is not set. Returning mock summary.");
    return new Promise(resolve => setTimeout(() => resolve(`
      **Fleet Status Summary:**
      - **Overall:** Fleet readiness is slightly degraded at 88.5%, primarily due to aircraft KAAN-002 being AOG.
      - **Critical Alert:** KAAN-002 requires immediate attention for a critical RUL on a port-side turbine blade.
      - **Watchlist:** KAAN-003 shows early signs of hydraulic system degradation. Proactive monitoring is advised.
      - **Positive Trend:** The 'No Fault Found' rate is trending down, indicating improved diagnostic accuracy across the fleet.
    `), 1000));
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
      Analyze the following JSON data representing the health of the KAAN aircraft fleet and provide a concise, actionable summary for a fleet commander.
      Focus on the most critical issues, watchlist items, and any positive trends.
      Data: ${JSON.stringify(data, null, 2)}
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "Error: Could not generate AI summary. Please check API key and network connection.";
  }
};
