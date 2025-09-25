"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Square,
  DollarSign,
  Building,
  Home,
  Store,
} from "lucide-react"
import { PropertyDialog } from "./property-dialog"
import { PropertyDetailsDialog } from "./property-details-dialog"

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
  description?: string
  amenities?: string[]
  images?: string[]
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
    description: "Spacious 2-bedroom apartment with modern finishes and city views.",
    amenities: ["Balcony", "Parking", "Storage", "AC"],
    images: ["/modern-apartment.png"],
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
    description: "Premium apartment with upgraded kitchen and bathroom fixtures.",
    amenities: ["Balcony", "Parking", "Storage", "AC", "Gym Access"],
    images: ["/luxury-apartment-kitchen.png"],
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
    description: "Cozy 1-bedroom apartment perfect for young professionals.",
    amenities: ["Balcony", "Parking", "AC"],
    images: ["/cozy-apartment-bedroom.png"],
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
    description: "Prime retail space with high foot traffic location.",
    amenities: ["Street Access", "Storage", "AC", "Security"],
    images: ["/retail-shop-interior.jpg"],
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
    description: "Compact retail unit ideal for boutique businesses.",
    amenities: ["Street Access", "AC", "Security"],
    images: ["/small-boutique-shop.jpg"],
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
    description: "Luxury penthouse with panoramic views and private terrace.",
    amenities: ["Private Terrace", "Parking", "Storage", "AC", "Gym Access", "Concierge"],
    images: ["/luxury-penthouse-terrace.png"],
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
    description: "Ultra-luxury penthouse with premium finishes throughout.",
    amenities: ["Private Terrace", "Parking", "Storage", "AC", "Gym Access", "Concierge", "Pool Access"],
    images: ["/ultra-luxury-penthouse-living-room.jpg"],
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
    description: "Spacious 2-bedroom apartment with modern amenities.",
    amenities: ["Balcony", "Parking", "Storage", "AC", "Gym Access"],
    images: ["/modern-2-bedroom-apartment.jpg"],
  },
]

const statusConfig = {
  available: { label: "Available", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  reserved: { label: "Reserved", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
  sold: { label: "Sold", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  "not-available": { label: "Not Available", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
}

const typeConfig = {
  apartment: { label: "Apartment", icon: Home },
  shop: { label: "Shop", icon: Store },
  penthouse: { label: "Penthouse", icon: Building },
}

const siteConfig = {
  "palm-towers": "Palm Towers",
  "palm-plaza": "Palm Plaza",
  "palm-residences": "Palm Residences",
}

export function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSite, setSelectedSite] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.area.toString().includes(searchTerm) ||
      property.price.toString().includes(searchTerm)

    const matchesSite = selectedSite === "all" || property.site === selectedSite
    const matchesStatus = selectedStatus === "all" || property.status === selectedStatus
    const matchesType = selectedType === "all" || property.type === selectedType

    return matchesSearch && matchesSite && matchesStatus && matchesType
  })

  const handleAddProperty = (propertyData: Omit<Property, "id" | "lastUpdated">) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setProperties([...properties, newProperty])
  }

  const handleEditProperty = (propertyData: Omit<Property, "id" | "lastUpdated">) => {
    if (editingProperty) {
      const updatedProperty: Property = {
        ...propertyData,
        id: editingProperty.id,
        lastUpdated: new Date().toISOString().split("T")[0],
      }
      setProperties(properties.map((p) => (p.id === editingProperty.id ? updatedProperty : p)))
      setEditingProperty(null)
    }
  }

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id))
  }

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property)
    setIsDetailsDialogOpen(true)
  }

  const handleEditClick = (property: Property) => {
    setEditingProperty(property)
    setIsPropertyDialogOpen(true)
  }

  const handleReserveProperty = (property: Property) => {
    const updatedProperty = {
      ...property,
      status: "reserved" as const,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setProperties(properties.map((p) => (p.id === property.id ? updatedProperty : p)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground">Manage your real estate inventory</p>
        </div>
        <Button onClick={() => setIsPropertyDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.filter((p) => p.status === "available").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.filter((p) => p.status === "reserved").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sold</CardTitle>
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.filter((p) => p.status === "sold").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Properties
          </CardTitle>
          <CardDescription>Find properties by various criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by property number, type, area, or price..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger>
                <SelectValue placeholder="All Sites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="palm-towers">Palm Towers</SelectItem>
                <SelectItem value="palm-plaza">Palm Plaza</SelectItem>
                <SelectItem value="palm-residences">Palm Residences</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="not-available">Not Available</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
                <SelectItem value="penthouse">Penthouse</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedSite("all")
                setSelectedStatus("all")
                setSelectedType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Property Listings</h2>
          <p className="text-muted-foreground">{filteredProperties.length} properties found</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => {
            const TypeIcon = typeConfig[property.type].icon
            return (
              <Card key={property.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{property.number}</CardTitle>
                    <Badge className={statusConfig[property.status].color}>{statusConfig[property.status].label}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4" />
                    <span className="capitalize">{property.type}</span>
                    <span className="text-xs">• {siteConfig[property.site as keyof typeof siteConfig]}</span>
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
                      <Button size="sm" className="flex-1" onClick={() => handleReserveProperty(property)}>
                        <Calendar className="mr-1 h-3 w-3" />
                        Reserve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewProperty(property)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(property)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProperty(property.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Building className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No properties found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter options.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <PropertyDialog
        open={isPropertyDialogOpen}
        onOpenChange={setIsPropertyDialogOpen}
        onSubmit={editingProperty ? handleEditProperty : handleAddProperty}
        property={editingProperty}
        onClose={() => {
          setEditingProperty(null)
          setIsPropertyDialogOpen(false)
        }}
      />

      <PropertyDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        property={selectedProperty}
      />
    </div>
  )
}
