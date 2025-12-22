<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SeekerController extends Controller
{
    //

    public function saveJob(Job $job){
        $user = Auth::user();

        if ($user->savedJobs()->where('job_id',$job->id)->exists()){
            $user->savedJobs()->detach($job->id);
            // return response()->json(['status' => 'removed']);
            return back();
        }

        $user->savedJobs()->attach($job->id);
        // return response()->json(['status' => 'saved']);
        return back();
    }

    public function savedJob(){
        $jobs = Auth::user()->savedJobs()->with('company')->latest()->paginate(5);

        return Inertia::render('jobSeeker/SavedJobs', [
            'jobs' => $jobs,
        ]);
    }

    public function getSavedJobIds() {
    $user = Auth::user();
    $savedJobIds = $user->savedJobs()->pluck('job_id'); // get only IDs
    return response()->json($savedJobIds);
    
}

}
