<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
public function handle(Request $request, Closure $next, ?string $role = null): Response
{
    $user = $request->user();

    // dd($user->role, $role);

    // Check if user exists and has the role passed from the route
    if ($user && $role && $user->role === $role) {
        return $next($request);
    }

    abort(403);
}

}
