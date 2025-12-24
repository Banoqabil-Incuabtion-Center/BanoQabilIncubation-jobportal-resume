<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    // $response = $this->post(route('register.store'), [
    //     'name' => 'Test User',
    //     'email' => 'test@example.com',
    //     'password' => 'password',
    //     'password_confirmation' => 'password',
    // ]);

    // $this->assertAuthenticated();
    // $response->assertRedirect(route('dashboard', absolute: false));
    $response = $this->post(route('register'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => 'jobSeeker',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect('/'); // job seeker home
});
