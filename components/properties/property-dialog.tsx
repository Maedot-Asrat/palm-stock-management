"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface PropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (property: Omit<Property, "id" | "lastUpdated">) => void
  property?: Property | null
  onClose: () => void
}

export function PropertyDialog({ open, onOpenChange, onSubmit, property, onClose }: PropertyDialogProps) {
  const [formData, setFormData] = useState({
    number: "",
    type: "apartment" as const,
    area: "",
    price: "",
    status: "available" as const,
    floor: "",
    site: "palm-towers",
    description: "",
    amenities: "",
  })

  useEffect(() => {
    if (property) {
      setFormData({
        number: property.number,
        type: property.type,
        area: property.area.toString(),
        price: property.price.toString(),
        status: property.status,
        floor: property.floor.toString(),
        site: property.site,
        description: property.description || "",
        amenities: property.amenities?.join(", ") || "",
      })
    } else {
      setFormData({
        number: "",
        type: "apartment",
        area: "",
        price: "",
        status: "available",
        floor: "",
        site: "palm-towers",
        description: "",
        amenities: "",
      })
    }
  }, [property])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const propertyData = {
      number: formData.number,
      type: formData.type,
      area: Number.parseInt(formData.area),
      price: Number.parseInt(formData.price),
      status: formData.status,
      floor: Number.parseInt(formData.floor),
      site: formData.site,
      description: formData.description,
      amenities: formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      images: ["/modern-living-room.png"],
    }

    onSubmit(propertyData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{property ? "Edit Property" : "Add New Property"}</DialogTitle>
          <DialogDescription>
            {property ? "Update the property details below." : "Enter the details for the new property."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Property Number</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="e.g., A101"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="shop">Shop</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="e.g., 850"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (ETB)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 450000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                placeholder="e.g., 1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site">Site</Label>
              <Select value={formData.site} onValueChange={(value) => setFormData({ ...formData, site: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="palm-towers">Palm Towers</SelectItem>
                  <SelectItem value="palm-plaza">Palm Plaza</SelectItem>
                  <SelectItem value="palm-residences">Palm Residences</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="not-available">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter property description..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="e.g., Balcony, Parking, Storage, AC"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {property ? "Update Property" : "Add Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
