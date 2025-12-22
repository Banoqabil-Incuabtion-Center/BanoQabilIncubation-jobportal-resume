<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();

             // Foreign keys
            $table->foreignId('job_id')->constrained('job_listings')->onDelete('cascade'); // links to jobs table
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // links to users table

            // Applicant info
            $table->string('full_name');
            $table->string('email');
            $table->string('phone_no');
            $table->string('resume'); // store file path
            $table->text('cover_letter')->nullable();

            $table->timestamps();

            // Prevent duplicate applications per job/user
            $table->unique(['job_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
