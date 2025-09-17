"use client"

import { useState } from "react"
import { CheckCircle, Share2, ExternalLink, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import type { BreedAnalysisResult } from "@/lib/api"

interface AnalysisResultProps {
  result: BreedAnalysisResult
  uploadedImage?: string
  onNewAnalysis?: () => void
}

export function AnalysisResult({ result, uploadedImage, onNewAnalysis }: AnalysisResultProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Cattle Breed Identified: ${result.breed}`,
          text: `I identified this cattle as ${result.breed} with ${result.confidence}% confidence using CattleID AI!`,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        const shareText = `I identified this cattle as ${result.breed} with ${result.confidence}% confidence using CattleID AI! Check it out at ${window.location.href}`
        await navigator.clipboard.writeText(shareText)
        alert("Share text copied to clipboard!")
      }
    } catch (error) {
      console.error("Failed to share:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <CardTitle className="font-heading text-3xl text-green-700 dark:text-green-400">{result.breed}</CardTitle>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {result.confidence}% Confidence
            </Badge>
            <Badge variant="outline" className="text-sm">
              {result.category} Cattle
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {new Date(result.analysisTimestamp).toLocaleString()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {uploadedImage && (
              <div className="sm:w-1/3">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded cattle"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
            <div className="flex-1 space-y-3">
              <p className="text-sm leading-relaxed">{result.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <strong>Origin:</strong> {result.origin}
              </div>
              <div className="flex flex-wrap gap-1">
                {result.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Link href={`/breeds/${result.breedId}`} className="flex-1">
              <Button variant="default" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Breed Info
              </Button>
            </Link>
            <Button variant="outline" onClick={handleShare} disabled={isSharing} className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              {isSharing ? "Sharing..." : "Share Result"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Breeds */}
      {result.alternativeBreeds && result.alternativeBreeds.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alternative Possibilities</CardTitle>
            <CardDescription>Other breeds that share similar characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {result.alternativeBreeds.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{alt.name}</div>
                    <div className="text-sm text-muted-foreground">{alt.category} Cattle</div>
                  </div>
                  <Badge variant="outline">{alt.confidence}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Information Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Characteristics</CardTitle>
            <CardDescription>Distinctive features of this breed</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.characteristics.map((characteristic, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{characteristic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Care Guidelines</CardTitle>
            <CardDescription>Essential care and management practices</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.careNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      {(result.additionalInfo.avgWeight || result.additionalInfo.avgMilkProduction) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Production & Physical Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {result.additionalInfo.avgWeight && (
                <div>
                  <div className="font-medium text-muted-foreground">Average Weight</div>
                  <div className="text-lg font-semibold">{result.additionalInfo.avgWeight}</div>
                </div>
              )}
              {result.additionalInfo.avgMilkProduction && (
                <div>
                  <div className="font-medium text-muted-foreground">Milk Production</div>
                  <div className="text-lg font-semibold">{result.additionalInfo.avgMilkProduction}</div>
                </div>
              )}
              {result.additionalInfo.lifespan && (
                <div>
                  <div className="font-medium text-muted-foreground">Lifespan</div>
                  <div className="text-lg font-semibold">{result.additionalInfo.lifespan}</div>
                </div>
              )}
              {result.additionalInfo.temperament && (
                <div>
                  <div className="font-medium text-muted-foreground">Temperament</div>
                  <div className="text-lg font-semibold">{result.additionalInfo.temperament}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Analysis Complete!</strong> You can now explore more breeds, analyze another image, or save this
          result for future reference.
        </AlertDescription>
      </Alert>

      {onNewAnalysis && (
        <div className="text-center">
          <Button onClick={onNewAnalysis} size="lg" variant="outline">
            Analyze Another Image
          </Button>
        </div>
      )}
    </div>
  )
}

