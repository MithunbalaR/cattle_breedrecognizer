"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Camera, Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  onAnalyze: (file: File) => void
  isAnalyzing?: boolean
  className?: string
}

export function ImageUpload({ onImageSelect, onAnalyze, isAnalyzing = false, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return

      const file = files[0]
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setSelectedImage(file)
      onImageSelect(file)
    },
    [onImageSelect],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
    },
    [handleFiles],
  )

  const clearImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setSelectedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }, [previewUrl])

  const handleAnalyze = useCallback(() => {
    if (selectedImage) {
      onAnalyze(selectedImage)
    }
  }, [selectedImage, onAnalyze])

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {!selectedImage ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-primary/50",
            dragActive ? "border-primary bg-primary/5" : "border-border",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
              <Upload className="h-10 w-10" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Upload Cattle Image</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Drag and drop an image here, or click to select from your device
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  cameraInputRef.current?.click()
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG, WebP files up to 10MB</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={previewUrl! || "/placeholder.svg"}
                alt="Selected cattle"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-4 right-4"
                onClick={clearImage}
                disabled={isAnalyzing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="flex-1">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Identify Breed
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Different
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  )
}
