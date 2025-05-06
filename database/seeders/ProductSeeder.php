<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $response = Http::withOptions(['verify' => false])->get('https://fakestoreapi.com/products');
        $products = $response->json();

        foreach ($products as $item) {
            Product::updateOrCreate(
                ['id' => $item['id']],
                [
                    'title' => $item['title'],
                    'price' => $item['price'],
                    'description' => $item['description'],
                    'category' => $item['category'],
                    'image' => $item['image'],
                ]
            );
        }
    }
}
