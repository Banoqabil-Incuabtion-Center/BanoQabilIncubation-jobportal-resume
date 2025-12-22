<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->role === 'recruiter') {
            return redirect()->intended('/dashboard');
        }

        if ($user->role === 'jobSeeker') {
            return redirect()->intended('/');
        }

        return redirect('/');
    }
}
