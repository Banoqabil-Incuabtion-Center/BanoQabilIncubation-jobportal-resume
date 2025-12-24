<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('dashboard'))->assertRedirect(route('login'));
});

// test('authenticated users can visit the dashboard', function () {
//     $this->actingAs($user = User::factory()->create());

//     $this->get(route('dashboard'))->assertOk();
// });
test('authenticated recruiters can visit the dashboard', function () {
    $user = User::factory()->create([
        'role' => 'recruiter',
    ]);

    $this->actingAs($user);
    $this->get(route('dashboard'))->assertOk();
});

test('job seekers cannot visit the dashboard', function () {
    $user = User::factory()->create([
        'role' => 'jobSeeker',
    ]);

    $this->actingAs($user);
    $this->get(route('dashboard'))->assertForbidden();
});
