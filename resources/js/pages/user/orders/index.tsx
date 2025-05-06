"use client"

import type React from "react"

import { usePage, Link } from "@inertiajs/react"
import { ShoppingBag, ChevronRight, Package, Clock, ShoppingCart } from "lucide-react"
import UserLayout from "../layouts/user-layout"

interface Order {
  id: number
  total_price: number
  created_at: string
  status: string
  items_count: number
}

export default function UserOrders() {
  const { orders } = usePage().props as unknown as { orders: Order[] }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { color: string; icon: React.ReactNode } } = {
      pending: {
        color: "bg-gray-100 text-gray-800",
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      },
      shipped: {
        color: "bg-amber-100 text-amber-800",
        icon: <Package className="h-3.5 w-3.5 mr-1" />,
      },
      delivered: {
        color: "bg-green-100 text-green-800",
        icon: <ShoppingBag className="h-3.5 w-3.5 mr-1" />,
      },
    }

    const orderStatus = status.toLowerCase()
    const { color, icon } = statusMap[orderStatus] || statusMap.processing

    return (
      <div className={`${color} flex items-center px-2 py-1 rounded text-xs font-medium`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    )
  }

  return (
    <UserLayout title="My Orders">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-8">View and track all your orders in one place.</p>

          {orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                        <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-700">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">${Number(order.total_price).toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-700">Items</p>
                        <p className="text-gray-500">{order.items_count} items</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 flex justify-between p-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Estimated delivery:{" "}
                      {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                    <Link href={`/orders/${order.id}`}>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold mb-2 text-gray-900">No Orders Yet</h2>
              <p className="text-gray-500 mb-6">You haven't made any purchases yet.</p>
              <Link href="/">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
