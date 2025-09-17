import { type NextRequest, NextResponse } from "next/server"
import { CATTLE_BREEDS_DATABASE } from "@/lib/breeds-database"

// Simulate AI image analysis with more realistic breed matching
async function analyzeImage(imageBuffer: Buffer): Promise<{
  breed: string
  confidence: number
  alternativeBreeds?: Array<{ breed: string; confidence: number }>
}> {
  // In a real implementation, this would:
  // 1. Send the image to an AI service (like OpenAI Vision, Google Vision, or custom model)
  // 2. Process the response
  // 3. Return breed identification results

  // For demo purposes, we'll simulate more realistic breed detection
  // based on common characteristics and popularity
  const breedKeys = Object.keys(CATTLE_BREEDS_DATABASE)

  // Simulate weighted random selection based on breed popularity
  const weightedBreeds = breedKeys.flatMap((breed) => {
    const breedInfo = CATTLE_BREEDS_DATABASE[breed]
    return Array(breedInfo.popularity).fill(breed)
  })

  const primaryBreed = weightedBreeds[Math.floor(Math.random() * weightedBreeds.length)]
  const confidence = Math.floor(Math.random() * 15) + 85 // 85-99% confidence for primary

  // Generate alternative breeds with lower confidence
  const alternatives = breedKeys
    .filter((breed) => breed !== primaryBreed)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 2)
    .map((breed) => ({
      breed,
      confidence: Math.floor(Math.random() * 25) + 45, // 45-69% confidence for alternatives
    }))
    .sort((a, b) => b.confidence - a.confidence)

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2500))

  return {
    breed: primaryBreed,
    confidence,
    alternativeBreeds: alternatives,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Please upload an image smaller than 10MB." }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Analyze the image
    const analysisResult = await analyzeImage(buffer)

    // Get breed information from our comprehensive database
    const breedInfo = CATTLE_BREEDS_DATABASE[analysisResult.breed]

    if (!breedInfo) {
      return NextResponse.json({ error: "Breed not found in database" }, { status: 404 })
    }

    // Prepare response with comprehensive breed information
    const response = {
      success: true,
      result: {
        breed: breedInfo.name,
        breedId: breedInfo.id,
        confidence: analysisResult.confidence,
        characteristics: breedInfo.characteristics,
        origin: breedInfo.origin,
        description: breedInfo.description,
        careNotes: breedInfo.careNotes,
        category: breedInfo.category,
        additionalInfo: breedInfo.additionalInfo,
        tags: breedInfo.tags,
        imageUrl: breedInfo.imageUrl,
        alternativeBreeds: analysisResult.alternativeBreeds?.map((alt) => {
          const altBreedInfo = CATTLE_BREEDS_DATABASE[alt.breed]
          return {
            name: altBreedInfo?.name || alt.breed,
            breedId: alt.breed,
            confidence: alt.confidence,
            category: altBreedInfo?.category,
          }
        }),
        analysisTimestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze image. Please try again." }, { status: 500 })
  }
}
