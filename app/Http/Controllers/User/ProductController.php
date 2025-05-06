<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
{
    // $products = Product::select('id', 'title', 'price', 'image', 'category', 'description')->get();
    $products = Product::withCount('reviews')
        ->withAvg('reviews', 'rating')
        ->get();

    return Inertia::render('user/products/index', [
        'products' => $products
    ]);
}

public function show($id)
{
    $product = Product::with(['reviews.user'])->findOrFail($id);
    return Inertia::render('user/products/show', [
        'product' => $product
    ]);
}
}
