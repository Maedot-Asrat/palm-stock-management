"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, TrendingUp, TrendingDown, Users, Building, DollarSign, Clock } from "lucide-react"
import { SalesReport } from "./sales-report"
import { InventoryReport } from "./inventory-report"
import { AgentPerformance } from "./agent-performance"
import { FinancialReport } from "./financial-report"

export function ReportsModule() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedSite, setSelectedSite] = useState("all")

  const reportStats = [
    {
      title: "Total Revenue",
      value: "2,450,000 ETB",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "This month",
    },
    {
      title: "Units Sold",
      value: "23",
      change: "+8",
      changeType: "increase" as const,
      icon: Building,
      description: "This month",
    },
    {
      title: "Active Reservations",
      value: "15",
      change: "-3",
      changeType: "decrease" as const,
      icon: Clock,
      description: "Currently pending",
    },
    {
      title: "Avg. Sale Time",
      value: "18 days",
      change: "-2 days",
      changeType: "increase" as const,
      icon: TrendingUp,
      description: "Time to close",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reports & Analytics</h1>
          <p className="text-muted-foreground text-pretty">
            Comprehensive insights into sales performance and inventory management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSite} onValueChange={setSelectedSite}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              <SelectItem value="palm-towers">Palm Towers</SelectItem>
              <SelectItem value="palm-plaza">Palm Plaza</SelectItem>
              <SelectItem value="palm-residences">Palm Residences</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center gap-1">
                  {stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Sales Report
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Agent Performance
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <SalesReport period={selectedPeriod} site={selectedSite} />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <InventoryReport period={selectedPeriod} site={selectedSite} />
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <AgentPerformance period={selectedPeriod} site={selectedSite} />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <FinancialReport period={selectedPeriod} site={selectedSite} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
