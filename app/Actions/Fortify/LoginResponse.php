<?php
namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
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

        return redirect()->intended('/');
    }
}
