<?php

use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\ReviewController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Inertia\Inertia;


// Route::middleware('guest')->group(function () {
//     Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
//     Route::post('/login', [AuthenticatedSessionController::class, 'store']);

//     Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
//     Route::post('/register', [RegisteredUserController::class, 'store']);
// });

// Route::middleware('auth')->group(function () {
//     Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
// });

// Route::get('/admin', function () {
//     return Inertia::render('admin/dashboard');
// })->name('admin.dashboard');

//     Route::get('products', [ProductController::class, 'index'])->name('home');
//     Route::get('products/{id}', [ProductController::class, 'show']);

//     Route::post('/products/{productId}/review', [ReviewController::class, 'store']);

//     Route::get('profile/edit', [ProfileController::class, 'edit']);
//     Route::post('profile/update', [ProfileController::class, 'update']);


// Route::get('admin/products', [App\Http\Controllers\Admin\ProductController::class, 'index'])->name('products.index');
// Route::get('admin/products/create', [App\Http\Controllers\Admin\ProductController::class, 'create'])->name('products.create');
// Route::post('admin/products', [App\Http\Controllers\Admin\ProductController::class, 'store'])->name('products.store');
// Route::get('admin/products/{id}/edit', [App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('products.edit');
// Route::put('admin/products/{id}', [App\Http\Controllers\Admin\ProductController::class, 'update'])->name('products.update');
// Route::delete('admin/products/{product}', [App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('products.destroy');
// Route::get('admin/products/{id}', [App\Http\Controllers\Admin\ProductController::class, 'show'])->name('products.show');
// Route::get('admin/orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
// Route::get('admin/orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');


// Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
// Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
// Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
// Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
// Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
// Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');


Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('products/{id}', [ProductController::class, 'show']);

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::post('/products/{productId}/review', [ReviewController::class, 'store']);
    Route::get('profile', [ProfileController::class, 'profile']);
    
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');

    Route::get('/orders', [App\Http\Controllers\User\OrderController::class, 'index']);
    Route::get('/orders/{id}', [App\Http\Controllers\User\OrderController::class, 'show']);
});

Route::middleware(['auth', \App\Http\Middleware\IsAdmin::class])->prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
    
    Route::get('products', [App\Http\Controllers\Admin\ProductController::class, 'index'])->name('products.index');
    Route::get('products/create', [App\Http\Controllers\Admin\ProductController::class, 'create'])->name('products.create');
    Route::post('products', [App\Http\Controllers\Admin\ProductController::class, 'store'])->name('products.store');
    Route::get('products/{id}/edit', [App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('products.edit');
    Route::put('products/{id}', [App\Http\Controllers\Admin\ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('products.destroy');
    Route::get('products/{id}', [App\Http\Controllers\Admin\ProductController::class, 'show'])->name('products.show');
    
    Route::get('orders', [App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{id}', [App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
});
