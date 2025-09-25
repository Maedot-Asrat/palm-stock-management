"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Trophy, Target, TrendingUp, Users } from "lucide-react"

const agentData = [
  {
    name: "Sarah Wilson",
    sales: 15,
    revenue: 1250000,
    target: 18,
    reservations: 8,
    conversionRate: 78,
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    sales: 12,
    revenue: 980000,
    target: 15,
    reservations: 6,
    conversionRate: 72,
    avatar: "/placeholder.svg",
  },
  {
    name: "David Thompson",
    sales: 8,
    revenue: 650000,
    target: 12,
    reservations: 4,
    conversionRate: 65,
    avatar: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    sales: 10,
    revenue: 850000,
    target: 14,
    reservations: 5,
    conversionRate: 70,
    avatar: "/placeholder.svg",
  },
]

const monthlyPerformance = [
  { month: "Jan", sarah: 3, emily: 2, david: 1, michael: 2 },
  { month: "Feb", sarah: 4, emily: 3, david: 2, michael: 3 },
  { month: "Mar", sarah: 5, emily: 4, david: 3, michael: 2 },
  { month: "Apr", sarah: 3, emily: 3, david: 2, michael: 3 },
]

interface AgentPerformanceProps {
  period: string
  site: string
}

export function AgentPerformance({ period, site }: AgentPerformanceProps) {
  const topPerformer = agentData.reduce((prev, current) => (prev.sales > current.sales ? prev : current))

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPerformer.name}</div>
            <p className="text-xs text-muted-foreground">{topPerformer.sales} sales this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentData.reduce((sum, agent) => sum + agent.sales, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agentData.reduce((sum, agent) => sum + agent.conversionRate, 0) / agentData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Lead to sale rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentData.length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Performance</CardTitle>
          <CardDescription>Sales comparison by agent over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sarah" fill="#1d4d71" name="Sarah Wilson" />
              <Bar dataKey="emily" fill="#ebc587" name="Emily Rodriguez" />
              <Bar dataKey="david" fill="#8b9dc3" name="David Thompson" />
              <Bar dataKey="michael" fill="#a8b5d1" name="Michael Chen" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Agent Performance Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {agentData.map((agent) => (
          <Card key={agent.name}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback>
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <CardDescription>Sales Agent</CardDescription>
                </div>
                {agent.sales >= agent.target && (
                  <Badge className="bg-green-100 text-green-800">
                    <Trophy className="mr-1 h-3 w-3" />
                    Target Met
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{agent.sales}</div>
                  <div className="text-sm text-muted-foreground">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{(agent.revenue / 1000).toFixed(0)}K ETB</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{agent.reservations}</div>
                  <div className="text-sm text-muted-foreground">Active Reservations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{agent.conversionRate}%</div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target Progress</span>
                  <span>
                    {agent.sales}/{agent.target}
                  </span>
                </div>
                <Progress value={(agent.sales / agent.target) * 100} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
