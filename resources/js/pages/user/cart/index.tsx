"use client"

import { usePage, Link, router } from "@inertiajs/react"
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from "lucide-react"
import UserLayout from "../layouts/user-layout"
import { useState } from "react"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
  subtotal: number
}

export default function CartIndex() {
  const {
    cartItems = [],
    total = 0,
    flash,
  } = usePage().props as unknown as {
    cartItems: CartItem[]
    total: number
    flash?: { message?: string }
  }

  const [quantities, setQuantities] = useState<Record<number, number>>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {}),
  )

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    setQuantities((prev) => ({ ...prev, [id]: quantity }))

    router.post("/cart/update", {
      product_id: id,
      quantity,
    })
  }

  const removeItem = (id: number) => {
    router.delete(`/cart/remove/${id}`)
  }

  const clearCart = () => {
    router.post("/cart/clear")
  }

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      return
    }

    router.post(
      "/cart/checkout",
      {},
      {
        onSuccess: () => {
          // The redirect will be handled by the controller
        },
      },
    )
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link href="/" className="text-blue-600 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
        </div>

        {flash?.message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {flash.message}
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items ({cartItems.length})</h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>

                      <div className="flex items-center ml-4">
                        <button
                          onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                          className="border border-gray-300 rounded-l-md p-1 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantities[item.id]}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="border-t border-b border-gray-300 p-1 w-12 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                          className="border border-gray-300 rounded-r-md p-1 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="ml-4 text-right">
                        <p className="text-base font-medium text-gray-900">${item.subtotal}</p>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end">
                  <button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-4">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">Free</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total}</span>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={proceedToCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
