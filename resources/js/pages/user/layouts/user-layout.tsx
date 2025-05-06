"use client"

import type React from "react"
import { useEffect } from "react"
import { Link, router } from "@inertiajs/react"
import { ShoppingCart, User, Package, LogOut } from "lucide-react"

interface UserLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function UserLayout({ children, title = "Shop" }: UserLayoutProps) {
  useEffect(() => {
    document.documentElement.classList.remove("dark")

    document.body.classList.add("user-pages")

    return () => {
      document.body.classList.remove("user-pages")
    }
  }, [])

  const handleSignOut = () => {
    router.post("/logout")
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              Pretend Shop
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Products
              </Link>
              <Link href="/about" className="hover:text-blue-200 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-blue-200 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/user/orders" className="hover:text-blue-200 transition-colors">
                <Package className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="hover:text-blue-200 transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link href="/profile" className="hover:text-blue-200 transition-colors">
                <User className="h-6 w-6" />
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center hover:text-blue-200 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6">
        {title && (
          <div className="container mx-auto px-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        )}
        {children}
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Shop</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/shop" className="hover:text-blue-600">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/new-arrivals" className="hover:text-blue-600">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/best-sellers" className="hover:text-blue-600">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="/sale" className="hover:text-blue-600">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Customer Service</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-blue-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-blue-600">
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/warranty" className="hover:text-blue-600">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="hover:text-blue-600">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900">Stay Connected</h3>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and promotions.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent flex-1"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} Pretend Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add global styles to override dark mode */}
      <style>{`
        .user-pages {
          color: #111827 !important; /* text-gray-900 */
          background-color: white !important;
        }
        
        .user-pages * {
          --tw-text-opacity: 1 !important;
        }
        
        /* Override any dark mode specific styles */
        html.dark .user-pages {
          background-color: white !important;
          color: #111827 !important;
        }
      `}</style>
    </div>
  )
}
