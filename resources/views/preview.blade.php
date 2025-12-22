@extends('layouts.plain')
@php
    use Carbon\Carbon;
@endphp

@section('content')
    <div class="container mx-auto px-4 py-8 font-[arial]">
        <div class="max-w-4xl mx-auto bg-white shadow-md rounded p-6">
            <h1 class="text-2xl font-bold mb-4 underline">Preview</h1>

            @php
                $sections = [
                    'work-experience' => 'Work Experience',
                    'projects' => 'Projects',
                    'education' => 'Education',
                    'certification' => 'Certifications',
                    'skills' => 'Skills',
                    'languages' => 'Languages',
                ];

                $order = $sectionOrder ?? array_keys($sections); // fallback if no orde

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
            <div class="mb-2 border-b pb-2">
                <div>
                    <h2 class="text-3xl font-bold ">{{ $resume->full_name ?? ''  }}</h2>
                    <p class="text-xl font-semibold">{{ $resume->designation ?? '' }}</p>
                    <p class="text-sm">
                        <strong>Email:</strong> {{ $resume->email ?? '' }} |
                        <strong>Phone no:</strong> {{ $resume->phone ?? '' }} |
                        <strong>Address:</strong> {{ $resume->address ?? '' }}
                    </p>
                    @if (!empty($hasLinks))
                        <p class="mt-1 text-xs">
                            @foreach ($resume->links as $link)
                                @php
                                    $cleanLink = $link['link'] ?? '';
                                    if ($cleanLink && !str_starts_with($cleanLink, 'http')) {
                                        $cleanLink = 'https://' . $cleanLink;
                                    }
                                @endphp
                                <span><strong>{{ $link['name'] ?? '' }}</strong>: </span><a href="{{ $cleanLink }}" target="_blank"
                                    class="underline text-blue-600 mr-2">
                                    {{ $cleanLink}}
                                </a>
                            @endforeach
                        </p>
                    @endif
                </div>
            </div>

            <!-- Professional Summary -->
            @if(!empty($resume->summary))
                <div class="mb-2">
                    <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Professional Summary</h2>
                    <ul class="text-sm list-disc list-inside ml-4">
                        <li class="mb-1">
                            {{ $resume->summary }}
                        </li>
                    </ul>

                </div>
            @endif

            <!-- Work Experience -->
            @foreach ($order as $sectionId)

                @switch($sectionId)
                    @case('work-experience')
                        @if(!empty($hasExperience))
                            <div class="mb-2">
                                <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Work Experience</h2>
                                @foreach($resume->experience as $exp)
                                    <div class="mb-4 text-sm">
                                        <div class="mb-2">
                                            <ul class="list-disc list-inside flex row ml-4">
                                                <li class="mb-1"><strong>{{ $exp['title'] }}</strong>, {{ $exp['company'] }}</li>
                                                @php
                                                    $start = !empty($exp['start_date']) ? Carbon::parse($exp['start_date'])->format('F Y') : '';
                                                    $end = (!empty($exp['current']) && $exp['current']) ? 'Present' : (!empty($exp['end_date']) ? Carbon::parse($exp['end_date'])->format('F Y') : '');
                                                @endphp
                                                <span>&nbsp;({{ $start }} - {{ $end }})</span>
                                            </ul>
                                            @php
                                                $lines = preg_split('/\r\n|\r|\n/', $exp['description']);
                                            @endphp
                                            <ul class="list-[circle] ml-14">
                                                @foreach ($lines as $line)
                                                    @if(trim($line) !== '')
                                                        <li class="mb-1">{{ $line }}</li>
                                                    @endif
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    @break

                    <!-- Projects -->
                    @case('projects')
                        @if(!empty($hasProjects))
                        <div class="mb-2">
                            <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Projects</h2>
                            @foreach($resume->projects as $project)
                                <div class="mb-4 text-sm">
                                    @php
                                        $link = $project['link'] ?? '';
                                        if ($link && !str_starts_with($link, 'http')) {
                                            $link = 'https://' . $link;
                                        }
                                    @endphp

                                    <ul class="list-disc list-inside ml-4">
                                        <li><strong>{{ $project['name'] ?? '' }}</strong> | <a href="{{ $link }}" target="_blank"
                                                class="text-blue-600 underline">
                                                {{ $project['link'] ?? '' }}
                                            </a></li>
                                    </ul>
                                    @php
                                        $lines = preg_split('/\r\n|\r|\n/', $project['description']);
                                    @endphp

                                    <ul class="list-[circle] ml-14">
                                        @foreach ($lines as $line)
                                            @if(trim($line) !== '')
                                                <li class="mb-1">{{ $line }}</li>
                                            @endif
                                        @endforeach
                                    </ul>
                                </div>
                            @endforeach
                        </div>
                        @endif
                    @break
                    

                    <!-- Education -->
                    @case('education')
                        @if(!empty($hasEducation))
                        <div class="mb-2">
                            <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Education</h2>
                            @foreach($resume->education as $edu)
                                <div class="mb-4 text-sm">
                                    <ul class="list-disc list-inside ml-4">
                                        <li><strong>{{ $edu['degree'] ?? '' }}</strong>,
                                            {{ $edu['institution'] ?? ''}} ({{  $edu['year'] ?? ''}})
                                            <span>
                                                @if (!empty($edu['gpa']))
                                                    | <strong> GPA:</strong> {{ ($edu['gpa'] ?? '') }}
                                                @endif
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            @endforeach
                        </div>
                        @endif
                    @break
                    

                    <!-- Certifications -->
                    @case('certification')
                        @if(!empty($hasCertificates))
                            <div class="mb-2">
                                <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Certifications</h2>
                                @foreach($resume->certifications as $cert)
                                    <div class="mb-4 text-sm ">
                                        <ul class="list-disc list-inside ml-4">
                                            <li><strong>{{ $cert['name'] ?? '' }}</strong>, {{ $cert['organization'] ?? ''}}
                                                ({{ $cert['year'] ?? '' }})</li>
                                        </ul>

                                    </div>
                                @endforeach
                            </div>
                        @endif
                    @break
                    

                    <!-- Skills -->
                    @case('skills')
                        @if(!empty($hasSkills))
                            <div class="mb-2">
                                <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Skills</h2>
                                <ul class="list-disc list-inside text-sm ml-4">
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
                            <div class="mb-2">
                                <h2 class="text-lg font-bold mb-2 border-b border-black pb-1">Languages</h2>
                                <ul class="list-disc list-inside text-sm ml-4">
                                    @foreach($resume->languages as $language)
                                        <li>{{ $language }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    @break
                @endswitch
            @endforeach
            <div class="flex items-center justify-end mt-8">
                <button type="button" id="downloadResumeBtn"
                    class="bg-[#309689] hover:bg-[#3db6a6] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                    Download PDF
                </button>
            </div>
        </div>


    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        document.getElementById('downloadResumeBtn').addEventListener('click', function () {
            const resumeId = "{{ $resume->id }}";

            axios({
                url: `/resume/download/${resumeId}`,
                method: 'GET',
                responseType: 'blob', // crucial for PDF
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}' // optional for GET
                }
            })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'resume.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch(error => {
                    console.error('Download failed:', error);
                    alert('Failed to download resume.');
                });
        });
    </script>
@endsection