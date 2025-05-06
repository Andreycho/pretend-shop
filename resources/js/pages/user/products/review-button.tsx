"use client"

import type React from "react"

import { useState } from "react"
import { Star, X } from "lucide-react"
import { router } from "@inertiajs/react"

interface ReviewButtonProps {
  productId: number
  isFirstReview?: boolean
}

export default function ReviewButton({ productId, isFirstReview = false }: ReviewButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    router.post(
      `/products/${productId}/review`,
      {
        rating,
        comment,
      },
      {
        onSuccess: () => {
          setShowModal(false)
          setRating(5)
          setComment("")
          setIsSubmitting(false)
        },
        onError: () => {
          setIsSubmitting(false)
        },
      },
    )
  }

  return (
    <>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        onClick={() => setShowModal(true)}
      >
        {isFirstReview ? "Be the first to write a review" : "Write a Review"}
      </button>

      {/* Review Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Write a Review</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
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
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
