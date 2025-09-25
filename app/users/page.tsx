import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { UserManagement } from "@/components/users/user-management"

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <UserManagement />
        </main>
      </div>
    </div>
  )
}
