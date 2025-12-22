@extends('layouts.plain')

@section('content')
    <style>
        .section {
            cursor: grab;
        }
    </style>
    <div class="container mx-auto px-4 py-8 font-[arial]">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">ATS Resume Builder</h1>

            <div id="alert-container"></div>

            <form id="resumeForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <!-- Personal Information -->
                <div class="mb-6">
                    <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Personal Information</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Full Name <span
                                    class="text-red-600">*</span></label>
                            <input type="text" name="full_name" required placeholder="e.g, Ali Hussain"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Email <span
                                    class="text-red-600">*</span></label>
                            <input type="email" name="email" required placeholder="e.g, e@example.com"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Phone No <span
                                    class="text-red-600">*</span></label>
                            <input type="tel" name="phone" required placeholder="e.g, 03xxxxxxxxx"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Address <span
                                    class="text-red-600">*</span></label>
                            <input type="text" name="address" required placeholder="e.g, Karachi, Pakistan"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                            <input type="text" name="designation" placeholder="e.g, Full Stack Developer"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>


                    </div>


                    <!-- Links -->
                    <div id="linkContainer">
                        <div class="link-item border p-4 mb-4 rounded md:col-span-2 mt-4">
                            <div class=" flex justify-between items-center">
                                <div>
                                    <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                </div>
                                <div>
                                    <button type="button" class="removeBtn text-black text-sm rounded cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <input type="text" name="links[0][name]" placeholder="e.g, Linkedin"
                                class="shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">

                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Link</label>
                                <input type="url" name="links[0][link]" placeholder="e.g, https://linkedin.com"
                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                        </div>
                    </div>

                    <button type="button" id="addLinkBtn"
                        class="bg-[#309689] hover:bg-[#3db6a6] text-white px-2 py-2 mt-2 font-bold rounded focus:outline-none focus:shadow-outline">
                        + Add Link
                    </button>
                </div>

                <!-- Professional Summary -->
                <div class="mb-6">
                    <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Professional Summary</h2>
                    <textarea name="summary" rows="5"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Brief overview of your professional background and career objectives"></textarea>
                </div>
                <div id="resumeSections">
                    <!-- Work Experience -->
                    <div data-id="work-experience" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
                        <div id="experienceContainer">
                            <div class="experience-item border p-4 mb-4 rounded">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Job Title</label>
                                        <input type="text" name="experience[0][title]"
                                            placeholder="e.g, Web Developer - Intern"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <label class="block text-gray-700 text-sm font-bold mb-2">Company</label>
                                            </div>
                                            <div>
                                                <button type="button"
                                                    class="removeBtn text-black text-sm rounded cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-x-icon lucide-x">
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <input type="text" name="experience[0][company]" placeholder="e.g, Bano Qabil"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                                        <input type="month" name="experience[0][start_date]"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                                        <input type="month" name="experience[0][end_date]"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                        <label class="inline-flex items-center mt-2">
                                            <input type="checkbox" name="experience[0][current]" class="form-checkbox">
                                            <span class="ml-2 text-sm">Currently working</span>
                                        </label>
                                    </div>

                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Description <span
                                                class="text-gray-500">(Use action verbs + measurable results for good ATS
                                                score)</span></label>
                                        <textarea name="experience[0][description]" rows="4"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Describe your key responsibilities and achievements."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" id="addExperienceBtn"
                            class="bg-[#309689] hover:bg-[#3db6a6] text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                            + Add Experience
                        </button>
                    </div>

                    <!-- Education -->
                    <div data-id="education" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
                        <div id="educationContainer">
                            <div class="education-item border p-4 mb-4 rounded">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Degree</label>
                                        <input type="text" name="education[0][degree]"
                                            placeholder="e.g, Bachelors of Science(BSc)"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2">Institution</label>
                                            </div>
                                            <div>
                                                <button type="button"
                                                    class="removeBtn text-black text-sm rounded cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-x-icon lucide-x">
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <input type="text" name="education[0][institution]"
                                            placeholder="e.g, Karachi University"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                        <input type="number" name="education[0][year]" min="1950" max="2030"
                                            placeholder="e.g, 2025"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">GPA (Optional)</label>
                                        <input type="text" name="education[0][gpa]" placeholder="e.g, 3.4"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="button" id="addEducationBtn"
                            class="bg-[#309689] hover:bg-[#3db6a6] text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                            + Add Education
                        </button>
                    </div>

                    <!-- Skills -->
                    <div data-id="skills" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Skills</h2>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Skills <span
                                    class="text-gray-500">(comma
                                    separated)</span></label>
                            <textarea name="skills" rows="3"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="e.g., JavaScript, Python, Project Management, Communication"></textarea>
                        </div>
                    </div>

                    <!-- Certifications -->
                    <div data-id="certification" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Certifications <span
                                class="text-gray-500">(Optional)</span></h2>
                        <div id="certificationContainer">
                            <div class="certification-item border p-4 mb-4 rounded">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Certification Name</label>
                                        <input type="text" name="certifications[0][name]"
                                            placeholder="e.g, WebWizard Web Development"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <label class="block text-gray-700 text-sm font-bold mb-2">Issuing
                                                    Organization</label>
                                            </div>
                                            <div>
                                                <button type="button"
                                                    class="removeBtn text-black text-sm rounded cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-x-icon lucide-x">
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <input type="text" name="certifications[0][organization]"
                                            placeholder="e.g, Bano Qabil"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Year</label>
                                        <input type="number" name="certifications[0][year]" min="1950" max="2030"
                                            placeholder="e.g, 2025"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" id="addCertificationBtn"
                            class="bg-[#309689] hover:bg-[#3db6a6] text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                            + Add Certification
                        </button>
                    </div>

                    <!-- Projects -->
                    <div data-id="projects" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Projects <span
                                class="text-gray-500">(Optional)</span></h2>
                        <div id="projectContainer">
                            <div class="project-item border p-4 mb-4 rounded">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
                                        <input type="text" name="projects[0][name]" placeholder="e.g, Job Portal"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <label class="block text-gray-700 text-sm font-bold mb-2">Project Link <span
                                                        class="text-gray-500">(Github
                                                        Repository/deployement)</span></label>
                                            </div>
                                            <div>
                                                <button type="button"
                                                    class="removeBtn text-black text-sm rounded cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="lucide lucide-x-icon lucide-x">
                                                        <path d="M18 6 6 18" />
                                                        <path d="m6 6 12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <input type="url" name="projects[0][link]"
                                            placeholder="e.g, https://your-domain.com or https://github.com"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                        <textarea name="projects[0][description]" rows="4"
                                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Describe key features of your project"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" id="addProjectBtn"
                            class="bg-[#309689] hover:bg-[#3db6a6] text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline">
                            + Add Project
                        </button>
                    </div>

                    <!-- Languages -->
                    <div data-id="languages" class="section mb-6">
                        <h2 class="text-2xl font-semibold mb-4 border-b pb-2">Languages</h2>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Languages <span
                                    class="text-gray-500">(comma separated)</span></label>
                            <textarea name="languages" rows="3"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="e.g., English(fluent), Urdu(native)"></textarea>
                        </div>
                    </div>
                    {{-- Hidden Input --}}
                    <input type="hidden" name="section_order" id="sectionOrder">
                </div>
                <!-- Submit Buttons -->
                <div class="flex items-center justify-between mt-8">
                    <div>
                        <button type="button" id="saveResumeBtn"
                            class="bg-gradient-to-r from-[#6B73FF] to-[#000DFF] hover:from-[#7C84FF] hover:to-[#1A1AFF] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save
                        </button>

                        <button type="button" id="previewResumeBtn"
                            class="bg-gradient-to-r from-[#5e4f8a] to-[#7c66b0] hover:from-[#7c66b0] hover:to-[#917fc5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Preview
                        </button>

                        <button type="button" id="downloadResumeBtn"
                            class="bg-gradient-to-r from-[#1f5c7b] to-[#3a84a9] hover:from-[#3a84a9] hover:to-[#5aa8c2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Download PDF
                        </button>

                    </div>
                    <div class="flex justify-center">
                        <button type="button" id="deleteResumeBtn"
                            class="bg-red-500 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded">
                            Delete
                        </button>
                    </div>

                </div>

            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>

    <script>

        axios.defaults.headers.common['X-CSRF-TOKEN'] =
            document.querySelector('meta[name="csrf-token"]').content;

        // Include cookies with request (needed for session auth)
        axios.defaults.withCredentials = true;
        /* -----------------------------------------
        -------- Add Link Functionality ------
        ------------------------------------------*/
        const linkContainer = document.getElementById('linkContainer');
        const addLinkBtn = document.getElementById('addLinkBtn');

        function updateLinkRemoveButtons() {
            const items = linkContainer.querySelectorAll('.link-item');
            const removeBtns = linkContainer.querySelectorAll('.removeBtn');

            removeBtns.forEach(btn => {

                if (items.length === 1) {
                    btn.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                } else {
                    btn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                }

            });
        }

        addLinkBtn.addEventListener('click', function () {
            const items = linkContainer.querySelectorAll('.link-item');
            const lastItem = items[items.length - 1];
            const newItem = lastItem.cloneNode(true);
            // Reset input values and increment indices
            const index = items.length;
            const inputs = newItem.querySelectorAll('input');

            inputs.forEach(input => {
                //clear the value
                input.value = '';
                // Update name index, e.g., experience[0][title] -> experience[1][title]
                input.name = input.name.replace(/\[\d+\]/, `[${index}]`);

            });

            // Append the new experience item to the container
            linkContainer.appendChild(newItem);

            // Remove experience item
            linkContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('.removeBtn');
                if (!btn) return;

                const items = linkContainer.querySelectorAll('.link-item');
                if (items.length === 1) return; //don't remove last container

                const linkItem = btn.closest('.link-item');
                if (linkItem) {
                    linkItem.remove();
                    updateLinkRemoveButtons(); //update buttons after removal
                }
            });

            updateLinkRemoveButtons(); // Call after page load or after adding a new container
        });

        /* -----------------------------------------
        -------- Add Experience Functionality ------
        ------------------------------------------*/
        const experienceContainer = document.getElementById('experienceContainer');
        const addExperienceBtn = document.getElementById('addExperienceBtn');

        function updateExpRemoveButtons() {
            const items = experienceContainer.querySelectorAll('.experience-item');
            const removeBtns = experienceContainer.querySelectorAll('.removeBtn');

            removeBtns.forEach(btn => {

                if (items.length === 1) {
                    btn.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                } else {
                    btn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                }

            });
        }

        addExperienceBtn.addEventListener('click', function () {
            const items = experienceContainer.querySelectorAll('.experience-item');
            const lastItem = items[items.length - 1];
            const newItem = lastItem.cloneNode(true);
            // Reset input values and increment indices
            const index = items.length;
            const inputs = newItem.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                //clear the value
                input.value = '';
                // Update name index, e.g., experience[0][title] -> experience[1][title]
                input.name = input.name.replace(/\[\d+\]/, `[${index}]`);

            });

            // Append the new experience item to the container
            experienceContainer.appendChild(newItem);

            // Remove experience item
            experienceContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('.removeBtn');
                if (!btn) return;

                const items = experienceContainer.querySelectorAll('.experience-item');
                if (items.length === 1) return; //don't remove last container

                const experienceItem = btn.closest('.experience-item');
                if (experienceItem) {
                    experienceItem.remove();
                    updateExpRemoveButtons(); //update buttons after removal
                }
            });

            updateExpRemoveButtons(); // Call after page load or after adding a new container
        });

        /* -----------------------------------------
        -------- Add Education Functionality ------
        ------------------------------------------*/
        const educationContainer = document.getElementById('educationContainer');
        const addEducationBtn = document.getElementById('addEducationBtn');

        function updateEduRemoveButtons() {
            const items = educationContainer.querySelectorAll('.education-item');
            const removeBtns = educationContainer.querySelectorAll('.removeBtn');

            removeBtns.forEach(btn => {
                if (items.length === 1) {
                    btn.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                } else {
                    btn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                }
            });
        }

        addEducationBtn.addEventListener('click', function () {
            const items = educationContainer.querySelectorAll('.education-item');
            const lastItem = items[items.length - 1];
            const newItem = lastItem.cloneNode(true); // clone the last item

            // Reset input values and increment indices
            const index = items.length;
            const inputs = newItem.querySelectorAll('input');

            inputs.forEach(input => {
                // Clear the value
                input.value = '';

                // Update name index, e.g., education[0][degree] -> education[1][degree]
                input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
            });

            // Append the new education item to the container
            educationContainer.appendChild(newItem);

            // Remove education item
            educationContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('.removeBtn');
                if (!btn) return;

                const items = educationContainer.querySelectorAll('.education-item');
                if (items.length === 1) return; // don't remove last container

                const educationItem = btn.closest('.education-item');
                if (educationItem) {
                    educationItem.remove();
                    updateEduRemoveButtons(); // update buttons after removal
                }
            });

            // Call after page load or after adding a new container
            updateEduRemoveButtons();

        });

        /* -----------------------------------------
        -------- Add Certification Functionality ------
        ------------------------------------------*/
        const certificationContainer = document.getElementById('certificationContainer');
        const addCertificateBtn = document.getElementById('addCertificationBtn');

        function updateCertRemoveButtons() {
            const items = certificationContainer.querySelectorAll('.certification-item');
            const removeBtns = certificationContainer.querySelectorAll('.removeBtn');

            removeBtns.forEach(btn => {

                if (items.length === 1) {
                    btn.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                } else {
                    btn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                }

            });
        }

        addCertificateBtn.addEventListener('click', function () {
            const items = certificationContainer.querySelectorAll('.certification-item');
            const lastItem = items[items.length - 1];
            const newItem = lastItem.cloneNode(true);
            // Reset input values and increment indices
            const index = items.length;
            const inputs = newItem.querySelectorAll('input');

            inputs.forEach(input => {
                //clear the value
                input.value = '';
                // Update name index, e.g., certification[0][title] -> certification[1][title]
                input.name = input.name.replace(/\[\d+\]/, `[${index}]`);

            });

            // Append the new certification item to the container
            certificationContainer.appendChild(newItem);

            // Remove certification item
            certificationContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('.removeBtn');
                if (!btn) return;

                const items = certificationContainer.querySelectorAll('.certification-item');
                if (items.length === 1) return; //don't remove last container

                const certificationItem = btn.closest('.certification-item');
                if (certificationItem) {
                    certificationItem.remove();
                    updateCertRemoveButtons(); //update buttons after removal
                }
            });

            updateCertRemoveButtons(); // Call after page load or after adding a new container
        });


        /* -----------------------------------------
        -------- Add Project Functionality ------
        ------------------------------------------*/
        const projectContainer = document.getElementById('projectContainer');
        const addProjectBtn = document.getElementById('addProjectBtn');

        function updateProjRemoveButtons() {
            const items = projectContainer.querySelectorAll('.project-item');
            const removeBtns = projectContainer.querySelectorAll('.removeBtn');

            removeBtns.forEach(btn => {

                if (items.length === 1) {
                    btn.classList.add('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                } else {
                    btn.classList.remove('pointer-events-none', 'opacity-50', 'cursor-not-allowed');
                }

            });
        }

        addProjectBtn.addEventListener('click', function () {
            const items = projectContainer.querySelectorAll('.project-item');
            const lastItem = items[items.length - 1];
            const newItem = lastItem.cloneNode(true);
            // Reset input values and increment indices
            const index = items.length;
            const inputs = newItem.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                input.value = '';
                input.name = input.name.replace(/\[\d+\]/, `[${index}]`);
            });

            // Append the new project item to the container
            projectContainer.appendChild(newItem);

            // Remove project item
            projectContainer.addEventListener('click', function (e) {
                const btn = e.target.closest('.removeBtn');
                if (!btn) return;

                const items = projectContainer.querySelectorAll('.project-item');
                if (items.length === 1) return; //don't remove last container

                const projectItem = btn.closest('.project-item');
                if (projectItem) {
                    projectItem.remove();
                    updateProjRemoveButtons(); //update buttons after removal
                }
            });

            updateProjRemoveButtons(); // Call after page load or after adding a new container
        });


        function formToJson(form) {
            const formData = new FormData(form);
            let json = {};

            formData.forEach((value, key) => {
                // Handle array fields like experience[0][title]
                if (key.includes("[")) {
                    const keys = key.replace(/\]/g, "").split("[");
                    let current = json;

                    keys.forEach((k, i) => {
                        if (i === keys.length - 1) {
                            current[k] = value;
                        } else {
                            current[k] = current[k] || {};
                            current = current[k];
                        }
                    });
                } else {
                    json[key] = value;
                }
            });

            return json;
        }

        var el = document.getElementById('resumeSections');

        Sortable.create(el, {
            animation: 150,
            onEnd: function () {
                // Update section order whenever dragging ends
                updateSectionOrder();
            }
        });

        function updateSectionOrder() {
            const sections = document.querySelectorAll('#resumeSections .section');
            const order = Array.from(sections).map(s => s.dataset.id);
            document.getElementById('sectionOrder').value = JSON.stringify(order);
            console.log('Section order:', order);
        }
        const form = document.getElementById('resumeForm');

        form.addEventListener('submit', function (e) {
            updateSectionOrder();
            e.preventDefault();

        });

        // Call on page load to set initial order
        document.addEventListener('DOMContentLoaded', function () {
            updateSectionOrder();
        });
        // -------- Save Resume --------
        document.getElementById('saveResumeBtn').addEventListener('click', async function () {

            // UPDATE section order before saving

            updateSectionOrder();
            // --- Fix links before submission ---
            const linkInputs = document.querySelectorAll('[name$="[link]"]');
            linkInputs.forEach(input => {
                let value = input.value.trim();
                if (value && !/^https?:\/\//i.test(value)) {
                    input.value = 'https://' + value;
                }
            });

            const data = formToJson(form);

            try {
                const res = await axios.post('/api/resume/save', data);
                const resumeId = res.data.resume_id;
                alert(res.data.message);

                // Store the ID for later use (preview, download, delete)
                form.dataset.resumeId = resumeId;
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    console.error('Validation errors:', err.response.data.errors);
                    alert('Validation errors: ' + JSON.stringify(err.response.data.errors));
                } else {
                    console.error('Error saving resume:', err);
                    alert('Error saving resume');
                }
            }
        });

        /* -----------------------------------------
        ------------ Preview Resume ----------------
        ------------------------------------------*/
        document.getElementById('previewResumeBtn').addEventListener('click', function () {
            // Get saved resume ID from form dataset
            const resumeId = form.dataset.resumeId;

            if (!resumeId) {
                alert('Please save the resume first before previewing.');
                return;
            }

            // Open the preview page in a new tab
            window.open(`/resume/preview/${resumeId}`, '_blank');
        });


        /* -----------------------------------------
        ------------ Download Resume ----------------
        ------------------------------------------*/
        document.getElementById('downloadResumeBtn').addEventListener('click', function () {
            const resumeId = form.dataset.resumeId;

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

        /* -----------------------------------------
        ------------ Delete Resume ----------------
        ------------------------------------------*/
        document.getElementById('deleteResumeBtn').addEventListener('click', async function () {
            const resumeId = form.dataset.resumeId;

            console.log("Resume ID:", resumeId);


            if (!resumeId) {
                alert('No saved resume found to delete.');
                return;
            }

            if (!confirm('Are you sure you want to delete this resume?')) {
                return;
            }

            try {
                const res = await axios.delete(`/api/resume/${resumeId}`);
                alert(res.data.message);

                // Clear stored resumeId so user can't preview/download deleted resume
                delete form.dataset.resumeId;

                // Optional: reset the form after delete
                form.reset();
            } catch (error) {
                console.error('Error deleting resume:', error);
                alert('Failed to delete resume.');
            }
        });

        // -------------------------------------------
        // -------- Load Existing Resume Data --------
        // -------------------------------------------

        axios.get('/api/resume/get')
            .then(res => {
                const resume = res.data.resume;
                if (!resume) return;

                // Save resume ID for preview/download/delete
                form.dataset.resumeId = resume.id;

                /* --------------------
                ----Fill basic info----
                -------------------- */

                document.querySelector('input[name="full_name"]').value = resume.full_name || '';
                document.querySelector('input[name="email"]').value = resume.email || '';
                document.querySelector('input[name="phone"]').value = resume.phone || '';
                document.querySelector('input[name="address"]').value = resume.address || '';
                document.querySelector('input[name="designation"]').value = resume.designation || '';
                document.querySelector('textarea[name="summary"]').value = resume.summary || '';
                document.querySelector('textarea[name="skills"]').value = resume.skills ? resume.skills.join(', ') : '';
                document.querySelector('textarea[name="languages"]').value = resume.languages ? resume.languages.join(', ') : '';


                /* --------------------
                ------Fill Links-------
                -------------------- */
                if (resume.links && resume.links.length > 0) {
                    // First item
                    const firstLink = linkContainer.querySelector('.link-item');
                    firstLink.querySelector('input[name="links[0][name]"]').value = resume.links[0].name || '';
                    firstLink.querySelector('input[name="links[0][link]"]').value = resume.links[0].link || '';

                    // Other items
                    for (let i = 1; i < resume.links.length; i++) {
                        addLinkBtn.click(); // clone
                        const item = linkContainer.querySelectorAll('.link-item')[i];
                        item.querySelector(`input[name="links[${i}][name]"]`).value = resume.links[i].name || '';
                        item.querySelector(`input[name="links[${i}][link]"]`).value = resume.links[i].link || '';
                    }
                }

                /* --------------------
                ----Fill Experience----
                -------------------- */

                if (resume.experience && resume.experience.length > 0) {
                    // First item
                    const firstExp = experienceContainer.querySelector('.experience-item');
                    firstExp.querySelector('input[name="experience[0][title]"]').value = resume.experience[0].title || '';
                    firstExp.querySelector('input[name="experience[0][company]"]').value = resume.experience[0].company || '';
                    firstExp.querySelector('input[name="experience[0][start_date]"]').value = resume.experience[0].start_date || '';
                    firstExp.querySelector('input[name="experience[0][end_date]"]').value = resume.experience[0].end_date || '';
                    firstExp.querySelector('textarea[name="experience[0][description]"]').value = resume.experience[0].description || '';
                    if (resume.experience[0].current) {
                        firstExp.querySelector('input[name="experience[0][current]"]').checked = true;
                    }

                    // Other items
                    for (let i = 1; i < resume.experience.length; i++) {
                        addExperienceBtn.click(); // clone
                        const item = experienceContainer.querySelectorAll('.experience-item')[i];
                        item.querySelector(`input[name="experience[${i}][title]"]`).value = resume.experience[i].title || '';
                        item.querySelector(`input[name="experience[${i}][company]"]`).value = resume.experience[i].company || '';
                        item.querySelector(`input[name="experience[${i}][start_date]"]`).value = resume.experience[i].start_date || '';
                        item.querySelector(`input[name="experience[${i}][end_date]"]`).value = resume.experience[i].end_date || '';
                        item.querySelector(`textarea[name="experience[${i}][description]"]`).value = resume.experience[i].description || '';
                        if (resume.experience[i].current) {
                            item.querySelector(`input[name="experience[${i}][current]"]`).checked = true;
                        }
                    }
                }

                /* --------------------
                -----Fill Education----
                -------------------- */

                if (resume.education && resume.education.length > 0) {
                    // First item
                    const firstEdu = educationContainer.querySelector('.education-item');
                    firstEdu.querySelector('input[name="education[0][degree]"]').value = resume.education[0].degree || '';
                    firstEdu.querySelector('input[name="education[0][institution]"]').value = resume.education[0].institution || '';
                    firstEdu.querySelector('input[name="education[0][year]"]').value = resume.education[0].year || '';
                    firstEdu.querySelector('input[name="education[0][gpa]"]').value = resume.education[0].gpa || '';


                    // Other items
                    for (let i = 1; i < resume.education.length; i++) {
                        addEducationBtn.click(); // clone
                        const item = educationContainer.querySelectorAll('.education-item')[i];
                        item.querySelector(`input[name="education[${i}][degree]"]`).value = resume.education[i].degree || '';
                        item.querySelector(`input[name="education[${i}][institution]"]`).value = resume.education[i].institution || '';
                        item.querySelector(`input[name="education[${i}][year]"]`).value = resume.education[i].year || '';
                        item.querySelector(`input[name="education[${i}][gpa]"]`).value = resume.education[i].gpa || '';

                    }
                }

                /* --------------------
                --Fill Certifications--
                -------------------- */
                if (resume.certifications && resume.certifications.length > 0) {
                    // First item
                    const firstCert = certificationContainer.querySelector('.certification-item');
                    firstCert.querySelector('input[name="certifications[0][name]"]').value = resume.certifications[0].name || '';
                    firstCert.querySelector('input[name="certifications[0][organization]"]').value = resume.certifications[0].organization || '';
                    firstCert.querySelector('input[name="certifications[0][year]"]').value = resume.certifications[0].year || '';

                    // Other items
                    for (let i = 1; i < resume.certifications.length; i++) {
                        addCertificationBtn.click(); // clone
                        const item = certificationContainer.querySelectorAll('.certification-item')[i];
                        item.querySelector(`input[name="certifications[${i}][name]"]`).value = resume.certifications[i].name || '';
                        item.querySelector(`input[name="certifications[${i}][organization]"]`).value = resume.certifications[i].organization || '';
                        item.querySelector(`input[name="certifications[${i}][year]"]`).value = resume.certifications[i].year || '';
                    }
                }

                /* --------------------
                -----Fill Projects-----
                -------------------- */
                if (resume.projects && resume.projects.length > 0) {
                    // First item
                    const firstProj = projectContainer.querySelector('.project-item');
                    firstProj.querySelector('input[name="projects[0][name]"]').value = resume.projects[0].name || '';
                    firstProj.querySelector('input[name="projects[0][link]"]').value = resume.projects[0].link || '';
                    firstProj.querySelector('textarea[name="projects[0][description]"]').value = resume.projects[0].description || '';

                    // Other items
                    for (let i = 1; i < resume.projects.length; i++) {
                        addProjectBtn.click(); // clone
                        const item = projectContainer.querySelectorAll('.project-item')[i];
                        item.querySelector(`input[name="projects[${i}][name]"]`).value =
                            resume.projects[i].name || "";

                        item.querySelector(`input[name="projects[${i}][link]"]`).value =
                            resume.projects[i].link || "";

                        item.querySelector(`textarea[name="projects[${i}][description]"]`).value =
                            resume.projects[i].description || "";
                    }
                }

                if (resume.section_order) {
                    let order = Array.isArray(resume.section_order) ? resume.section_order : JSON.parse(resume.section_order);

                    const container = document.getElementById('resumeSections');

                    order.forEach(id => {
                        const section = container.querySelector(`.section[data-id="${id}"]`);
                        if (section) container.appendChild(section);
                    });

                    // Update hidden input so saving keeps the same order
                    document.getElementById('sectionOrder').value = JSON.stringify(order);
                }

            })
            .catch(err => console.error(err));


    </script>
@endsection

@push('scripts')
    @vite(['resources/js/app.js'])
@endpush