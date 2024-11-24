"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextInputFormProps {
  onInputChange: (name: string, value: string) => void
}

export function TextInputForm({ onInputChange }: TextInputFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter property title"
          onChange={(e) => onInputChange("title", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter property description"
          onChange={(e) => onInputChange("description", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          placeholder="Enter property price"
          onChange={(e) => onInputChange("price", e.target.value)}
        />
      </div>
    </div>
  )
}

