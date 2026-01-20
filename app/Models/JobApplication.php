<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    //
    protected $table = 'job_applications';

    protected $fillable = [
        'job_id',
        'user_id',
        'full_name',
        'email',
        'phone_no',
        'resume',
        'cover_letter',
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function seeker()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
