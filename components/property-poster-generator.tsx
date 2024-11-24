"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "./image-uploader"
import { TextToImageGenerator } from "./text-to-image-generator"
import { TextInputForm } from "./text-input-form"
import { PosterPreview } from "./poster-preview"

export default function PropertyPosterGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [textInputs, setTextInputs] = useState({
    title: "",
    description: "",
    price: "",
  })

  const handleImageUpload = (uploadedImage: string) => {
    setImage(uploadedImage)
  }

  const handleTextInputChange = (name: string, value: string) => {
    setTextInputs((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Property Poster Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="generate">Generate Image</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <ImageUploader onImageUpload={handleImageUpload} />
          </TabsContent>
          <TabsContent value="generate">
            <TextToImageGenerator onImageGenerated={handleImageUpload} />
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TextInputForm onInputChange={handleTextInputChange} />
          <PosterPreview image={image} textInputs={textInputs} />
        </div>
      </CardContent>
    </Card>
  )
}

