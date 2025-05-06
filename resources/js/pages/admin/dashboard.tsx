"use client"

import { Link } from "@inertiajs/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingBag } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your products and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products</CardTitle>
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Manage your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add, edit, and delete products. Update product details, pricing, and inventory levels.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/products" className="w-full">
              <Button className="w-full">Go to Products</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Orders</CardTitle>
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>Manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View and process customer orders. Track order status and manage fulfillment.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/orders" className="w-full">
              <Button className="w-full">Go to Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
