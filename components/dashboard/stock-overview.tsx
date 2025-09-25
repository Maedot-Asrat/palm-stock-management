"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Home, ShoppingBag, Crown, TrendingUp, TrendingDown } from "lucide-react"

const stockData = [
  {
    title: "Total Units",
    value: "1,247",
    change: "+12",
    changeType: "increase" as const,
    icon: Building,
    description: "Across all properties",
  },
  {
    title: "Available",
    value: "342",
    change: "-8",
    changeType: "decrease" as const,
    icon: Home,
    description: "Ready for sale",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "Reserved",
    value: "89",
    change: "+15",
    changeType: "increase" as const,
    icon: ShoppingBag,
    description: "Pending confirmation",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    title: "Sold",
    value: "756",
    change: "+23",
    changeType: "increase" as const,
    icon: Crown,
    description: "Completed sales",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
]

export function StockOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stockData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-1">
                {item.changeType === "increase" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${item.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                  {item.change}
                </span>
              </div>
            </div>
            {item.color && (
              <Badge className={`mt-2 ${item.color}`} variant="secondary">
                {item.title}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
