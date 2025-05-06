"use client"

import { usePage, Link } from "@inertiajs/react"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import UserLayout from "../layouts/user-layout"

interface Product {
  id: number
  title: string
  price: number
  image?: string
  quantity: number
}

interface Order {
  id: number
  total_price: number
  created_at: string
  products: Product[]
  shipping_address?: string
}

export default function OrderDetail() {
  const { order } = usePage().props as unknown as { order: Order }

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

  return (
    <UserLayout title={`Order #${order.id}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/orders" className="inline-flex items-center text-sm mb-6 hover:underline text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Order Information</h2>
                      <p className="text-sm text-gray-500">Processed on {formatDate(order.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                  <p className="text-sm text-gray-500">
                    {order.products.length} {order.products.length === 1 ? "item" : "items"} in your order
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex items-center py-2">
                        <div className="flex-shrink-0 mr-4">
                          {product.image ? (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate text-gray-900">{product.title}</h3>
                          <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                        </div>

                        <div className="ml-4 text-right">
                          <div className="font-medium text-gray-900">${Number(product.price).toFixed(2)}</div>
                          <div className="text-sm text-gray-500">
                            ${Number(product.quantity * product.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr className="my-4 border-gray-200" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">${Number(order.total_price).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900">Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">Included</span>
                      </div>
                      <hr className="my-2 border-gray-200" />
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">${Number(order.total_price).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-1 text-gray-900">Order Number</h3>
                    <p className="text-gray-600">#{order.id}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-gray-900">Order Date</h3>
                    <p className="text-gray-600">{formatDate(order.created_at)}</p>
                  </div>
                  {order.shipping_address && (
                    <div>
                      <h3 className="font-medium mb-1 text-gray-900">Shipping Address</h3>
                      <p className="text-gray-600 whitespace-pre-line">{order.shipping_address}</p>
                    </div>
                  )}
                </div>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
