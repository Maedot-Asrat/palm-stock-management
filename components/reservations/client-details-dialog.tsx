"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  MessageSquare,
  CheckCircle,
} from "lucide-react"

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

interface ClientDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
}

export function ClientDetailsDialog({ open, onOpenChange, reservation }: ClientDetailsDialogProps) {
  if (!reservation) return null

  const statusConfig = {
    active: { label: "Active", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
    confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
    expired: { label: "Expired", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
    cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
  }

  const mockInteractions = [
    {
      id: "1",
      date: "2024-01-15",
      type: "call",
      description: "Initial inquiry about the unit",
      agent: "Sarah Wilson",
    },
    {
      id: "2",
      date: "2024-01-16",
      type: "email",
      description: "Sent property details and floor plan",
      agent: "Sarah Wilson",
    },
    {
      id: "3",
      date: "2024-01-17",
      type: "meeting",
      description: "Property viewing scheduled",
      agent: "Sarah Wilson",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Client Details
          </DialogTitle>
          <DialogDescription>Complete information about the client and reservation</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={reservation.clientName} />
                  <AvatarFallback>
                    {reservation.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{reservation.clientName}</h3>
                  <p className="text-sm text-muted-foreground">Client Information</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.clientEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{reservation.clientPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Details */}
          <Card>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
              <CardDescription>Property and reservation information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{reservation.unitNumber}</span>
                  <Badge className="capitalize">{reservation.unitType}</Badge>
                </div>
                <Badge className={statusConfig[reservation.status].color}>
                  {statusConfig[reservation.status].label}
                </Badge>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Price:</span>
                    <span className="text-sm">{reservation.price.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Deposit:</span>
                    <span className="text-sm">{reservation.deposit.toLocaleString()} ETB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Reserved:</span>
                    <span className="text-sm">{reservation.reservationDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Expires:</span>
                    <span className="text-sm">{reservation.expiryDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Agent:</span>
                <span className="text-sm">{reservation.agentName}</span>
              </div>

              {reservation.notes && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Notes:</span>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{reservation.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Interaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interaction History
              </CardTitle>
              <CardDescription>Communication log with the client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInteractions.map((interaction, index) => (
                  <div key={interaction.id} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium capitalize">{interaction.type}</span>
                        <span className="text-xs text-muted-foreground">{interaction.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{interaction.description}</p>
                      <p className="text-xs text-muted-foreground">by {interaction.agent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {reservation.status === "active" && (
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm Reservation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
