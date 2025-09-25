"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Users, Building, Calendar, BarChart3, Settings } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  icon: any
}

interface RolePermission {
  role: string
  permissions: {
    [key: string]: {
      view: boolean
      edit: boolean
      delete: boolean
      create: boolean
    }
  }
}

const permissions: Permission[] = [
  { id: "dashboard", name: "Dashboard", description: "View dashboard and analytics", icon: BarChart3 },
  { id: "properties", name: "Properties", description: "Manage property listings", icon: Building },
  { id: "users", name: "Users", description: "Manage user accounts", icon: Users },
  { id: "reservations", name: "Reservations", description: "Handle reservations and sales", icon: Calendar },
  { id: "reports", name: "Reports", description: "Generate and view reports", icon: BarChart3 },
  { id: "settings", name: "Settings", description: "System configuration", icon: Settings },
]

const defaultRolePermissions: RolePermission[] = [
  {
    role: "admin",
    permissions: {
      dashboard: { view: true, edit: true, delete: true, create: true },
      properties: { view: true, edit: true, delete: true, create: true },
      users: { view: true, edit: true, delete: true, create: true },
      reservations: { view: true, edit: true, delete: true, create: true },
      reports: { view: true, edit: true, delete: true, create: true },
      settings: { view: true, edit: true, delete: true, create: true },
    },
  },
  {
    role: "sales-agent",
    permissions: {
      dashboard: { view: true, edit: false, delete: false, create: false },
      properties: { view: true, edit: true, delete: false, create: false },
      users: { view: false, edit: false, delete: false, create: false },
      reservations: { view: true, edit: true, delete: false, create: true },
      reports: { view: true, edit: false, delete: false, create: false },
      settings: { view: false, edit: false, delete: false, create: false },
    },
  },
  {
    role: "finance-manager",
    permissions: {
      dashboard: { view: true, edit: false, delete: false, create: false },
      properties: { view: true, edit: false, delete: false, create: false },
      users: { view: true, edit: false, delete: false, create: false },
      reservations: { view: true, edit: true, delete: false, create: false },
      reports: { view: true, edit: true, delete: false, create: true },
      settings: { view: false, edit: false, delete: false, create: false },
    },
  },
  {
    role: "external-agent",
    permissions: {
      dashboard: { view: true, edit: false, delete: false, create: false },
      properties: { view: true, edit: false, delete: false, create: false },
      users: { view: false, edit: false, delete: false, create: false },
      reservations: { view: true, edit: false, delete: false, create: true },
      reports: { view: false, edit: false, delete: false, create: false },
      settings: { view: false, edit: false, delete: false, create: false },
    },
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

interface RolePermissionsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RolePermissions({ open, onOpenChange }: RolePermissionsProps) {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(defaultRolePermissions)
  const [selectedRole, setSelectedRole] = useState("admin")

  const currentRolePermissions = rolePermissions.find((rp) => rp.role === selectedRole)

  const updatePermission = (permissionId: string, action: string, value: boolean) => {
    setRolePermissions((prev) =>
      prev.map((rp) =>
        rp.role === selectedRole
          ? {
              ...rp,
              permissions: {
                ...rp.permissions,
                [permissionId]: {
                  ...rp.permissions[permissionId],
                  [action]: value,
                },
              },
            }
          : rp,
      ),
    )
  }

  const handleSave = () => {
    // Here you would typically save the role permissions
    console.log("Saving role permissions:", rolePermissions)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permissions
          </DialogTitle>
          <DialogDescription>Configure permissions for each user role in the system.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role Selector */}
          <div className="flex gap-2">
            {Object.entries(roleConfig).map(([role, config]) => (
              <Button
                key={role}
                variant={selectedRole === role ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRole(role)}
              >
                <Badge className={config.color}>{config.label}</Badge>
              </Button>
            ))}
          </div>

          {/* Permissions Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Permissions for {roleConfig[selectedRole as keyof typeof roleConfig].label}
            </h3>
            {permissions.map((permission) => (
              <Card key={permission.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <permission.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-base">{permission.name}</CardTitle>
                      <CardDescription>{permission.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {["view", "create", "edit", "delete"].map((action) => (
                      <div key={action} className="flex items-center space-x-2">
                        <Switch
                          id={`${permission.id}-${action}`}
                          checked={currentRolePermissions?.permissions[permission.id]?.[action] || false}
                          onCheckedChange={(checked) => updatePermission(permission.id, action, checked)}
                        />
                        <Label htmlFor={`${permission.id}-${action}`} className="capitalize">
                          {action}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Permissions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
