<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\SeekerController;
use App\Models\Job;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'jobs' => Job::with('company')->paginate(10),
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Recruiter registration
Route::get('/register/recruiter', function () {
    return Inertia::render('auth/register', ['type' => 'recruiter']);
})->name('register.recruiter');

// Job Seeker registration
Route::get('/register/jobseeker', function () {
    return Inertia::render('auth/register', ['type' => 'jobSeeker']);
})->name('register.jobseeker');

Route::get('jobs', [JobController::class, 'index'])->name('jobs.index');

Route::middleware(['auth', 'verified', 'role:recruiter'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    
    Route::get('jobs/create', [JobController::class, 'create'])->name('jobs.create');
    Route::post('/jobs', [JobController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/myJobs', [JobController::class, 'myJobs'])->name('jobs.myJobs');
    Route::get('/jobs/edit/{job}', [JobController::class, 'edit'])->name('jobs.edit');
    Route::patch('/jobs/{job}', [JobController::class, 'update']);
    Route::delete('/jobs/{job}', [JobController::class, 'delete']);
    Route::get('/jobs/jobsApplied', [ApplicationController::class, 'jobsApplied'])->name('recruiter.jobsApplied');
    Route::get('/resume/{filename}', [ResumeController::class, 'viewPdf'])->name('resume.viewPdf');
    // web.php
    // Route::get('/resume/{filename}', [ResumeController::class, 'download'])->name('resume.download');
});


Route::get('jobSeeker/forEmployers', function () {
    return Inertia::render('jobSeeker/ForEmployers');
})->name('s.forEmployers');

Route::middleware(['auth', 'verified', 'role:jobSeeker'])->group(function () {
    Route::get('/jobSeeker/appliedJobs', function () {
        return Inertia::render('jobSeeker/AppliedJobs');
    })->name('jobSeeker.appliedJobs');

    Route::get('/jobSeeker/aboutUs', function () {
        return Inertia::render('jobSeeker/AboutUs');
    })->name('jobSeeker.aboutUs');

    Route::get('/jobSeeker/contactUs', function () {
        return Inertia::render('jobSeeker/ContactUs');
    })->name('jobSeeker.contactUs');

    // Route::get('/jobSeeker/savedJobs', function () {
    //     return Inertia::render('jobSeeker/SavedJobs');
    // })->name('jobSeeker.savedJobs');

    //bookmark jobs
    Route::post('/jobSeeker/save-job/{job}', [SeekerController::class, 'saveJob'])->name('s.saveJob');
    Route::get('/jobSeeker/savedJobs', [SeekerController::class, 'savedJob'])->name('s.savedJobs');

    Route::get('/api/user/saved-jobs', [SeekerController::class, 'getSavedJobIds']);

    //apply for jobs
    Route::get('/jobs/apply/{job}', [ApplicationController::class, 'apply'])->name('jobs.apply');
    Route::post('/jobs/apply/{job}', [ApplicationController::class, 'store'])->name('jobs.apply.store');

    Route::get('/jobSeeker/appliedJobs', [ApplicationController::class, 'appliedJob'])->name('s.appliedJobs');

    Route::get('/api/user/applied-jobs', [ApplicationController::class, 'getAppliedJobIds']);

});

Route::get('/resume', function() {
    return view('resume');
});

// Route::post('/api/resume/save', [ResumeController::class, 'saveResume']);

Route::get('/resume/preview/{resume}', [ResumeController::class, 'preview'])->name('resume.preview');
Route::get('/resume/download/{resume}', [ResumeController::class, 'downloadPdf'])->name('resume.download');
// Route::delete('/api/resume/{resume}', [ResumeController::class, 'delete'])->name('resume.delete');


// Route::get('/api/resume/get', [ResumeController::class, 'getResume']);





require __DIR__ . '/settings.php';
