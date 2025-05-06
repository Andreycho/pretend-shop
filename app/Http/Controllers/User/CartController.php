<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Order;

class CartController extends Controller
{
    /**
     * Display the cart contents.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $cart = session()->get('cart', []);
        $cartItems = [];
        $total = 0;

        foreach ($cart as $id => $details) {
            $product = Product::find($id);
            if ($product) {
                $cartItems[] = [
                    'id' => $id,
                    'title' => $product->title,
                    'price' => $product->price,
                    'quantity' => $details['quantity'],
                    'image' => $product->image,
                    'subtotal' => $product->price * $details['quantity']
                ];
                $total += $product->price * $details['quantity'];
            }
        }

        return Inertia::render('user/cart/index', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::find($request->product_id);
        
        if (!$product) {
            return back()->with([
                'message' => 'Product not found.',
                'type' => 'error'
            ]);
        }

        $cart = session()->get('cart', []);
        
        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity'] += $request->quantity;
        } else {
            $cart[$request->product_id] = [
                'quantity' => $request->quantity,
                'price' => $product->price
            ];
        }
        
        session()->put('cart', $cart);
        
        return back()->with([
            'message' => 'Product added to cart successfully!',
            'type' => 'success'
        ]);
    }

    /**
     * Update the quantity of a cart item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart', []);
        
        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity'] = $request->quantity;
            session()->put('cart', $cart);
        }
        
        return back()->with('message', 'Cart updated successfully!');
    }

    /**
     * Remove an item from the cart.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function remove($id)
    {
        $cart = session()->get('cart', []);
        
        if (isset($cart[$id])) {
            unset($cart[$id]);
            session()->put('cart', $cart);
        }
        
        return back()->with('message', 'Product removed from cart!');
    }

    /**
     * Clear the entire cart.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function clear()
    {
        session()->forget('cart');
        
        return back()->with('message', 'Cart cleared successfully!');
    }

    /**
     * Process the checkout and create an order.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function checkout()
    {
        $cart = session()->get('cart', []);
        
        if (empty($cart)) {
            return redirect()->route('user.cart.index')->with([
                'message' => 'Your cart is empty.',
                'type' => 'error'
            ]);
        }
        
        $total = 0;
        $orderItems = [];
        
        foreach ($cart as $id => $details) {
            $product = Product::find($id);
            if ($product) {
                $subtotal = $product->price * $details['quantity'];
                $total += $subtotal;
                
                $orderItems[] = [
                    'product_id' => $id,
                    'quantity' => $details['quantity'],
                    'unit_price' => $product->price
                ];
            }
        }
        
        $order = Order::create([
            'user_id' => auth()->id(),
            // 'user_id' => 1,
            'total_price' => $total,
            'status' => 'pending'
        ]);
        
        foreach ($orderItems as $item) {
            $order->orderItems()->create($item);
        }
        
        session()->forget('cart');
        
        return redirect()->route('home')->with([
            'message' => 'Order placed successfully!',
            'type' => 'success'
        ]);
    }
}
