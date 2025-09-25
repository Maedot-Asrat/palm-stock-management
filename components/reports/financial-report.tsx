"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { DollarSign, TrendingUp, CreditCard, Banknote } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 1850000, deposits: 185000, commissions: 92500 },
  { month: "Feb", revenue: 2100000, deposits: 210000, commissions: 105000 },
  { month: "Mar", revenue: 2450000, deposits: 245000, commissions: 122500 },
  { month: "Apr", revenue: 2200000, deposits: 220000, commissions: 110000 },
  { month: "May", revenue: 2650000, deposits: 265000, commissions: 132500 },
  { month: "Jun", revenue: 2800000, deposits: 280000, commissions: 140000 },
]

const paymentMethodData = [
  { name: "Bank Transfer", value: 65, color: "#1d4d71" },
  { name: "Cash", value: 25, color: "#ebc587" },
  { name: "Financing", value: 10, color: "#8b9dc3" },
]

const outstandingPayments = [
  { client: "Alice Johnson", unit: "A101", amount: 45000, dueDate: "2024-01-20", status: "overdue" },
  { client: "Robert Chen", unit: "P201", amount: 85000, dueDate: "2024-01-25", status: "pending" },
  { client: "Maria Garcia", unit: "S102", amount: 16000, dueDate: "2024-01-30", status: "pending" },
]

interface FinancialReportProps {
  period: string
  site: string
}

export function FinancialReport({ period, site }: FinancialReportProps) {
  const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0)
  const totalDeposits = revenueData.reduce((sum, month) => sum + month.deposits, 0)
  const totalCommissions = revenueData.reduce((sum, month) => sum + month.commissions, 0)

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalRevenue / 1000000).toFixed(1)}M ETB</div>
            <p className="text-xs text-muted-foreground">+12.5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deposits Collected</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalDeposits / 1000).toFixed(0)}K ETB</div>
            <p className="text-xs text-muted-foreground">10% of total sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commissions Paid</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalCommissions / 1000).toFixed(0)}K ETB</div>
            <p className="text-xs text-muted-foreground">5% of total sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {outstandingPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()} ETB
            </div>
            <p className="text-xs text-muted-foreground">{outstandingPayments.length} pending payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue, deposits, and commission breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`$${(value / 1000).toFixed(0)}K`, ""]} />
              <Line type="monotone" dataKey="revenue" stroke="#1d4d71" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="deposits" stroke="#ebc587" strokeWidth={2} name="Deposits" />
              <Line type="monotone" dataKey="commissions" stroke="#8b9dc3" strokeWidth={2} name="Commissions" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Outstanding Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Outstanding Payments</CardTitle>
            <CardDescription>Pending and overdue payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {outstandingPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{payment.client}</h4>
                  <p className="text-sm text-muted-foreground">Unit {payment.unit}</p>
                  <p className="text-xs text-muted-foreground">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{payment.amount.toLocaleString()} ETB</p>
                  <Badge
                    className={
                      payment.status === "overdue" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Key financial metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Average Sale Price</h3>
              <p className="text-2xl font-bold text-primary">5,200,000 ETB</p>
              <p className="text-sm text-muted-foreground">+8% from last period</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Collection Rate</h3>
              <p className="text-2xl font-bold text-green-600">94%</p>
              <p className="text-sm text-muted-foreground">On-time payments</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Profit Margin</h3>
              <p className="text-2xl font-bold text-secondary">35%</p>
              <p className="text-sm text-muted-foreground">After all expenses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
