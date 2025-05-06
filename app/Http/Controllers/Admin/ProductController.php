<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Models\OrderItem;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::withCount('orderItems')->get();

        return Inertia::render('admin/products/index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            'category' => 'required',
            'image' => 'required|url',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('admin/products/edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required',
            'price' => 'required|numeric',
            'description' => 'required',
            'category' => 'required',
            'image' => 'required|url',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully');
    }
}
