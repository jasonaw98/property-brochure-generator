"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { CloudUpload } from 'lucide-react'

interface ImageUploaderProps {
  onImageUpload: (image: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    },
    [onImageUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Card
      {...getRootProps()}
      className={`cursor-pointer ${
        isDragActive ? "border-primary" : "border-dashed"
      }`}
    >
      <CardContent className="flex flex-col items-center justify-center h-40">
        <input {...getInputProps()} />
        <CloudUpload className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600">
          {isDragActive
            ? "Drop the image here"
            : "Drag & drop an image here, or click to select"}
        </p>
      </CardContent>
    </Card>
  )
}

