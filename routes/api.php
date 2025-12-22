<?php

use App\Http\Controllers\ResumeController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/resume/save', [ResumeController::class, 'saveResume']);
    Route::delete('/resume/{resume}', [ResumeController::class, 'delete']);
    Route::get('/resume/get', [ResumeController::class, 'getResume']);
});

// Route::post('/resume/save', [ResumeController::class, 'saveResume']);
// Route::delete('/resume/{resume}', [ResumeController::class, 'delete']);
// Route::get('/resume/get', [ResumeController::class, 'getResume']);
