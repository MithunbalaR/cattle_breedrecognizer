"use client"

import { useState } from "react"
import { ArrowLeft, Camera, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"
import { AnalysisResult } from "@/components/analysis-result"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { analyzeBreed, saveAnalysisToHistory, type BreedAnalysisResult } from "@/lib/api"

export default function IdentifyPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<BreedAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null) // Clear previous results
    setError(null) // Clear previous errors

    // Create preview URL for the uploaded image
    const url = URL.createObjectURL(file)
    setUploadedImageUrl(url)
  }

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await analyzeBreed(file)

      if (response.success) {
        setResult(response.result)
        // Save to local storage history
        saveAnalysisToHistory(response.result, file)
      } else {
        setError(response.error || "Analysis failed")
      }
    } catch (error) {
      console.error("Analysis failed:", error)
      setError(error instanceof Error ? error.message : "Failed to analyze image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setSelectedFile(null)
    setResult(null)
    setError(null)
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl)
      setUploadedImageUrl(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-heading text-lg font-bold text-foreground">Breed Identification</h1>
                  <p className="text-xs text-muted-foreground">Upload an image to identify cattle breed</p>
                </div>
              </div>
            </div>
            <Link href="/history">
              <Button variant="ghost" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!result ? (
            <>
              <div className="text-center mb-8">
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Identify Your Cattle Breed</h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Upload a clear photo of your cattle for instant AI-powered breed identification
                </p>
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                className="mb-8"
              />

              {error && (
                <Alert className="mb-8 border-destructive/50 text-destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Analysis Complete</h1>
                <p className="text-lg text-muted-foreground text-pretty">
                  Here are the detailed results of your cattle breed identification
                </p>
              </div>

              <AnalysisResult
                result={result}
                uploadedImage={uploadedImageUrl || undefined}
                onNewAnalysis={handleNewAnalysis}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
