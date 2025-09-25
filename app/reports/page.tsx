import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ReportsModule } from "@/components/reports/reports-module"

export default function ReportsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ReportsModule />
        </main>
      </div>
    </div>
  )
}
