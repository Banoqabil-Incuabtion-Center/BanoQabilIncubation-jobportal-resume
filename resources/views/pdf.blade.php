@extends('layouts.plain')
@php
    use Carbon\Carbon;
@endphp

@section('content')
<style>
    h2 {
        font-weight:bold;
        font-size: 22px;
        border-bottom: 2px solid black;
        margin: 8px 0 4px 0;
        padding-bottom: 6px;
    }

    .summary, .title {
        list-style: disc;
        margin: 8px 0 4px 20px;
    }

    .description {
        list-style: circle;
        margin: 3px 0 5px 56px;
    }

    .resume-section {
        page-break-inside: auto !important; /* DomPDF */  
    }

    .resume-section h2 {
        page-break-after: avoid !important; /* DomPDF */
        break-after: avoid;  
    }
    
    ul li {
        page-break-inside: avoid !important; /* DomPDF */
        break-inside: avoid;
    }

</style>
    <div class="container mx-auto max-w-[794px] bg-white font-[arial] text-sm leading-[1.3]">
            @php
                $sections = [
                    'work-experience' => 'Work Experience',
                    'projects' => 'Projects',
                    'education' => 'Education',
                    'certification' => 'Certifications',
                    'skills' => 'Skills',
                    'languages' => 'Languages',
                ];

                $order = $sectionOrder ?? array_keys($sections); // fallback if no order provided

                $hasLinks = false;
                if (!empty($resume->links)) {
                    foreach ($resume->links as $link) {
                        if (!empty($link['name']) || !empty($link['link'])) {
                            $hasLinks = true;
                            break;
                        }
                    }
                }

                $hasExperience = false;
                if (!empty($resume->experience)) {
                    foreach ($resume->experience as $exp) {
                        if (!empty($exp['title']) || !empty($exp['company']) || !empty($exp['start_date']) || !empty($exp['description'])) {
                            $hasExperience = true;
                            break;
                        }
                    }
                }

                $hasProjects = false;
                if (!empty($resume->projects)) {
                    foreach ($resume->projects as $project) {
                        if (!empty($project['name']) || !empty($project['link']) || !empty($project['description'])) {
                            $hasProjects = true;
                            break;
                        }
                    }
                }

                $hasEducation = false;
                if (!empty($resume->education)) {
                    foreach ($resume->education as $edu) {
                        if (!empty($edu['degree']) || !empty($edu['institution']) || !empty($edu['year']) || !empty($edu['gpa'])) {
                            $hasEducation = true;
                            break;
                        }
                    }
                }

                $hasSkills = false;
                if (!empty($resume->skills) && is_array($resume->skills) && count($resume->skills) > 0) {
                    $hasSkills = true;
                }

                $hasCertificates = false;
                if (!empty($resume->certifications)) {
                    foreach ($resume->certifications as $cert) {
                        if (!empty($cert['name']) || !empty($cert['issuer']) || !empty($cert['date'])) {
                            $hasCertificates = true;
                            break;
                        }
                    }
                }

                $hasLanguages = false;
                if (!empty($resume->languages) && is_array($resume->languages) && count($resume->languages) > 0) {
                    $hasLanguages = true;
                }
            @endphp

            <!-- Personal Information -->
            <h1 style="font-weight: bold; font-size: 36px; margin: 0 0 3px 0;">{{ $resume->full_name ?? ''  }}</h1>
            <p style="font-size:22px; font-weight: semibold; margin: 0 0 3px 0;">{{ $resume->designation ?? '' }}</p>
            <p style="font-size: 14px; margin: 1px 0;">
                <strong>Email:</strong> {{ $resume->email ?? '' }} |
                <strong>Phone no:</strong> {{ $resume->phone ?? '' }} |
                <strong>Address:</strong> {{ $resume->address ?? '' }}
            </p>
            @if (!empty($hasLinks))
                <p style="font-size: 12px; margin: 1px 0;">
                    @foreach ($resume->links as $link)
                        @php
                        $cleanLink = $link['link'] ?? '';
                        if ($cleanLink && !str_starts_with($cleanLink, 'http')) {
                            $cleanLink = 'https://' . $cleanLink;
                        }
                    @endphp
                        <span><strong>{{ $link['name'] ?? '' }}</strong>: </span><a href="{{ $cleanLink }}" target="_blank" class="underline text-blue-600 mr-2">
                            {{ $cleanLink}} 
                        </a>
                    @endforeach
                </p>
            @endif

            <!-- Professional Summary -->
            @if(!empty($resume->summary))
                <h2>Professional Summary</h2>
                <ul class="summary">
                    <li>{{ $resume->summary }}</li>
                </ul>
            @endif

            <!-- Work Experience -->
            @foreach ($order as $sectionId)
                @switch($sectionId)
    
                    @case('work-experience')
                        @if(!empty($hasExperience))
                        <div class="resume-section">
                            <h2>Work Experience</h2>
                            @foreach($resume->experience as $exp)
                                <ul class="title" style="list-style: disc; margin: 2px 0 2px 20px;">
                                    <li>
                                        <strong>{{ $exp['title'] }}</strong>, {{ $exp['company'] }}
                                        @php
                                            $start = !empty($exp['start_date']) ? Carbon::parse($exp['start_date'])->format('F Y') : '';
                                            $end = (!empty($exp['current']) && $exp['current']) ? 'Present' : (!empty($exp['end_date']) ? Carbon::parse($exp['end_date'])->format('F Y') : '');
                                        @endphp
                                        ({{ $start }} - {{ $end }})
                                    </li>
                                </ul>
                                @php
                                    $lines = preg_split('/\r\n|\r|\n/', $exp['description']);
                                @endphp
                                <ul class="description">
                                    @foreach ($lines as $line)
                                        @if(trim($line) !== '')
                                            <li>{{ $line }}</li>
                                        @endif
                                    @endforeach
                                </ul>
                            @endforeach
                        </div>
                        @endif
                    @break

                    <!-- Projects -->
                    @case('projects')
                        @if(!empty($hasProjects))
                        <div class="resume-section">
                            <h2>Projects</h2>
                            @foreach($resume->projects as $project)
                                @php
                                    $link = $project['link'] ?? '';
                                    if ($link && !str_starts_with($link, 'http')) {
                                        $link = 'https://' . $link;
                                    }
                                @endphp

                                <ul class= "title">
                                    <li>
                                        <strong>{{ $project['name'] ?? '' }}</strong> | 
                                        <a href="{{ $link }}" target="_blank" class="text-blue-600 underline">
                                            {{ $project['link'] ?? '' }}
                                        </a>
                                    </li>
                                </ul>
                                @php
                                    $lines = preg_split('/\r\n|\r|\n/', $project['description']);
                                @endphp

                                <ul class="description">
                                    @foreach ($lines as $line)
                                        @if(trim($line) !== '')
                                            <li>{{ $line }}</li>
                                        @endif
                                    @endforeach
                                </ul>
                            @endforeach
                        </div>
                            
                        @endif
                    @break

                    <!-- Education -->
                    @case('education')
                        @if(!empty($hasEducation))
                        <div class="resume-section">
                            <h2>Education</h2>
                            <ul class= "title">
                                @foreach($resume->education as $edu)
                                    <li>
                                        <strong>{{ $edu['degree'] ?? '' }}</strong>,
                                        {{ $edu['institution'] ?? ''}} ({{  $edu['year'] ?? ''}})
                                        @if (!empty($edu['gpa']))
                                            | <strong>GPA:</strong> {{ ($edu['gpa'] ?? '') }}
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                    @break


                    <!-- Certifications -->
                    @case('certification')
                        @if(!empty($hasCertificates))
                        <div class="resume-section">
                            <h2>Certifications</h2>
                            <ul class= "title">
                                @foreach($resume->certifications as $cert)
                                    <li>
                                        <strong>{{ $cert['name'] ?? '' }}</strong>, {{ $cert['organization'] ?? ''}}
                                        ({{ $cert['year'] ?? '' }})
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                            
                        @endif
                    @break

                    <!-- Skills -->
                    @case('skills')
                        @if(!empty($hasSkills))
                        <div class="resume-section">
                            <h2>Skills</h2>
                            <ul class= "title">
                                @foreach($resume->skills as $skill)
                                    <li>{{ $skill }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                    @break

                    <!-- Languages-->
                    @case('languages')
                        @if(!empty($hasLanguages))
                        <div class="resume-section">
                            <h2>Languages</h2>
                            <ul class= "title">
                                @foreach($resume->languages as $language)
                                    <li>{{ $language }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                    @break
                @endswitch
            @endforeach
        </div>



@endsection