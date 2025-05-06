<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::where('user_id', auth()->id())
            ->with('orderItems')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at,
                    'status' => $order->status ?? 'processing',
                    'items_count' => $order->orderItems->count(),
                ];
            });

        return Inertia::render('user/orders/index', [
            'orders' => $orders
        ]);
    }

    public function show($id)
    {
        $order = Order::where('user_id', auth()->id())
            ->with(['orderItems.product'])
            ->findOrFail($id);

        $orderData = [
            'id' => $order->id,
            'total_price' => $order->total_price,
            'created_at' => $order->created_at,
            'status' => $order->status ?? 'processing',
            'products' => $order->orderItems->map(function ($item) {
                return [
                    'id' => $item->product->id,
                    'title' => $item->product->title,
                    'price' => $item->unit_price,
                    'quantity' => $item->quantity,
                    'image' => $item->product->image,
                ];
            }),
        ];

        return Inertia::render('user/orders/show', [
            'order' => $orderData
        ]);
    }
}