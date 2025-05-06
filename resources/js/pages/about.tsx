import UserLayout from "../pages/user/layouts/user-layout"
import { Users, Award, Clock, Heart, ShieldCheck, Truck } from "lucide-react"

export default function About() {
  return (
    <UserLayout title="About Us">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2025, Pretend Shop started with a simple mission: to provide high-quality products at
              affordable prices with exceptional customer service. What began as a small online store run from a garage
              has grown into a thriving e-commerce business serving customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Jane Smith, noticed a gap in the market for affordable yet high-quality products that didn't
              compromise on style or functionality. With an initial investment and a lot of determination, she launched
              Pretend Shop with just 10 products. Today, we offer over 1,000 products across multiple categories.
            </p>
            <p className="text-gray-600">
              As we've grown, our commitment to quality, affordability, and customer satisfaction has remained
              unwavering. We're proud of how far we've come and excited about where we're headed.
            </p>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Mission & Values</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Mission Statement</h3>
              <p className="text-gray-600 italic">
                "To provide exceptional products that enhance everyday life, delivered with outstanding service at
                prices everyone can afford."
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                <p className="text-gray-600">
                  We put our customers at the heart of everything we do, striving to exceed expectations at every
                  touchpoint.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality & Integrity</h3>
                <p className="text-gray-600">
                  We stand behind every product we sell and conduct business with honesty, transparency, and ethical
                  practices.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We continuously seek new ways to improve our products, services, and operations to better serve our
                  customers.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Choose Pretend Shop?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex">
                <div className="mr-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                  <p className="text-gray-600">
                    All our products undergo rigorous quality testing before they reach you. We stand behind everything
                    we sell with our satisfaction guarantee.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex">
                <div className="mr-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
                  <p className="text-gray-600">
                    We offer quick processing and shipping times, with most orders shipped within 24 hours and delivered
                    within 3-5 business days.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex">
                <div className="mr-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Exceptional Service</h3>
                  <p className="text-gray-600">
                    Our customer service team is available 7 days a week to answer questions, solve problems, and ensure
                    your complete satisfaction.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex">
                <div className="mr-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                  <p className="text-gray-600">
                    Not satisfied? We offer hassle-free returns within 30 days of purchase, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
