"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Square, DollarSign, Building, Home, Store, Calendar, Star } from "lucide-react"

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

interface PropertyDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: Property | null
}

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

export function PropertyDetailsDialog({ open, onOpenChange, property }: PropertyDetailsDialogProps) {
  if (!property) return null

  const TypeIcon = typeConfig[property.type].icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{property.number}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <TypeIcon className="h-4 w-4" />
                <span className="capitalize">{property.type}</span>
                <span>• {siteConfig[property.site as keyof typeof siteConfig]}</span>
              </DialogDescription>
            </div>
            <Badge className={statusConfig[property.status].color}>{statusConfig[property.status].label}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={property.images?.[0] || "/placeholder.svg?height=300&width=500&query=property interior"}
              alt={`Property ${property.number}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.area}</div>
                <p className="text-xs text-muted-foreground">sqft</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.price.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">ETB</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Floor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{property.floor}</div>
                <p className="text-xs text-muted-foreground">level</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold">{property.lastUpdated}</div>
                <p className="text-xs text-muted-foreground">last update</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          {property.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {property.status === "available" && (
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Calendar className="mr-2 h-4 w-4" />
                Reserve Property
              </Button>
            )}
            <Button variant="outline" className="flex-1 bg-transparent">
              Schedule Viewing
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
