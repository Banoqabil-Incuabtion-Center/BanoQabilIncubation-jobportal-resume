<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    //
    use HasFactory;
    // The table associated with the model, which we created manually
    protected $table = 'job_listings';

    //Add below property to avoid mass assignment error(laravel's security)
    // protected $fillable = ['employer_id', 'title', 'salary'];

    protected $guarded = [];

    public function recruiter(): BelongsTo{
        return $this->belongsTo(User::class, 'user_id');
    }
    public function applications(){
        return $this->hasMany(JobApplication::class);
    }

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function savedByUsers(): BelongsToMany{
        return $this->belongsToMany(User::class, 'saved_jobs', 'job_id', 'user_id');
    }
}
