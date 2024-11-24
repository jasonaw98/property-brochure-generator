import { NextResponse } from "next/server"

// const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: "A valid prompt is required" },
        { status: 400 }
      )
    }

    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
      })
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: response.status }
      )
    }

    const imageData = await response.arrayBuffer()
    const base64Image = Buffer.from(imageData).toString('base64')
    const imageUrl = `data:image/jpeg;base64,${base64Image}`

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    )
  }
}
