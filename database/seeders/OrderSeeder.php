<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::factory()
            ->count(50)
            ->create();
            
        $statuses = ['pending', 'shipped', 'delivered'];
        
        foreach ($statuses as $status) {
            Order::factory()
                ->count(10)
                ->status($status)
                ->create();
        }
        
        $users = User::take(5)->get();
        
        foreach ($users as $user) {
            foreach (array_slice($statuses, 0, 3) as $status) {
                Order::factory()
                    ->count(1)
                    ->status($status)
                    ->create([
                        'user_id' => $user->id
                    ]);
            }
        }
    }
}
