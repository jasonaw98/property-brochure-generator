"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TextToImageGeneratorProps {
  onImageGenerated: (image: string) => void
}

export function TextToImageGenerator({ onImageGenerated }: TextToImageGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt })
      })

      const data = await response.json()
      
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        onImageGenerated(data.imageUrl)
      } else {
        console.error("No image URL in response")
      }
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="grid w-full gap-1.5">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your image description..."
              className="w-full px-3 py-2 border rounded-md"
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleGenerateImage} 
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? "Generating..." : "Generate Property Image"}
          </Button>
          
          {generatedImage && (
            <div className="relative w-full aspect-[3/2] mt-4">
              <Image
                src={generatedImage}
                alt="Generated property"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
