export interface BreedAnalysisResult {
  breed: string
  breedId: string
  confidence: number
  characteristics: string[]
  origin: string
  description: string
  careNotes: string[]
  category: string
  additionalInfo: {
    avgMilkProduction?: string
    avgWeight?: string
    lifespan?: string
    temperament?: string
  }
  tags: string[]
  imageUrl: string
  alternativeBreeds?: Array<{
    name: string
    breedId: string
    confidence: number
    category?: string
  }>
  analysisTimestamp: string
}

export interface AnalysisResponse {
  success: boolean
  result: BreedAnalysisResult
  error?: string
}

export async function analyzeBreed(file: File): Promise<AnalysisResponse> {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to analyze image")
  }

  return response.json()
}

// Local storage helpers for analysis history
export interface AnalysisHistoryItem {
  id: string
  result: BreedAnalysisResult
  uploadedImage: string // base64 data URL
  timestamp: string
}

export function saveAnalysisToHistory(result: BreedAnalysisResult, imageFile: File): void {
  try {
    const reader = new FileReader()
    reader.onload = () => {
      const historyItem: AnalysisHistoryItem = {
        id: crypto.randomUUID(),
        result,
        uploadedImage: reader.result as string,
        timestamp: new Date().toISOString(),
      }

      const existingHistory = getAnalysisHistory()
      const updatedHistory = [historyItem, ...existingHistory].slice(0, 10) // Keep last 10 analyses

      localStorage.setItem("cattleid-analysis-history", JSON.stringify(updatedHistory))
    }
    reader.readAsDataURL(imageFile)
  } catch (error) {
    console.error("Failed to save analysis to history:", error)
  }
}

export function getAnalysisHistory(): AnalysisHistoryItem[] {
  try {
    const history = localStorage.getItem("cattleid-analysis-history")
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error("Failed to load analysis history:", error)
    return []
  }
}

export function clearAnalysisHistory(): void {
  try {
    localStorage.removeItem("cattleid-analysis-history")
  } catch (error) {
    console.error("Failed to clear analysis history:", error)
  }
}
