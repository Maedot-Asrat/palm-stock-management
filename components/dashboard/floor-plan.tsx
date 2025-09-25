"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface Unit {
  id: string
  number: string
  type: "apartment" | "shop" | "penthouse"
  area: number
  price: number
  status: "available" | "reserved" | "sold" | "not-available"
  floor: number
  position: { x: number; y: number }
}

const mockUnits: Unit[] = [
  {
    id: "1",
    number: "A101",
    type: "apartment",
    area: 850,
    price: 450000,
    status: "available",
    floor: 1,
    position: { x: 10, y: 10 },
  },
  {
    id: "2",
    number: "A102",
    type: "apartment",
    area: 920,
    price: 480000,
    status: "sold",
    floor: 1,
    position: { x: 150, y: 10 },
  },
  {
    id: "3",
    number: "A103",
    type: "apartment",
    area: 780,
    price: 420000,
    status: "reserved",
    floor: 1,
    position: { x: 290, y: 10 },
  },
  {
    id: "4",
    number: "S101",
    type: "shop",
    area: 120,
    price: 180000,
    status: "available",
    floor: 1,
    position: { x: 10, y: 150 },
  },
  {
    id: "5",
    number: "S102",
    type: "shop",
    area: 95,
    price: 160000,
    status: "not-available",
    floor: 1,
    position: { x: 150, y: 150 },
  },
  {
    id: "6",
    number: "P201",
    type: "penthouse",
    area: 1200,
    price: 850000,
    status: "available",
    floor: 2,
    position: { x: 10, y: 10 },
  },
  {
    id: "7",
    number: "P202",
    type: "penthouse",
    area: 1350,
    price: 920000,
    status: "sold",
    floor: 2,
    position: { x: 200, y: 10 },
  },
]

const statusColors = {
  available: "bg-white border-2 border-gray-300 hover:border-primary",
  reserved: "bg-yellow-200 border-2 border-yellow-400",
  sold: "bg-green-200 border-2 border-green-400",
  "not-available": "bg-red-200 border-2 border-red-400",
}

const statusLabels = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
  "not-available": "Not Available",
}

interface FloorPlanProps {
  selectedSite: string
}

export function FloorPlan({ selectedSite }: FloorPlanProps) {
  const [selectedFloor, setSelectedFloor] = useState("1")
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  const filteredUnits = mockUnits.filter((unit) => unit.floor === Number.parseInt(selectedFloor))

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Floor Plan View</CardTitle>
                <CardDescription>Interactive floor plan with real-time status</CardDescription>
              </div>
              <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Floor 1</SelectItem>
                  <SelectItem value="2">Floor 2</SelectItem>
                  <SelectItem value="3">Floor 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 w-full overflow-hidden rounded-lg border bg-gray-50">
              {/* Floor Plan Background */}
              <svg className="absolute inset-0 h-full w-full">
                {/* Building outline */}
                <rect x="5" y="5" width="390" height="290" fill="none" stroke="#e5e7eb" strokeWidth="2" />

                {/* Room divisions */}
                <line x1="5" y1="100" x2="395" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="130" y1="5" x2="130" y2="295" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="270" y1="5" x2="270" y2="295" stroke="#e5e7eb" strokeWidth="1" />
              </svg>

              {/* Units */}
              {filteredUnits.map((unit) => (
                <div
                  key={unit.id}
                  className={`absolute cursor-pointer rounded-md p-2 text-xs transition-all hover:scale-105 ${statusColors[unit.status]}`}
                  style={{
                    left: unit.position.x,
                    top: unit.position.y,
                    width: unit.type === "penthouse" ? "180px" : unit.type === "shop" ? "100px" : "120px",
                    height: unit.type === "penthouse" ? "120px" : "80px",
                  }}
                  onClick={() => setSelectedUnit(unit)}
                >
                  <div className="font-semibold">{unit.number}</div>
                  <div className="text-gray-600">{unit.area} sqft</div>
                  <div className="text-gray-600">{unit.price.toLocaleString()}ETB</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              {Object.entries(statusColors).map(([status, colorClass]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded ${colorClass}`} />
                  <span className="text-sm">{statusLabels[status as keyof typeof statusLabels]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unit Details Panel */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Unit Details</CardTitle>
            <CardDescription>
              {selectedUnit ? "Selected unit information" : "Click on a unit to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUnit ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedUnit.number}</h3>
                  <Badge
                    className={
                      statusColors[selectedUnit.status].includes("green")
                        ? "bg-green-100 text-green-800"
                        : statusColors[selectedUnit.status].includes("yellow")
                          ? "bg-yellow-100 text-yellow-800"
                          : statusColors[selectedUnit.status].includes("red")
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }
                  >
                    {statusLabels[selectedUnit.status]}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="capitalize">{selectedUnit.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span>{selectedUnit.area} sqft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span>{selectedUnit.price.toLocaleString()}ETB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor:</span>
                    <span>{selectedUnit.floor}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedUnit.status === "available" && <Button className="w-full">Reserve Unit</Button>}
                  {selectedUnit.status === "reserved" && (
                    <Button variant="outline" className="w-full bg-transparent">
                      View Reservation
                    </Button>
                  )}
                  {selectedUnit.status === "sold" && (
                    <Button variant="outline" className="w-full bg-transparent">
                      View Sale Details
                    </Button>
                  )}
                  <Button variant="outline" className="w-full bg-transparent">
                    Edit Unit
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Select a unit from the floor plan to view its details and available actions.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
