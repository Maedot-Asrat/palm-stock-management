"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Reservation {
  id: string
  unitNumber: string
  unitType: "apartment" | "shop" | "penthouse"
  clientName: string
  clientEmail: string
  clientPhone: string
  agentName: string
  reservationDate: string
  expiryDate: string
  status: "active" | "expired" | "confirmed" | "cancelled"
  price: number
  deposit: number
  notes: string
  site: string
}

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
  onSave: () => void
}

export function ReservationDialog({ open, onOpenChange, reservation, onSave }: ReservationDialogProps) {
  const [formData, setFormData] = useState({
    unitNumber: "",
    unitType: "apartment" as const,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    agentName: "",
    price: "",
    deposit: "",
    notes: "",
    site: "palm-towers",
  })
  const [expiryDate, setExpiryDate] = useState<Date>()

  useEffect(() => {
    if (reservation) {
      setFormData({
        unitNumber: reservation.unitNumber,
        unitType: reservation.unitType,
        clientName: reservation.clientName,
        clientEmail: reservation.clientEmail,
        clientPhone: reservation.clientPhone,
        agentName: reservation.agentName,
        price: reservation.price.toString(),
        deposit: reservation.deposit.toString(),
        notes: reservation.notes,
        site: reservation.site,
      })
      setExpiryDate(new Date(reservation.expiryDate))
    } else {
      setFormData({
        unitNumber: "",
        unitType: "apartment",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        agentName: "",
        price: "",
        deposit: "",
        notes: "",
        site: "palm-towers",
      })
      // Set default expiry date to 7 days from now
      const defaultExpiry = new Date()
      defaultExpiry.setDate(defaultExpiry.getDate() + 7)
      setExpiryDate(defaultExpiry)
    }
  }, [reservation])

  const handleSave = () => {
    // Here you would typically save the reservation data
    console.log("Saving reservation:", { ...formData, expiryDate })
    onSave()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{reservation ? "Edit Reservation" : "New Reservation"}</DialogTitle>
          <DialogDescription>
            {reservation ? "Update reservation details." : "Create a new property reservation."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitNumber">Unit Number</Label>
              <Input
                id="unitNumber"
                value={formData.unitNumber}
                onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                placeholder="e.g., A101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitType">Unit Type</Label>
              <Select
                value={formData.unitType}
                onValueChange={(value: any) => setFormData({ ...formData, unitType: value })}
              >
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              placeholder="client@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentName">Agent Name</Label>
            <Input
              id="agentName"
              value={formData.agentName}
              onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
              placeholder="Assigned agent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (ETB)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="450000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit (ETB)</Label>
              <Input
                id="deposit"
                type="number"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                placeholder="45000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about the reservation..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            {reservation ? "Update Reservation" : "Create Reservation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
