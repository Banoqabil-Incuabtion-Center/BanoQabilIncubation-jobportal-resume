<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class ResumeController extends Controller
{
    public function viewPdf($filename)
    {
        $filename = str_replace('resumes/', '', $filename);
        $path = storage_path('app/public/resumes/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $filename . '"'
        ]);
    }

    // Save to database
    public function saveResume(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'links.*.name' => 'nullable|string|max:255',
            'links.*.link' => 'nullable|url',
            'address' => 'required|nullable|string|max:500',
            'summary' => 'nullable|string',
            'experience' => 'nullable|array',
            'education' => 'nullable|array',
            'skills' => 'nullable|string',
            'certifications' => 'nullable|array',
            'projects' => 'nullable|array',
            'languages' => 'nullable|string',
            'section_order' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Filter out empty links
        if (isset($data['links'])) {
            $data['links'] = collect($data['links'])
                ->filter(function ($link) {
                    return !empty($link['name']) && !empty($link['link']);
                })
                ->values()
                ->toArray();
        }

        // Parse section order - ADD THIS
        if (isset($data['section_order'])) {
            $data['section_order'] = json_decode($data['section_order'], true);
        } else {
            // Set default order if not provided
            $data['section_order'] = [
                'work-experience',
                'projects',
                'education',
                'certification',
                'skills',
                'languages'
            ];
        }


        // Convert skills string to array
        if (isset($data['skills'])) {
            $data['skills'] = array_map('trim', explode(',', $data['skills']));
        }
        // Convert languages string to array
        if (isset($data['languages'])) {
            $data['languages'] = array_map('trim', explode(',', $data['languages']));
        }

        $resume = Resume::updateOrCreate(
            ['user_id' => Auth::id()],
            array_merge($data, ['user_id' => Auth::id()]) 
        );

        return response()->json([
            'success' => true,
            'message' => 'Resume saved successfully',
            'resume_id' => $resume->id,
        ]);
    }

    public function preview(Resume $resume)
    {
        // $resume = Resume::findOrFail($id);

        // $experience = $resume->experience;
        // $education = $resume->education;
        // $certifications = $resume->certifications;

        $sectionOrder = $resume->section_order ?? [
            'work-experience',
            'projects',
            'education',
            'certification',
            'skills',
            'languages'
        ];

        return view('preview', compact('resume', 'sectionOrder'));
    }

    public function downloadPdf(Resume $resume)
    {
        $sectionOrder = $resume->section_order ?? [
            'work-experience',
            'projects',
            'education',
            'certification',
            'skills',
            'languages'
        ];
        $pdf = PDF::loadView('pdf', compact('resume', 'sectionOrder')); 


        return $pdf->download('pdf');
    }

    public function delete(Resume $resume)
    {
        if ($resume->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $resume->delete();

        return response()->json([
            'success' => true,
            'message' => 'Resume deleted successfully'
        ]);
    }

    public function getResume(Request $request)
    {
        // dd(Auth::id());
        $resume = Resume::where(['user_id' => Auth::id()])->first();
        return response()->json(['resume' => $resume]);
    }
}
