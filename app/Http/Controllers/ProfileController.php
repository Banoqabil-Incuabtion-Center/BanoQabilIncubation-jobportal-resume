<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ProfileController extends Controller
{
    //
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        // /** @var \App\Models\User $user */
        // $user->avatar_url = $user->getFirstMediaUrl('avatar');
        return Inertia::render('Profile/Index', [
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        // dd(PHP_VERSION, function_exists('avatarcreatefromstring'));
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        if ($request->hasFile('avatar')) {
            $user->clearMediaCollection('avatar'); // Remove old avatar
            $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        }
        // dd($user->fresh()->getFirstMediaUrl('avatar')); 

        return redirect()->back();
    }

    public function deleteAvatar(Request $request)
    {
        $user = $request->user();
        $user->clearMediaCollection('avatar');

        return redirect()->back()->with([
            'user' => $user->fresh(),
            'success' => 'Profile picture removed!',
        ]);
    }
}
