"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const salesData = [
  { month: "Jan", apartments: 12, shops: 3, penthouses: 2, total: 17 },
  { month: "Feb", apartments: 15, shops: 4, penthouses: 1, total: 20 },
  { month: "Mar", apartments: 18, shops: 2, penthouses: 3, total: 23 },
  { month: "Apr", apartments: 14, shops: 5, penthouses: 2, total: 21 },
  { month: "May", apartments: 16, shops: 3, penthouses: 4, total: 23 },
  { month: "Jun", apartments: 20, shops: 6, penthouses: 2, total: 28 },
]

const unitTypeData = [
  { name: "Apartments", value: 95, color: "#1d4d71" },
  { name: "Shops", value: 23, color: "#ebc587" },
  { name: "Penthouses", value: 14, color: "#8b9dc3" },
]

const sitePerformance = [
  { site: "Palm Towers", sold: 45, total: 60, revenue: 1200000 },
  { site: "Palm Plaza", sold: 28, total: 40, revenue: 850000 },
  { site: "Palm Residences", sold: 32, total: 50, revenue: 1400000 },
]

interface SalesReportProps {
  period: string
  site: string
}

export function SalesReport({ period, site }: SalesReportProps) {
  return (
    <div className="space-y-6">
      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Monthly sales performance by unit type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="apartments" stackId="a" fill="#1d4d71" name="Apartments" />
              <Bar dataKey="shops" stackId="a" fill="#ebc587" name="Shops" />
              <Bar dataKey="penthouses" stackId="a" fill="#8b9dc3" name="Penthouses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unit Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Unit Type</CardTitle>
            <CardDescription>Distribution of sold units</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={unitTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {unitTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Site Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Site Performance</CardTitle>
            <CardDescription>Sales progress by location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sitePerformance.map((site) => (
              <div key={site.site} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{site.site}</span>
                  <Badge variant="outline">
                    {site.sold}/{site.total} sold
                  </Badge>
                </div>
                <Progress value={(site.sold / site.total) * 100} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{((site.sold / site.total) * 100).toFixed(1)}% sold</span>
                  <span>{site.revenue.toLocaleString()}ETB revenue </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Units */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Latest completed transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { unit: "P201", type: "Penthouse", price: 850000, date: "2024-01-15", agent: "Sarah Wilson" },
              { unit: "A305", type: "Apartment", price: 480000, date: "2024-01-14", agent: "Emily Rodriguez" },
              { unit: "S105", type: "Shop", price: 180000, date: "2024-01-13", agent: "David Thompson" },
              { unit: "A201", type: "Apartment", price: 450000, date: "2024-01-12", agent: "Sarah Wilson" },
            ].map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{sale.unit}</h4>
                    <p className="text-sm text-muted-foreground">{sale.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{sale.price.toLocaleString()}ETB</p>
                  <p className="text-sm text-muted-foreground">{sale.date}</p>
                  <p className="text-xs text-muted-foreground">by {sale.agent}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
