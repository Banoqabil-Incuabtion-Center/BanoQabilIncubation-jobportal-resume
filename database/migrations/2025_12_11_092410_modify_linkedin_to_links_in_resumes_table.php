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
        Schema::table('resumes', function (Blueprint $table) {
            // Drop old linkedin column
            $table->dropColumn('linkedin');

            // Add new links column as JSON
            $table->json('links')->nullable()->after('phone');
        });
    }

    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            // Drop new links column
            $table->dropColumn('links');

            // Restore old linkedin column
            $table->string('linkedin')->nullable()->after('phone');
        });
    }
};
