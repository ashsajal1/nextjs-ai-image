import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: { Authorization: process.env.HUGGING_FACE_KEY as string },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return NextResponse.json({ base64 });
};
