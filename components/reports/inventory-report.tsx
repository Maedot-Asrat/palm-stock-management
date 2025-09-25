"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const inventoryData = [
  { site: "Palm Towers", available: 15, reserved: 8, sold: 37, total: 60 },
  { site: "Palm Plaza", available: 12, reserved: 5, sold: 23, total: 40 },
  { site: "Palm Residences", available: 18, reserved: 6, sold: 26, total: 50 },
]

const unitTypeInventory = [
  { type: "Apartments", available: 32, reserved: 12, sold: 68, total: 112 },
  { type: "Shops", available: 8, reserved: 4, sold: 15, total: 27 },
  { type: "Penthouses", available: 5, reserved: 3, sold: 3, total: 11 },
]

interface InventoryReportProps {
  period: string
  site: string
}

export function InventoryReport({ period, site }: InventoryReportProps) {
  return (
    <div className="space-y-6">
      {/* Inventory Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status by Site</CardTitle>
          <CardDescription>Current availability across all locations</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="site" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="available" stackId="a" fill="#22c55e" name="Available" />
              <Bar dataKey="reserved" stackId="a" fill="#eab308" name="Reserved" />
              <Bar dataKey="sold" stackId="a" fill="#1d4d71" name="Sold" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unit Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Unit Type</CardTitle>
            <CardDescription>Status breakdown by property type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {unitTypeInventory.map((unit) => (
              <div key={unit.type} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{unit.type}</span>
                  <span className="text-sm text-muted-foreground">{unit.total} total units</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Available: {unit.available}</span>
                    <span>Reserved: {unit.reserved}</span>
                    <span>Sold: {unit.sold}</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500" style={{ width: `${(unit.available / unit.total) * 100}%` }} />
                    <div className="bg-yellow-500" style={{ width: `${(unit.reserved / unit.total) * 100}%` }} />
                    <div className="bg-blue-600" style={{ width: `${(unit.sold / unit.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Availability Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Units requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
                <div>
                  <h4 className="font-medium text-red-800">Low Inventory</h4>
                  <p className="text-sm text-red-600">Palm Residences - Penthouses</p>
                </div>
                <Badge className="bg-red-100 text-red-800">5 left</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                <div>
                  <h4 className="font-medium text-yellow-800">High Reservation Rate</h4>
                  <p className="text-sm text-yellow-600">Palm Towers - Apartments</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">8 reserved</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 border-green-200">
                <div>
                  <h4 className="font-medium text-green-800">High Availability</h4>
                  <p className="text-sm text-green-600">Palm Plaza - Shops</p>
                </div>
                <Badge className="bg-green-100 text-green-800">12 available</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Inventory Status</CardTitle>
          <CardDescription>Complete breakdown by site and unit type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryData.map((site) => (
              <div key={site.site} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{site.site}</h3>
                  <Badge variant="outline">{site.total} total units</Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{site.available}</div>
                    <div className="text-muted-foreground">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{site.reserved}</div>
                    <div className="text-muted-foreground">Reserved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{site.sold}</div>
                    <div className="text-muted-foreground">Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{((site.sold / site.total) * 100).toFixed(1)}%</div>
                    <div className="text-muted-foreground">Sold Rate</div>
                  </div>
                </div>
                <Progress value={(site.sold / site.total) * 100} className="mt-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
