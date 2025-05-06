import type React from "react"
import { usePage, Link } from "@inertiajs/react"
import { ShoppingBag, ChevronRight, Package, Clock } from "lucide-react"

interface Order {
  id: number
  total_price: number
  created_at: string
  status?: string
  items_count?: number
}

export default function OrderIndex() {
  const { orders } = usePage().props as unknown as { orders: Order[] }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Helper function to get status badge
  const getStatusBadge = (status?: string) => {
    const statusMap: { [key: string]: { color: string; icon: React.ReactNode } } = {
      processing: {
        color: "bg-blue-100 text-blue-800",
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
      cancelled: {
        color: "bg-red-100 text-red-800",
        icon: <Clock className="h-3.5 w-3.5 mr-1" />,
      },
    }

    const orderStatus = status || "processing"
    const { color, icon } = statusMap[orderStatus.toLowerCase()] || statusMap.processing

    return (
      <div className={`${color} border-0 flex items-center px-2 py-1 rounded text-xs font-medium`}>
        {icon}
        {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>
        <Link href="/shop">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order) => {
            // Generate a random status for demo purposes
            const statuses = ["processing", "shipped", "delivered"]
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                      <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
                    </div>
                    {getStatusBadge(order.status || randomStatus)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-700">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${order.total_price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-700">Items</p>
                      <p className="text-gray-500">{order.items_count || "Multiple"} items</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 flex justify-between p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Estimated delivery:{" "}
                    {new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <Link href={`/user/orders/${order.id}`}>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link href="/shop">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
