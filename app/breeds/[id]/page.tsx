import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Award, Heart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getBreedById, getAllBreeds } from "@/lib/breeds-database"

interface BreedDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const breeds = getAllBreeds()
  return breeds.map((breed) => ({
    id: breed.id,
  }))
}

export default async function BreedDetailPage({ params }: BreedDetailPageProps) {
  const { id } = await params
  const breed = getBreedById(id)

  if (!breed) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/breeds">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Breeds
              </Button>
            </Link>
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">{breed.name}</h1>
              <p className="text-xs text-muted-foreground">Detailed breed information</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img src={breed.imageUrl || "/placeholder.svg"} alt={breed.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-heading text-3xl font-bold">{breed.name}</h1>
                  <Badge variant="secondary">{breed.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{breed.origin}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">Popularity Rating:</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ml-1 ${i < breed.popularity ? "bg-primary" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{breed.description}</p>
              <div className="flex flex-wrap gap-2">
                {breed.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {breed.additionalInfo.avgWeight && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Physical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Weight:</span>
                    <span className="font-medium">{breed.additionalInfo.avgWeight}</span>
                  </div>
                  {breed.additionalInfo.lifespan && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lifespan:</span>
                      <span className="font-medium">{breed.additionalInfo.lifespan}</span>
                    </div>
                  )}
                  {breed.additionalInfo.temperament && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperament:</span>
                      <span className="font-medium">{breed.additionalInfo.temperament}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {breed.additionalInfo.avgMilkProduction && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Production Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Milk Production:</span>
                    <span className="font-medium">{breed.additionalInfo.avgMilkProduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{breed.category} Cattle</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Characteristics and Care */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Key Characteristics
                </CardTitle>
                <CardDescription>Distinctive features and traits of this breed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {breed.characteristics.map((characteristic, index) => (
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
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-secondary" />
                  Care Guidelines
                </CardTitle>
                <CardDescription>Essential care and management practices</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {breed.careNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{note}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-8">
                <h3 className="font-heading text-xl font-semibold mb-4">Think you have this breed?</h3>
                <p className="text-muted-foreground mb-6">
                  Upload a photo of your cattle to get AI-powered breed identification and confirmation
                </p>
                <Link href="/identify">
                  <Button size="lg">Identify My Cattle</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
