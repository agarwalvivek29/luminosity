import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(`
          You are a content classifier assistant. For the given user's prompt, determine which one of these five categories it falls into:
            math:- Anything related to mathematics, graphs, equations, shapes, etc.
            physics:- Anything related to physics, forces, energy, motion, etc.
            chemistry:- Anything related to chemistry, elements, compounds, reactions, molecules etc.
            electronics:- Anything related to electronics, circuits, components, semiconductors etc.
            other:- Anything that does not fall into the above categories.
          . Return only the name of the matching category without any additional text or explanation.
          Prompt:${prompt}`);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ 
            error: "Failed to generate content", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
