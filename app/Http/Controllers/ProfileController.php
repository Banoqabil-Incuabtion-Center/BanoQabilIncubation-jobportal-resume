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
        $user = Auth::user()->fresh();
        return Inertia::render('Profile/Index', [
            'user' => $user->load('media'), // Ensure media is loaded
        ]);
    }

    public function uploadAvatar(Request $request)
    {
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
