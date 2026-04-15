"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "mock-key";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeTasksForPrioritization(tasks: { id: string, title: string, priority: string, time: string }[]) {
  if (apiKey === "mock-key" || tasks.length === 0) {
    return tasks.slice(0, 2).map(t => t.id);
  }

  try {
    const prompt = `
      You are an expert productivity AI. Analyze this list of tasks currently sitting in the user's backlog:
      ${JSON.stringify(tasks)}
      
      Select the two tasks that seem most impactful or urgent to move to 'in-progress' immediately.
      Return ONLY a raw JSON array containing the string IDs of those tasks, nothing else. Example: ["1", "4"]
    `;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as string[];
  } catch (e) {
    console.error("Gemini Analysis Failed: ", e);
    return tasks.slice(0, 2).map(t => t.id);
  }
}
