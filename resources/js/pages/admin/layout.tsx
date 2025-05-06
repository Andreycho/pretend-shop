"use client"

import type React from "react"

import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, Menu, X } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const currentPath = usePage().url

  const isActive = (path: string) => {
    return currentPath.startsWith(path)
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, active: currentPath === "/admin" },
    { name: "Products", href: "/admin/products", icon: ShoppingBag, active: isActive("/admin/products") },
    { name: "Orders", href: "/admin/orders", icon: Package, active: isActive("/admin/orders") },
  ]

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault()

    const form = document.createElement("form")
    form.method = "POST"
    form.action = "/logout"

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    if (csrfToken) {
      const csrfInput = document.createElement("input")
      csrfInput.type = "hidden"
      csrfInput.name = "_token"
      csrfInput.value = csrfToken
      form.appendChild(csrfInput)
    }

    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/admin" className="text-xl font-bold">
            Admin Panel
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                item.active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full border-t p-4">
          <Link
            href="/logout"
            method="post"
            as="button"
            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
