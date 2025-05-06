<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'orderItems.product'])->get()->map(function ($order) {
            return [
                'id' => $order->id,
                'customer_name' => $order->user ? $order->user->name : 'Guest',
                'created_at' => $order->created_at,
                'status' => $order->status,
                'total_price' => $order->total_price,
                'order_items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product' => $item->product,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                    ];
                }),
            ];
        });

        return Inertia::render('admin/orders/index', [
            'orders' => $orders
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'orderItems.product'])->findOrFail($id);
        
        return Inertia::render('admin/orders/show', [
            'order' => [
                'id' => $order->id,
                'customer_name' => $order->user ? $order->user->name : 'Guest',
                'created_at' => $order->created_at,
                'status' => $order->status,
                'total_price' => $order->total_price,
                'order_items' => $order->orderItems->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product' => $item->product,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                    ];
                }),
            ]
        ]);
    }
}
