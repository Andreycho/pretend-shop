"use client"

import { usePage, Link } from "@inertiajs/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronLeft, Calendar, User, Package, CreditCard } from "lucide-react"

interface Product {
  title: string
}

interface OrderItem {
  id: number
  product: Product
  quantity: number
  unit_price: number
}

interface Order {
  id: number
  customer_name: string
  created_at: string
  order_items: OrderItem[]
  total_price: number
  status: string
}

export default function Show() {
  const { order } = usePage().props as unknown as { order: Order }

  const total = order.total_price || order.order_items.reduce((sum, item) => sum + Number(item.unit_price) * item.quantity, 0)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Order #{order.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Order #{order.id}</h1>
            <p className="text-muted-foreground mt-1">Order details and line items</p>
          </div>

          <Link href="/admin/orders" className="inline-flex items-center text-sm mb-6 hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
        </div>

        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Order information and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm text-muted-foreground">{order.customer_name || "Guest"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Items</p>
                  <p className="text-sm text-muted-foreground">{order.order_items.length} products</p>
                </div>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-sm font-bold">${Number(total).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Products purchased in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.order_items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product.title}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${Number(item.unit_price).toFixed(2)}</TableCell>
                  <TableCell className="text-right font-mono">
                    ${Number(item.unit_price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end border-t p-4">
          <div className="text-right space-y-1">
            <div className="flex justify-between w-[250px]">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">${Number(total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-[250px]">
              <span className="text-muted-foreground">Tax:</span>
              <span className="font-medium">${Number(total * 0.0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-[250px] text-lg font-bold border-t pt-2 mt-2">
              <span>Total:</span>
              <span>${Number(total).toFixed(2)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
