# **Job Portal + ATS-Friendly Resume Builder**

A full-featured Job Portal & Resume Builder built with Laravel that enables job seekers to create ATS-optimized resumes, search and apply for jobs, and allows recruiters to post and manage job listings efficiently.

### Features

- User registration & authentication
- Job seeker dashboard
- Recruiter dashboard
- Post, search, and filter jobs
- Build professional resumes (ATS-friendly)
- Upload & manage resumes
- Apply to jobs
- Role-based access control (Recruiter/Job Seeker)
- Laravel backend with MVC architecture  

### Tech Stack

- Backend: Laravel (PHP)
- Frontend: Blade templates, React(TSX)
- Database: MySQL

### Installation (Local Setup)

#### 1-Clone the repository  

git clone https://github.com/Banoqabil-Incuabtion-Center/BanoQabilIncubation-jobportal-resume.git

#### 2-Enter project directory

cd BanoQabilIncubation-jobportal-resume

#### 3-Install dependencies

composer install  
npm install

#### 4-Copy and setup environment

cp .env.example .env

#### 5-Configure .env

Set your database credentials and other keys:  
DB_DATABASE=your_db  
DB_USERNAME=your_user  
DB_PASSWORD=your_password

#### 6-Generate App key  

php artisan key:generate

#### 7-Run migrations

php artisan migrate

#### 8-Build assets

npm run dev

#### 9-Start server

php artisan serve

#### 10-Visit: http://localhost:8000

### User Roles
#### Role	Capabilities
- Recruiter	Post/edit jobs, view applicants  
- Job Seeker	Build resume, Download resume, apply for jobs

### How To Use

#### Job Seeker
- Register an account
- Login
- Build and download your resume
- Browse jobs & apply

#### Recruiter
- Login / Register as recruiter
- Post job listings
- Review applications

#### Author
Shiza Fatima  
