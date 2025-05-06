<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'price',
        'description',
        'category',
        'image',
    ];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function getAverageRatingAttribute(): ?float
    {
        return $this->reviews()->avg('rating');
    }
}
