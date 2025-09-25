"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Calendar, MapPin, Square, DollarSign } from "lucide-react"

interface Property {
  id: string
  number: string
  type: "apartment" | "shop" | "penthouse"
  area: number
  price: number
  status: "available" | "reserved" | "sold" | "not-available"
  floor: number
  site: string
  lastUpdated: string
}

const mockProperties: Property[] = [
  {
    id: "1",
    number: "A101",
    type: "apartment",
    area: 850,
    price: 450000,
    status: "available",
    floor: 1,
    site: "palm-towers",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    number: "A102",
    type: "apartment",
    area: 920,
    price: 480000,
    status: "sold",
    floor: 1,
    site: "palm-towers",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    number: "A103",
    type: "apartment",
    area: 780,
    price: 420000,
    status: "reserved",
    floor: 1,
    site: "palm-towers",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    number: "S101",
    type: "shop",
    area: 120,
    price: 180000,
    status: "available",
    floor: 1,
    site: "palm-plaza",
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    number: "S102",
    type: "shop",
    area: 95,
    price: 160000,
    status: "not-available",
    floor: 1,
    site: "palm-plaza",
    lastUpdated: "2024-01-11",
  },
  {
    id: "6",
    number: "P201",
    type: "penthouse",
    area: 1200,
    price: 850000,
    status: "available",
    floor: 2,
    site: "palm-residences",
    lastUpdated: "2024-01-10",
  },
  {
    id: "7",
    number: "P202",
    type: "penthouse",
    area: 1350,
    price: 920000,
    status: "sold",
    floor: 2,
    site: "palm-residences",
    lastUpdated: "2024-01-09",
  },
  {
    id: "8",
    number: "A201",
    type: "apartment",
    area: 900,
    price: 470000,
    status: "available",
    floor: 2,
    site: "palm-towers",
    lastUpdated: "2024-01-08",
  },
]

const statusConfig = {
  available: { label: "Available", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  reserved: { label: "Reserved", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  sold: { label: "Sold", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  "not-available": { label: "Not Available", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

const typeConfig = {
  apartment: { label: "Apartment", icon: "🏠" },
  shop: { label: "Shop", icon: "🏪" },
  penthouse: { label: "Penthouse", icon: "🏢" },
}

interface PropertyGridProps {
  searchTerm: string
  selectedSite: string
  selectedStatus: string
}

export function PropertyGrid({ searchTerm, selectedSite, selectedStatus }: PropertyGridProps) {
  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.area.toString().includes(searchTerm)

    const matchesSite = selectedSite === "all" || property.site === selectedSite
    const matchesStatus = selectedStatus === "all" || property.status === selectedStatus

    return matchesSearch && matchesSite && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Property Listings</h2>
        <p className="text-muted-foreground">{filteredProperties.length} properties found</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{property.number}</CardTitle>
                <Badge className={statusConfig[property.status].color}>{statusConfig[property.status].label}</Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <span>{typeConfig[property.type].icon}</span>
                <span className="capitalize">{property.type}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span>{property.area} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{property.price.toLocaleString()}ETB</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Floor {property.floor}</span>
                </div>
                <div className="text-xs text-muted-foreground">Updated {property.lastUpdated}</div>
              </div>

              <div className="flex gap-2">
                {property.status === "available" && (
                  <Button size="sm" className="flex-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    Reserve
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter options.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
