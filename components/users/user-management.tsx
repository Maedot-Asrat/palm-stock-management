"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Shield, UserCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserDialog } from "./user-dialog"
import { RolePermissions } from "./role-permissions"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "sales-agent" | "finance-manager" | "external-agent"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  avatar?: string
  phone: string
  joinDate: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@palmrealestate.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 10:30 AM",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@palmrealestate.com",
    role: "sales-agent",
    status: "active",
    lastLogin: "2024-01-15 09:15 AM",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-03-20",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@palmrealestate.com",
    role: "finance-manager",
    status: "active",
    lastLogin: "2024-01-14 04:45 PM",
    phone: "+1 (555) 345-6789",
    joinDate: "2023-02-10",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@external.com",
    role: "external-agent",
    status: "active",
    lastLogin: "2024-01-15 08:20 AM",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-06-05",
  },
  {
    id: "5",
    name: "David Thompson",
    email: "david.thompson@palmrealestate.com",
    role: "sales-agent",
    status: "inactive",
    lastLogin: "2024-01-10 02:30 PM",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-04-12",
  },
]

const roleConfig = {
  admin: { label: "Admin", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  "sales-agent": { label: "Sales Agent", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  "finance-manager": {
    label: "Finance Manager",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  "external-agent": {
    label: "External Agent",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
}

const statusConfig = {
  active: { label: "Active", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
  inactive: { label: "Inactive", color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" },
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showRolePermissions, setShowRolePermissions] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleAddUser = () => {
    setSelectedUser(null)
    setShowUserDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">User Management</h1>
          <p className="text-muted-foreground text-pretty">Manage user accounts and role-based permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowRolePermissions(true)}>
            <Shield className="mr-2 h-4 w-4" />
            Role Permissions
          </Button>
          <Button onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.filter((u) => u.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Agents</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "sales-agent").length}</div>
            <p className="text-xs text-muted-foreground">Internal & external</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.filter((u) => u.role === "admin").length}</div>
            <p className="text-xs text-muted-foreground">Full access</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter users by role and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="sales-agent">Sales Agent</SelectItem>
                <SelectItem value="finance-manager">Finance Manager</SelectItem>
                <SelectItem value="external-agent">External Agent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={roleConfig[user.role].color}>{roleConfig[user.role].label}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Joined {user.joinDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={statusConfig[user.status].color}>{statusConfig[user.status].label}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Last login: {user.lastLogin}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <UserDialog
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
        user={selectedUser}
        onSave={() => setShowUserDialog(false)}
      />
      <RolePermissions open={showRolePermissions} onOpenChange={setShowRolePermissions} />
    </div>
  )
}
