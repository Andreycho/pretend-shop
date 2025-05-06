<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'total_price' => 0,
            'status' => $this->faker->randomElement(['pending', 'shipped', 'delivered']),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            $itemCount = rand(1, 5);
            $this->withItems($order, $itemCount);
        });
    }

    public function withItems(Order $order, int $count = 1): Order
    {
        $totalPrice = 0;

        for ($i = 0; $i < $count; $i++) {
            $product = Product::inRandomOrder()->first();
            $quantity = rand(1, 3);
            $unitPrice = $product->price;
            $subtotal = $quantity * $unitPrice;
            
            OrderItem::factory()->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
            ]);
            
            $totalPrice += $subtotal;
        }

        $order->update(['total_price' => $totalPrice]);
        
        return $order->fresh();
    }


    public function status(string $status): self
    {
        return $this->state(function (array $attributes) use ($status) {
            return [
                'status' => $status,
            ];
        });
    }
}
