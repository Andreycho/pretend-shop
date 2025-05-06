import { usePage, Link } from "@inertiajs/react"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, ShoppingBag } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  image?: string
  quantity?: number
}

interface Order {
  id: number
  total_price: number
  created_at: string
  products: Product[]
  status?: string
  shipping_address?: string
  payment_method?: string
}

export default function OrderShow() {
  const { order } = usePage().props as unknown as { order: Order }

  // For demo purposes, let's assume a status if not provided
  const orderStatus = order.status || "processing"

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

  // Order timeline steps
  const steps = [
    { id: "placed", label: "Order Placed", icon: <Clock className="h-5 w-5" />, date: formatDate(order.created_at) },
    { id: "processing", label: "Processing", icon: <Package className="h-5 w-5" />, date: "In progress" },
    { id: "shipped", label: "Shipped", icon: <Truck className="h-5 w-5" />, date: "Pending" },
    { id: "delivered", label: "Delivered", icon: <CheckCircle className="h-5 w-5" />, date: "Pending" },
  ]

  // Determine current step
  const currentStepIndex = ["placed", "processing", "shipped", "delivered"].indexOf(orderStatus)

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/user/orders" className="inline-flex items-center text-sm mb-6 hover:underline text-blue-600">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Orders
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                  <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
                </div>
                <div
                  className={`
                    ${orderStatus === "processing" ? "bg-blue-100 text-blue-800" : ""}
                    ${orderStatus === "shipped" ? "bg-amber-100 text-amber-800" : ""}
                    ${orderStatus === "delivered" ? "bg-green-100 text-green-800" : ""}
                    ${orderStatus === "cancelled" ? "bg-red-100 text-red-800" : ""}
                    px-2 py-1 rounded text-xs font-medium
                  `}
                >
                  {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="relative">
                <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-300"></div>
                <ol className="relative space-y-6">
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex
                    const isCurrent = index === currentStepIndex

                    return (
                      <li key={step.id} className="relative pl-10">
                        <div
                          className={`
                          absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border 
                          ${
                            isCompleted
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-gray-100 border-gray-300 text-gray-500"
                          }
                          ${isCurrent ? "ring-2 ring-offset-2 ring-blue-600" : ""}
                        `}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{step.label}</h3>
                          <p className="text-sm text-gray-500">{step.date}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
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
                      <p className="text-sm text-gray-500">Quantity: {product.quantity || 1}</p>
                    </div>

                    <div className="ml-4 text-right">
                      <div className="font-medium text-gray-900">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        ${((product.quantity || 1) * product.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}

                <hr className="my-4 border-gray-200" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${order.total_price.toFixed(2)}</span>
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
                    <span className="text-gray-900">${order.total_price.toFixed(2)}</span>
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
                <p className="text-gray-600">{order.id}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-gray-900">Order Date</h3>
                <p className="text-gray-600">{formatDate(order.created_at)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1 text-gray-900">Payment Method</h3>
                <p className="text-gray-600">{order.payment_method || "Credit Card"}</p>
              </div>
              {order.shipping_address && (
                <div>
                  <h3 className="font-medium mb-1 text-gray-900">Shipping Address</h3>
                  <p className="text-gray-600 whitespace-pre-line">{order.shipping_address}</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                Download Invoice
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Need Help?</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                If you have any questions or concerns about your order, please contact our customer support.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
