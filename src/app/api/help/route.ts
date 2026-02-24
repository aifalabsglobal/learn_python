import { NextRequest, NextResponse } from "next/server";

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL || "http://45.198.59.91:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

const SYSTEM_PROMPT = `You are a friendly Python tutor helping a student who is learning Python (functions, types, OOP, etc.). 
Answer clearly and concisely. Use simple language and short code examples when helpful. 
If the student mentions a specific topic (e.g. lambda, recursion, generators), focus your answer on that. 
Keep responses focused and educational.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const context = typeof body.context === "string" ? body.context.trim() : "";

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const userMessage = context
      ? `[Current topic: ${context}]\n\n${question}`
      : question;

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Ollama error:", res.status, text);
      return NextResponse.json(
        { error: "AI service unavailable. Check Ollama is running and model is pulled." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content = data.message?.content ?? "";

    return NextResponse.json({ answer: content });
  } catch (err) {
    console.error("Help API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
