"use client"

import type React from "react"

import { usePage, Link, router } from "@inertiajs/react"
import { Star, ShoppingCart, Heart, ArrowLeft, X, Check, Minus, Plus, Edit } from "lucide-react"
import UserLayout from "../layouts/user-layout"
import { useState } from "react"

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  reviews: Review[]
}

interface Review {
  id: number
  user: {
    name: string
    id: number
  }
  rating: number
  comment: string
  created_at?: string
}

export default function ProductShow() {
  const { product, flash, auth } = usePage().props as unknown as {
    product: Product
    flash?: { message?: string; type?: string }
    auth: { user: { id: number } }
  }

  const userReview = product.reviews.find((review) => review.user.id === auth.user.id)

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [rating, setRating] = useState(userReview ? userReview.rating : 5)
  const [comment, setComment] = useState(userReview ? userReview.comment : "")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [showCartNotification, setShowCartNotification] = useState(false)

  // Calculate average rating
  const avgRating = product.reviews.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0

  // Filter out the user's review from other reviews
  const otherReviews = product.reviews.filter((review) => review.user.id !== auth.user.id)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    router.post(
      `/products/${product.id}/review`,
      {
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setShowReviewModal(false)
          setIsSubmitting(false)
        },
        onError: () => {
          setIsSubmitting(false)
        },
      },
    )
  }

  const handleAddToCart = () => {
    setAddingToCart(true)

    router.post(
      `/cart/add`,
      {
        product_id: product.id,
        quantity: quantity,
      },
      {
        onSuccess: () => {
          setAddingToCart(false)
          setShowCartNotification(true)

          setTimeout(() => {
            setShowCartNotification(false)
          }, 3000)
        },
        onError: () => {
          setAddingToCart(false)
        },
      },
    )
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const openReviewModal = () => {
    if (userReview) {
      setRating(userReview.rating)
      setComment(userReview.comment)
    }
    setShowReviewModal(true)
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4">
        {flash?.message && (
          <div
            className={`${flash.type === "error" ? "bg-red-100 border-red-400 text-red-700" : "bg-green-100 border-green-400 text-green-700"} px-4 py-3 rounded mb-6 flex justify-between items-center`}
          >
            <span>{flash.message}</span>
            <button
              onClick={() => router.reload()}
              className={flash.type === "error" ? "text-red-700" : "text-green-700"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Cart notification */}
        {showCartNotification && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-center z-50">
            <Check className="h-5 w-5 mr-2" />
            <span>Added to cart successfully!</span>
          </div>
        )}

        <Link href="/" className="inline-flex items-center text-sm mb-6 hover:underline text-blue-600">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl overflow-hidden border relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-[400px] object-contain p-4"
            />
          </div>

          <div className="flex flex-col">
            <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium mb-2">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.title}</h1>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {avgRating.toFixed(2)} ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold mb-6 text-gray-900">${product.price}</div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="border-t border-b border-gray-300 p-2 w-16 text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={incrementQuantity}
                  className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {userReview && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">My Review</h2>
              <button onClick={openReviewModal} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Edit Review
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-gray-900">
                    {userReview.user.name} <span className="text-blue-600">(You)</span>
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < userReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {userReview.created_at ? new Date(userReview.created_at).toLocaleDateString() : "Recently"}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{userReview.comment}</p>
            </div>
          </div>
        )}

        {/* Other Reviews Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{userReview ? "Other Reviews" : "Customer Reviews"}</h2>
            {!userReview && (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={openReviewModal}
              >
                Write a Review
              </button>
            )}
          </div>

          {otherReviews.length > 0 ? (
            <div className="space-y-6">
              {otherReviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{review.user.name}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Recently"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {userReview
                  ? "There are no other reviews for this product yet."
                  : "There are currently no reviews for this product."}
              </p>
              {!userReview && (
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={openReviewModal}
                >
                  Be the first to write a review
                </button>
              )}
            </div>
          )}
        </div>

        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold text-gray-900">
                  {userReview ? "Edit Your Review" : "Write a Review"}
                </h3>
                <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="p-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            (hoveredRating ? star <= hoveredRating : star <= rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600">{hoveredRating || rating} out of 5</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    rows={4}
                    placeholder="Share your experience with this product..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : userReview ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
