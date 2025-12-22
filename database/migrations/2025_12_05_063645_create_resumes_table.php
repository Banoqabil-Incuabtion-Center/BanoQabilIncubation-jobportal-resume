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
        Schema::create('resumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('linkedin')->nullable();
            $table->string('address')->nullable();
            $table->text('summary')->nullable();
            $table->json('experience')->nullable();
            $table->json('education')->nullable();
            $table->json('skills')->nullable();
            $table->json('certifications')->nullable();
            // also add below columns to table from another migration
            // $table->json('projects')->nullable()->after('certifications');
            // $table->json('languages')->nullable()->after('projects');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resumes');
    }
};
