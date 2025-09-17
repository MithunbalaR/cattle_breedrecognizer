"use client"

import { useState, useMemo } from "react"
import { Search, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { getAllBreeds, getBreedsByCategory, searchBreeds, type BreedInfo } from "@/lib/breeds-database"

export default function BreedsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredBreeds = useMemo(() => {
    let breeds: BreedInfo[] = []

    if (searchQuery.trim()) {
      breeds = searchBreeds(searchQuery)
    } else if (categoryFilter === "all") {
      breeds = getAllBreeds()
    } else {
      breeds = getBreedsByCategory(categoryFilter as BreedInfo["category"])
    }

    return breeds
  }, [searchQuery, categoryFilter])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="font-heading text-lg font-bold text-foreground">Cattle Breeds Database</h1>
              <p className="text-xs text-muted-foreground">Explore comprehensive information about cattle breeds</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Cattle Breeds Database</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover detailed information about different cattle breeds from around the world
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search breeds by name, origin, or characteristics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Dairy">Dairy Cattle</SelectItem>
                <SelectItem value="Beef">Beef Cattle</SelectItem>
                <SelectItem value="Dual-Purpose">Dual-Purpose</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
              {categoryFilter !== "all" && ` in ${categoryFilter} category`}
            </p>
          </div>

          {/* Breeds Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <Link key={breed.id} href={`/breeds/${breed.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={breed.imageUrl || "/placeholder.svg"}
                      alt={breed.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs">
                        {breed.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-heading text-lg">{breed.name}</CardTitle>
                      <div className="flex">
                        {Array.from({ length: breed.popularity }).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-primary rounded-full ml-1" />
                        ))}
                      </div>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">{breed.origin}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-foreground line-clamp-3 mb-3">{breed.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {breed.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {breed.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{breed.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredBreeds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No breeds found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
