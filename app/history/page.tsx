"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trash2, Download, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { getAnalysisHistory, clearAnalysisHistory, type AnalysisHistoryItem } from "@/lib/api"

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHistory = () => {
      const historyData = getAnalysisHistory()
      setHistory(historyData)
      setIsLoading(false)
    }

    loadHistory()
  }, [])

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear all analysis history? This action cannot be undone.")) {
      clearAnalysisHistory()
      setHistory([])
    }
  }

  const handleDownloadHistory = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalAnalyses: history.length,
      analyses: history.map((item) => ({
        breed: item.result.breed,
        confidence: item.result.confidence,
        category: item.result.category,
        origin: item.result.origin,
        analysisDate: item.timestamp,
      })),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cattleid-analysis-history-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/identify">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Identify
                </Button>
              </Link>
              <div>
                <h1 className="font-heading text-lg font-bold text-foreground">Analysis History</h1>
                <p className="text-xs text-muted-foreground">Your recent cattle breed identifications</p>
              </div>
            </div>
            {history.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadHistory}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearHistory}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Analysis History</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Review your previous cattle breed identifications and results
            </p>
          </div>

          {history.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <CardTitle className="mb-2">No Analysis History</CardTitle>
                <CardDescription className="mb-6">
                  You haven't analyzed any cattle images yet. Start by uploading your first image!
                </CardDescription>
                <Link href="/identify">
                  <Button>Start Analyzing</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <Alert>
                  <AlertDescription>
                    Showing {history.length} recent analysis{history.length !== 1 ? "es" : ""}. History is stored
                    locally on your device.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-6">
                {history.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-48 md:h-auto">
                          <img
                            src={item.uploadedImage || "/placeholder.svg"}
                            alt="Analyzed cattle"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-heading text-xl font-semibold mb-2">{item.result.breed}</h3>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="secondary">{item.result.confidence}% Confidence</Badge>
                                <Badge variant="outline">{item.result.category}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Origin: {item.result.origin}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <div>{new Date(item.timestamp).toLocaleDateString()}</div>
                              <div>{new Date(item.timestamp).toLocaleTimeString()}</div>
                            </div>
                          </div>

                          <p className="text-sm text-foreground mb-4 line-clamp-2">{item.result.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.result.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {item.result.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.result.tags.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/breeds/${item.result.breedId}`}>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Breed Info
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
