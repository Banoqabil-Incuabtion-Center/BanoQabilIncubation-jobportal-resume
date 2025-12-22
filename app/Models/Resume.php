<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    //

    use HasFactory;

    protected $fillable = [
        'user_id', 'full_name', 'designation', 'email', 'phone', 'links', 'address', 'summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages', 'section_order'
    ];

    protected $casts = [
        'links' => 'array',
        'experience' => 'array',
        'education' => 'array',
        'skills' => 'array',
        'certifications' => 'array',
        'projects' => 'array',
        'languages' => 'array',
        'section_order' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
