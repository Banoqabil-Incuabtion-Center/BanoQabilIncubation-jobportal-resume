<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Inertia\Inertia;

class JobController extends Controller
{
    //

    public function index(Request $request)
    {
        // dd('Hello from all jobs created by every employer');
        // $jobs = Job::with('company')->latest()->paginate(6);
        // // dd($jobs);
        // return Inertia::render('jobs/Index', [
        //     'jobs' => $jobs,
        // ]);

        $query = Job::with('company')->latest();

        // If there is a search term, filter by job title or company name
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%")
                ->orWhereHas('company', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        }

        $jobs = $query->paginate(6)->withQueryString(); // preserve search term in pagination

        return Inertia::render('jobs/Index', [
            'jobs' => $jobs,
        ]);
    }

    public function create()
    {
        return Inertia::render('jobs/Create'); // Match your React component name
    }

    public function store()
    {
        $validated = request()->validate([
            'title' => ['required', 'min:3'],
            'salary' => ['required'],
        ]);

        $validated['company_id'] = Auth::user()->company_id;
        $validated['user_id'] = Auth::user()->id;



        Job::create($validated);
        return redirect()->route('jobs.myJobs');
    }

    public function myJobs()
    {

        // $jobs = Auth::user()
        //     ->jobs()
        //     ->with('company')
        //     ->get();

        $jobs = Auth::user()->jobs()->with('company')->latest()->paginate(6);
        // dd($jobs);
        return Inertia::render('jobs/MyJobs', [
            'jobs' => $jobs,
        ]);
    }

    public function edit(Job $job)
    {
        return Inertia::render('jobs/Edit', [
            'job' => $job,
        ]);
    }

    public function update(Request $request, Job $job)
    {
        //validate
        $validated = $request->validate([
            'title' => ['required', 'min:3'],
            'salary' => ['required']
        ]);

        //authorize(on hold.. )

        //update the job and persist


        $job->update($validated);


        //redirect to the job page
        return redirect("/jobs/myJobs");
    }

    public function delete(Job $job)
    {
        //authorize(on hold.. )
        //delete the job
        $job->delete();

        //redirect 
        return back()->with('success', 'deleted');
    }

    public function appliedJobs() {}
}
