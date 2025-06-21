import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const groq = new Groq({
    apiKey: import.meta.env.VITE_PUBLIC_GROQ_API_KEY
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768"
    });

    return NextResponse.json(chatCompletion.choices[0]?.message);
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}