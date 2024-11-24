"use client"

import { useEffect, useRef } from "react"
// import { Stage, Layer, Image, Text } from "react-konva"
import Image from "next/image"

interface PosterPreviewProps {
  image: string | null
  textInputs: {
    title: string
    description: string
    price: string
  }
}

export function PosterPreview({ image, textInputs }: PosterPreviewProps) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (image) {
      const img = new window.Image()
      img.src = image
      img.onload = () => {
        imageRef.current = img
        if (stageRef.current) {
          // stageRef.current.update()
        }
      }
    }
  }, [image])

  const width = 600
  const height = 400

  return (
    <div  ref={stageRef}>
      <div>
        {imageRef.current && (
          <Image
            src={imageRef.current}
            width={width}
            height={height}
            alt="Property"
          />
        )}
        <div>{textInputs.title}</div>
        <div>{textInputs.description}</div>
        <div>{textInputs.price}</div>
      </div>
    </div>
    // <div>hello</div>
  )
}

