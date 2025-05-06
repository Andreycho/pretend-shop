"use client"

import { type FormEvent, useState, useEffect } from "react"
import { router } from "@inertiajs/react"
import { ShoppingBag, Plus, Minus } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  image?: string
  category?: string
}

interface PageProps {
  products: Product[]
}

export default function OrderCreate({ products }: PageProps) {
  const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: number }>({})
  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate total price whenever selected products change
  useEffect(() => {
    const total = Object.entries(selectedProducts).reduce((sum, [id, quantity]) => {
      const product = products.find((p) => p.id === Number.parseInt(id))
      return sum + (product?.price || 0) * quantity
    }, 0)
    setTotalPrice(total)
  }, [selectedProducts, products])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Convert to array of product IDs with quantities
    const orderProducts = Object.entries(selectedProducts)
      .map(([id, quantity]) => ({
        id: Number.parseInt(id),
        quantity,
      }))
      .filter((item) => item.quantity > 0)

    router.post("/user/orders", {
      products: orderProducts,
      total_price: totalPrice,
    })
  }

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) => {
      const newSelected = { ...prev }
      if (newSelected[id]) {
        delete newSelected[id]
      } else {
        newSelected[id] = 1
      }
      return newSelected
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts((prev) => {
        const newSelected = { ...prev }
        delete newSelected[id]
        return newSelected
      })
    } else {
      setSelectedProducts((prev) => ({
        ...prev,
        [id]: quantity,
      }))
    }
  }

  const selectedCount = Object.values(selectedProducts).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Your Order</h1>
        <p className="text-gray-600 mt-1">Select products to add to your order</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className={`overflow-hidden transition-colors bg-white border rounded-lg ${
                  selectedProducts[product.id] ? "border-blue-600" : "border-gray-200"
                }`}
              >
                <div className="flex items-center p-4">
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
                    <h3 className="font-medium text-lg truncate text-gray-900">{product.title}</h3>
                    {product.category && (
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium mt-1">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="ml-4 flex flex-col items-end">
                    <div className="font-bold text-gray-900">${product.price.toFixed(2)}</div>

                    {selectedProducts[product.id] ? (
                      <div className="flex items-center mt-2">
                        <button
                          className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-3 font-medium">{selectedProducts[product.id]}</span>
                        <button
                          className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          onClick={() => updateQuantity(product.id, (selectedProducts[product.id] || 0) + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="mt-2 border border-gray-300 hover:bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm"
                        onClick={() => toggleProduct(product.id)}
                      >
                        Add to Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              <p className="text-sm text-gray-600">
                {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
              </p>
            </div>
            <div className="p-4">
              {Object.keys(selectedProducts).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(selectedProducts).map(([id, quantity]) => {
                    const product = products.find((p) => p.id === Number.parseInt(id))
                    if (!product) return null

                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="flex-1 text-gray-800">
                          {product.title} <span className="text-gray-500">x{quantity}</span>
                        </span>
                        <span className="font-medium text-gray-900">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    )
                  })}

                  <hr className="border-gray-200" />

                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Your order is empty</p>
                  <p className="text-sm mt-1">Select products to add them to your order</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Object.keys(selectedProducts).length === 0}
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
