<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Product;

class ReviewController extends Controller
{
    public function store(Request $request, $productId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string',
        ]);

        $existingReview = Review::where('user_id', auth()->id())
            ->where('product_id', $productId)
            ->first();

        if ($existingReview) {
            $existingReview->rating = $validated['rating'];
            $existingReview->comment = $validated['comment'] ?? '';
            $existingReview->save();
            
            return back()->with('message', 'Review updated successfully!');
        } else {
            $review = new Review([
                'user_id' => auth()->id(),
                'product_id' => $productId,
                'rating' => $validated['rating'],
                'comment' => $validated['comment'] ?? '',
            ]);

            $review->save();
            return back()->with('message', 'Review submitted successfully!');
        }
    }
}
