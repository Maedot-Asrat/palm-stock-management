import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { StockDashboard } from "@/components/dashboard/stock-dashboard"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <StockDashboard />
        </main>
      </div>
    </div>
  )
}
