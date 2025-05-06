import { usePage, Link } from "@inertiajs/react"
import { Star } from "lucide-react"
import UserLayout from "../layouts/user-layout"

interface Product {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
    reviews_count?: number
    reviews_avg_rating?: number
}

export default function ProductIndex() {
  const { products = [] } = usePage().props as Partial<{ products: Product[] }>

  return (
    <UserLayout title="Shop Our Products">
      <div className="container mx-auto px-4">
        <p className="text-gray-600 mb-8">Discover our quality selection of products</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md flex flex-col h-full"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                  {product.category}
                </div>
              </div>

              <div className="flex-1 p-5 flex flex-col">
                <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                    <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.reviews_avg_rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
                <span className="text-xs text-gray-500 ml-2">
                    {Number(product.reviews_avg_rating ?? 0).toFixed(2) || "0.0"} ({product.reviews_count ?? 0} reviews)
                </span>
                </div>

                <h3 className="font-semibold text-lg line-clamp-1 mb-1 text-gray-900">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-2">
                  {product.description || "No description available."}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <Link href={`/products/${product.id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            View Details
                        </button>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
