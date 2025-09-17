export interface BreedInfo {
  id: string
  name: string
  characteristics: string[]
  origin: string
  description: string
  careNotes: string[]
  category: "Dairy" | "Beef" | "Dual-Purpose"
  additionalInfo: {
    avgMilkProduction?: string
    avgWeight?: string
    lifespan?: string
    temperament?: string
  }
  imageUrl: string
  tags: string[]
  popularity: number // 1-5 scale
}

export const CATTLE_BREEDS_DATABASE: Record<string, BreedInfo> = {
  holstein: {
    id: "holstein",
    name: "Holstein Friesian",
    characteristics: [
      "Black and white spotted coat pattern",
      "Large frame size (1.4-1.5m height)",
      "High milk production capacity",
      "Distinctive facial features",
      "Average weight: 580-680 kg",
      "Udder well-developed and balanced",
    ],
    origin: "Netherlands and Northern Germany",
    description:
      "Holstein Friesian cattle are a breed of dairy cattle originating from the Dutch provinces of North Holland and Friesland, and Schleswig-Holstein in Northern Germany. They are known for their outstanding milk production and are the most widespread dairy breed in the world, accounting for over 90% of milk production in many countries.",
    careNotes: [
      "Requires high-quality feed for optimal milk production",
      "Needs adequate shelter and ventilation",
      "Regular health monitoring recommended",
      "Proper milking schedule essential (2-3 times daily)",
      "Susceptible to heat stress - provide shade and cooling",
      "Monitor for mastitis and lameness",
    ],
    category: "Dairy",
    additionalInfo: {
      avgMilkProduction: "6,000-10,000 kg/year",
      avgWeight: "580-680 kg",
      lifespan: "15-20 years",
      temperament: "Docile and intelligent",
    },
    imageUrl: "/holstein-friesian-cattle-black-and-white-dairy-cow.jpg",
    tags: ["dairy", "high-production", "black-white", "large-frame"],
    popularity: 5,
  },
  angus: {
    id: "angus",
    name: "Aberdeen Angus",
    characteristics: [
      "Solid black or red coat color",
      "Naturally polled (hornless)",
      "Compact, muscular build",
      "Excellent meat quality and marbling",
      "Hardy and adaptable to various climates",
      "Strong maternal instincts",
    ],
    origin: "Scotland (Aberdeenshire and Angus counties)",
    description:
      "Aberdeen Angus is a Scottish breed of small beef cattle that derives from cattle native to the counties of Aberdeenshire and Angus in north-eastern Scotland. The breed is renowned worldwide for producing high-quality beef with excellent marbling, making it one of the most popular beef breeds globally.",
    careNotes: [
      "Excellent foragers on pasture",
      "Minimal calving difficulties due to moderate birth weights",
      "Good maternal instincts and milk production",
      "Adaptable to various climates and management systems",
      "Regular deworming and vaccination schedule recommended",
      "Monitor body condition during breeding season",
    ],
    category: "Beef",
    additionalInfo: {
      avgWeight: "500-850 kg",
      lifespan: "15-20 years",
      temperament: "Generally docile and easy to handle",
    },
    imageUrl: "/aberdeen-angus-black-beef-cattle-muscular-build.jpg",
    tags: ["beef", "polled", "black", "red", "marbling"],
    popularity: 5,
  },
  hereford: {
    id: "hereford",
    name: "Hereford",
    characteristics: [
      "Red body with distinctive white face",
      "White markings on legs and underline",
      "Naturally horned or polled varieties available",
      "Medium to large frame size",
      "Docile temperament and easy handling",
      "Excellent foraging ability",
    ],
    origin: "Herefordshire, England",
    description:
      "Hereford cattle are a beef cattle breed originally from Herefordshire, England. They are known for their distinctive red bodies with white faces and their excellent beef production qualities. Herefords are one of the most popular beef breeds worldwide due to their adaptability and efficient production.",
    careNotes: [
      "Excellent grazing efficiency on marginal lands",
      "Good mothering ability and milk production",
      "Adaptable to harsh weather conditions",
      "Regular hoof trimming needed for optimal mobility",
      "Monitor for eye problems due to white face (cancer eye)",
      "Provide adequate mineral supplementation",
    ],
    category: "Beef",
    additionalInfo: {
      avgWeight: "500-800 kg",
      lifespan: "15-18 years",
      temperament: "Docile and calm",
    },
    imageUrl: "/hereford-cattle-red-body-white-face-beef-cow.jpg",
    tags: ["beef", "red-white", "hardy", "foraging"],
    popularity: 4,
  },
  jersey: {
    id: "jersey",
    name: "Jersey",
    characteristics: [
      "Light brown to fawn colored coat",
      "Small to medium frame size",
      "High butterfat and protein milk content",
      "Refined, dairy-type appearance",
      "Large, prominent eyes and dished face",
      "Efficient feed conversion",
    ],
    origin: "Jersey Island, Channel Islands",
    description:
      "The Jersey is a British breed of small dairy cattle from Jersey, the largest of the Channel Islands. It is one of the oldest dairy breeds, having been reported in France as early as 1700. Despite their small size, Jersey cows produce milk with the highest butterfat content of any dairy breed.",
    careNotes: [
      "Efficient feed conversion - requires less feed per unit of milk",
      "Heat tolerant but sensitive to cold weather",
      "May need calcium supplementation during lactation",
      "Gentle handling required due to smaller size",
      "High-quality forage essential for optimal production",
      "Monitor for milk fever around calving",
    ],
    category: "Dairy",
    additionalInfo: {
      avgMilkProduction: "3,500-4,500 kg/year",
      avgWeight: "350-450 kg",
      lifespan: "15-20 years",
      temperament: "Alert and active",
    },
    imageUrl: "/jersey-dairy-cow-light-brown-fawn-colored-small-fr.jpg",
    tags: ["dairy", "small-frame", "high-butterfat", "efficient"],
    popularity: 4,
  },
  charolais: {
    id: "charolais",
    name: "Charolais",
    characteristics: [
      "Cream to white colored coat",
      "Large, muscular frame with excellent growth rate",
      "Naturally horned with strong bone structure",
      "Lean muscle development",
      "Good feed conversion efficiency",
      "Hardy and adaptable",
    ],
    origin: "Charolles, Burgundy, France",
    description:
      "The Charolais is a breed of taurine beef cattle from the Charolles area surrounding Charolles, in the Saône-et-Loire department, in the Burgundy region of France. They are known for their large size, excellent growth rates, and lean muscle development, making them popular for crossbreeding programs.",
    careNotes: [
      "Requires high-quality nutrition for optimal growth",
      "May need assistance during calving due to large birth weights",
      "Regular mineral supplementation essential",
      "Adequate space for exercise and movement",
      "Monitor for respiratory issues in confined spaces",
      "Provide shade during hot weather",
    ],
    category: "Beef",
    additionalInfo: {
      avgWeight: "650-1,100 kg",
      lifespan: "15-18 years",
      temperament: "Generally calm but can be protective",
    },
    imageUrl: "/charolais-cattle-cream-white-large-muscular-beef-c.jpg",
    tags: ["beef", "large-frame", "white", "muscular", "growth"],
    popularity: 4,
  },
  simmental: {
    id: "simmental",
    name: "Simmental",
    characteristics: [
      "Golden red to brown coat with white markings",
      "Large frame size with excellent muscle development",
      "Dual-purpose breed (milk and beef)",
      "Strong bone structure and good feet",
      "Excellent maternal abilities",
      "Good longevity and fertility",
    ],
    origin: "Simme Valley, Switzerland",
    description:
      "Simmental cattle originated in the Simme Valley of Switzerland and are one of the most popular dual-purpose breeds worldwide. They excel in both milk and beef production, making them valuable for diverse farming operations. Their adaptability and performance have made them popular in many countries.",
    careNotes: [
      "Adaptable to various management systems",
      "Good grazing ability on diverse terrains",
      "Regular health monitoring for optimal performance",
      "Adequate nutrition during lactation and growth",
      "Monitor for calving ease despite large frame",
      "Provide mineral supplements for bone development",
    ],
    category: "Dual-Purpose",
    additionalInfo: {
      avgMilkProduction: "4,000-6,000 kg/year",
      avgWeight: "600-900 kg",
      lifespan: "15-20 years",
      temperament: "Docile and intelligent",
    },
    imageUrl: "/simmental-cattle-golden-red-brown-white-markings-d.jpg",
    tags: ["dual-purpose", "red-brown", "large-frame", "versatile"],
    popularity: 4,
  },
  brahman: {
    id: "brahman",
    name: "Brahman",
    characteristics: [
      "Gray to red coat color with loose skin",
      "Distinctive hump over shoulders",
      "Large, drooping ears",
      "Heat and humidity tolerance",
      "Insect and disease resistance",
      "Strong survival instincts",
    ],
    origin: "India (developed in USA from Indian breeds)",
    description:
      "Brahman cattle were developed in the United States from several breeds of cattle imported from India. They are known for their exceptional heat tolerance, disease resistance, and ability to thrive in harsh tropical and subtropical environments where other breeds struggle.",
    careNotes: [
      "Excellent heat tolerance - minimal shade required",
      "Natural resistance to many parasites and diseases",
      "Can utilize poor quality forage efficiently",
      "May require gentle handling due to flight instincts",
      "Monitor for vitamin A deficiency in drought conditions",
      "Provide adequate water sources in hot climates",
    ],
    category: "Beef",
    additionalInfo: {
      avgWeight: "450-700 kg",
      lifespan: "15-20 years",
      temperament: "Alert and sometimes flighty",
    },
    imageUrl: "/brahman-cattle-gray-hump-drooping-ears-heat-tolera.jpg",
    tags: ["beef", "heat-tolerant", "hump", "gray", "hardy"],
    popularity: 3,
  },
  limousin: {
    id: "limousin",
    name: "Limousin",
    characteristics: [
      "Golden wheat to light brown coat color",
      "Muscular build with excellent meat quality",
      "Naturally horned with strong constitution",
      "Lean muscle development",
      "Good feed efficiency",
      "Hardy and adaptable",
    ],
    origin: "Limousin region, France",
    description:
      "Limousin cattle originated in the Limousin region of France and are known for their exceptional muscling and lean meat production. They have been used extensively in crossbreeding programs to improve carcass quality and are valued for their efficiency and hardiness.",
    careNotes: [
      "Efficient feed conversion for lean muscle production",
      "Good grazing ability on various terrains",
      "Monitor calving due to muscular development",
      "Regular mineral supplementation recommended",
      "Adaptable to different climate conditions",
      "Provide adequate exercise space",
    ],
    category: "Beef",
    additionalInfo: {
      avgWeight: "550-800 kg",
      lifespan: "15-18 years",
      temperament: "Generally docile with good handling",
    },
    imageUrl: "/limousin-cattle-golden-wheat-brown-muscular-lean-b.jpg",
    tags: ["beef", "muscular", "golden", "lean", "efficient"],
    popularity: 3,
  },
}

// Helper functions for database operations
export function getAllBreeds(): BreedInfo[] {
  return Object.values(CATTLE_BREEDS_DATABASE).sort((a, b) => b.popularity - a.popularity)
}

export function getBreedById(id: string): BreedInfo | null {
  return CATTLE_BREEDS_DATABASE[id] || null
}

export function getBreedsByCategory(category: BreedInfo["category"]): BreedInfo[] {
  return Object.values(CATTLE_BREEDS_DATABASE)
    .filter((breed) => breed.category === category)
    .sort((a, b) => b.popularity - a.popularity)
}

export function searchBreeds(query: string): BreedInfo[] {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(CATTLE_BREEDS_DATABASE)
    .filter(
      (breed) =>
        breed.name.toLowerCase().includes(lowercaseQuery) ||
        breed.origin.toLowerCase().includes(lowercaseQuery) ||
        breed.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        breed.characteristics.some((char) => char.toLowerCase().includes(lowercaseQuery)),
    )
    .sort((a, b) => b.popularity - a.popularity)
}

export function getPopularBreeds(limit = 6): BreedInfo[] {
  return Object.values(CATTLE_BREEDS_DATABASE)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}
