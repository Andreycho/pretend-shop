<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Review;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        $this->call(ProductSeeder::class);
        Review::factory()->count(100)->create();
        User::factory()->create([
            'name' => 'Amin',
            'email' => 'test@admin.com',
            'password' => "pass123456",
            'role' => 'admin',
        ]);
        $this->call(OrderSeeder::class);

    }
}
