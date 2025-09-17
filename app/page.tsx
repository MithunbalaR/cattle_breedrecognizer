import { Camera, Upload, Zap, Users, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* This div keeps the logo and its text together on the left */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Camera className="h-6 w-6" />
              </div>
            </div>

            {/* This new div acts as a separate container for the links */}
            <div className="flex items-center gap-4">
              <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-balance mb-6">
              Identify Cattle Breeds with <span className="text-primary">AI Precision</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8">
              Upload a photo of any cattle and get instant breed identification with detailed information. Perfect for
              farmers, veterinarians, and cattle enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/identify">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Photo
                </Button>
              </Link>
              <Link href="/identify">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  <Camera className="mr-2 h-5 w-5" />
                  Take Photo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose CattleID?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our AI-powered platform provides accurate breed identification with comprehensive information to help you
              make informed decisions about your cattle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="font-heading">Instant Recognition</CardTitle>
                <CardDescription>
                  Get breed identification results in seconds with our advanced AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle className="font-heading">High Accuracy</CardTitle>
                <CardDescription>
                  Our AI model is trained on thousands of cattle images for precise breed identification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle className="font-heading">Expert Information</CardTitle>
                <CardDescription>
                  Access detailed breed characteristics, care tips, and historical information
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Three simple steps to identify any cattle breed with professional accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">Upload Image</h3>
              <p className="text-muted-foreground text-pretty">
                Take a photo or upload an existing image of the cattle you want to identify
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-muted-foreground text-pretty">
                Our advanced AI analyzes the image and compares it against our extensive breed database
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4">Get Results</h3>
              <p className="text-muted-foreground text-pretty">
                Receive detailed breed information including characteristics, origin, and care recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid place-items-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Cattle Breeds Recognized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Camera className="h-5 w-5" />
              </div>
              <span className="font-heading font-semibold">CattleID</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © Devloped for D3CODE 2025 HACKATHON
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}