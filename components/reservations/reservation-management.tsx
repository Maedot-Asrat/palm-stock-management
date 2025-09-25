"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  Building,
  DollarSign,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { ReservationDialog } from "./reservation-dialog"
import { ClientDetailsDialog } from "./client-details-dialog"

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

const mockReservations: Reservation[] = [
  {
    id: "1",
    unitNumber: "A101",
    unitType: "apartment",
    clientName: "Alice Johnson",
    clientEmail: "alice.johnson@email.com",
    clientPhone: "+1 (555) 123-4567",
    agentName: "Sarah Wilson",
    reservationDate: "2024-01-15",
    expiryDate: "2024-01-22",
    status: "active",
    price: 450000,
    deposit: 45000,
    notes: "Client interested in quick closing",
    site: "palm-towers",
  },
  {
    id: "2",
    unitNumber: "P201",
    unitType: "penthouse",
    clientName: "Robert Chen",
    clientEmail: "robert.chen@email.com",
    clientPhone: "+1 (555) 234-5678",
    agentName: "Emily Rodriguez",
    reservationDate: "2024-01-14",
    expiryDate: "2024-01-21",
    status: "confirmed",
    price: 850000,
    deposit: 85000,
    notes: "Payment confirmed by finance team",
    site: "palm-residences",
  },
  {
    id: "3",
    unitNumber: "S102",
    unitType: "shop",
    clientName: "Maria Garcia",
    clientEmail: "maria.garcia@email.com",
    clientPhone: "+1 (555) 345-6789",
    agentName: "David Thompson",
    reservationDate: "2024-01-10",
    expiryDate: "2024-01-17",
    status: "expired",
    price: 160000,
    deposit: 16000,
    notes: "Client did not respond to follow-up calls",
    site: "palm-plaza",
  },
  {
    id: "4",
    unitNumber: "A203",
    unitType: "apartment",
    clientName: "James Wilson",
    clientEmail: "james.wilson@email.com",
    clientPhone: "+1 (555) 456-7890",
    agentName: "Sarah Wilson",
    reservationDate: "2024-01-13",
    expiryDate: "2024-01-20",
    status: "cancelled",
    price: 480000,
    deposit: 48000,
    notes: "Client found another property",
    site: "palm-towers",
  },
]

const statusConfig = {
  active: { label: "Active", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", icon: Clock },
  confirmed: {
    label: "Confirmed",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
  },
  expired: { label: "Expired", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300", icon: XCircle },
  cancelled: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    icon: XCircle,
  },
}

export function ReservationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSite, setSelectedSite] = useState("all")
  const [showReservationDialog, setShowReservationDialog] = useState(false)
  const [showClientDialog, setShowClientDialog] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  const filteredReservations = mockReservations.filter((reservation) => {
    const matchesSearch =
      reservation.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.agentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || reservation.status === selectedStatus
    const matchesSite = selectedSite === "all" || reservation.site === selectedSite

    return matchesSearch && matchesStatus && matchesSite
  })

  const handleViewClient = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setShowClientDialog(true)
  }

  const handleNewReservation = () => {
    setSelectedReservation(null)
    setShowReservationDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reservation Management</h1>
          <p className="text-muted-foreground text-pretty">Track and manage property reservations and client details</p>
        </div>
        <Button onClick={handleNewReservation}>
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReservations.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReservations.filter((r) => r.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Pending confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReservations.filter((r) => r.status === "confirmed").length}</div>
            <p className="text-xs text-muted-foreground">Ready for sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Within 3 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter reservations by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by unit, client, or agent..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="palm-towers">Palm Towers</SelectItem>
                <SelectItem value="palm-plaza">Palm Plaza</SelectItem>
                <SelectItem value="palm-residences">Palm Residences</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reservations List */}
      <div className="grid gap-4">
        {filteredReservations.map((reservation) => {
          const StatusIcon = statusConfig[reservation.status].icon
          const isExpiringSoon =
            reservation.status === "active" &&
            new Date(reservation.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

          return (
            <Card key={reservation.id} className={`${isExpiringSoon ? "border-orange-200 bg-orange-50/50" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={reservation.clientName} />
                      <AvatarFallback>
                        {reservation.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{reservation.unitNumber}</h3>
                        <Badge className={statusConfig[reservation.status].color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[reservation.status].label}
                        </Badge>
                        {isExpiringSoon && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Expiring Soon
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{reservation.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{reservation.unitType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{reservation.clientEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{reservation.clientPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{reservation.price.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Expires: {reservation.expiryDate}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">Agent: {reservation.agentName}</p>
                      {reservation.notes && (
                        <p className="text-sm text-muted-foreground italic">"{reservation.notes}"</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewClient(reservation)}>
                      <User className="mr-1 h-3 w-3" />
                      Client Details
                    </Button>
                    {reservation.status === "active" && (
                      <Button size="sm">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Confirm
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredReservations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No reservations found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter options.</p>
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <ReservationDialog
        open={showReservationDialog}
        onOpenChange={setShowReservationDialog}
        reservation={selectedReservation}
        onSave={() => setShowReservationDialog(false)}
      />
      <ClientDetailsDialog
        open={showClientDialog}
        onOpenChange={setShowClientDialog}
        reservation={selectedReservation}
      />
    </div>
  )
}
