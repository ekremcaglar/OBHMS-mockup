import { GoogleGenAI } from "@google/genai";
import { FleetData } from '../types';

export const generateFleetHealthSummary = async (data: FleetData): Promise<string> => {
  if (!process.env.API_KEY) {
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
      Analyze the following JSON data representing the health of the KAAN aircraft fleet and provide a concise, actionable summary for a fleet commander.
      Focus on the most critical issues, watchlist items, and any positive trends. Use markdown for formatting.
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


export const generateSearchResponse = async (query: string, fleetData: FleetData): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set. Returning mock response.");
    return new Promise(resolve => setTimeout(() => resolve(`
      Based on the current data, **KAAN-002** is **not mission capable** (0% MC Rate) and is currently in an AOG (Aircraft On Ground) state for 18 hours. The critical issue is related to its Propulsion system, specifically a low Remaining Useful Life (RUL) on a turbine blade. According to technical manual TM-KAAN-PROP-087, this requires an immediate Level 2 inspection.
    `), 1000));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      You are an intelligent assistant for the KAAN OBHMS (Off-Board Health Management System).
      Your role is to answer questions from a fleet commander based on the real-time fleet data provided.
      You have access to the complete library of technical manuals, troubleshooting guides, and historical maintenance logs for the KAAN platform.
      When answering, first use the provided real-time data. Then, if relevant, reference procedures or information from the technical documentation (e.g., "According to manual TM-XX-YYY...").
      Be concise, accurate, and use markdown for formatting (like **bolding** key terms).

      **User Query:** "${query}"

      **Real-time Fleet Data (JSON):**
      ${JSON.stringify(fleetData, null, 2)}

      **Answer:**
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating search response with Gemini API:", error);
    return "Error: Could not process the query. Please check your connection or try again later.";
  }
};