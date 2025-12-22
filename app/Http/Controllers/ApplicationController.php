<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    //
    public function apply(Job $job)
    {
        $job->load('company');
        return Inertia::render('jobs/Apply', [
            'jobs' => [
                'data' => [$job],
            ],
        ]);
    }

    public function store(Request $request, Job $job)
    {
        $validated = $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email',
            'phone_no' => 'required|string',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'cover_letter' => 'nullable|string',

        ]);
        // dd($validated);

        $alreadyApplied = JobApplication::where('job_id', $job->id)
            ->where('user_id', Auth::id()) // use Auth::id() for currently logged-in user
            ->exists();

            Auth::user()->appliedJobs()->attach($job->id);

        if ($alreadyApplied) {
            return back()->withErrors(['error' => 'You have already applied for this job.']);
        }

        // Store the resume
        $path = $request->file('resume')->store('resumes', 'public');

        // Create the application
        JobApplication::create([
            'job_id' => $job->id,
            'user_id' => Auth::id(),   // link to current user
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_no' => $request->phone_no,
            'resume' => $path,
            'cover_letter' => $request->cover_letter,
        ]);
    }

    public function appliedJob(){
        $applications = Auth::user()->appliedJobs()->with('company')->latest()->paginate(5);

        // dd($applications);

        $jobs = $applications->through(function($job) {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'salary' => $job->salary,
            'company' => [
                'id' => $job->company->id,
                'name' => $job->company->name,
            ],
        ];
    });

        // dd($jobs);

        return Inertia::render('jobSeeker/AppliedJobs', [
            'jobs' =>  $jobs,
        ]);
    }

    public function getAppliedJobIds(Job $job){
        $user = Auth::user();
        // $user->appliedJobs()->attach($job->id);
        $appliedJobIds = $user->appliedJobs()->pluck('job_id');
        return response()->json($appliedJobIds);
    }

    public function jobsApplied(){
        $recruiter = Auth::user();

        $applications = JobApplication::whereHas('job', function($query) use ($recruiter){
            $query->where('user_id', $recruiter->id);
        })
        ->with(['job', 'seeker'])
        ->latest()
        ->paginate(6);

        // dd($applications);

        $applicationsData = $applications->through(function($job){
            return [
                'id' =>$job->id,
                'job' => [
                    'id' =>$job->job->id,
                    'title' =>$job->job->title,
                ],
                'seeker' => [
                    'id' =>$job->seeker->id,
                    'name' =>$job->seeker->name,
                    'email' => $job->seeker->email,
                ],
                'resume' => $job->resume,
                'cover_letter' =>$job->cover_letter,
                'applied_at' => $job->created_at->toDateTimeString(),
            ];
        });

        return Inertia::render('jobs/JobsApplied', [
            'applications' => $applicationsData,
        ]);
    }
}
