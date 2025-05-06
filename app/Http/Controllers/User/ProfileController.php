<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;


class ProfileController extends Controller
{
    public function profile()
    {
        return Inertia::render('user/profile');
    }
}
