<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\MediaLibrary\HasMedia; // for spatie Media
use Spatie\MediaLibrary\InteractsWithMedia;  // for spatie Media
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Don't forget this for conversions!



class User extends Authenticatable implements HasMedia
{
    use InteractsWithMedia;
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $with = ['media']; // always load media relationship
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'company_id',
    ];
    protected $appends = ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        $url = $this->getFirstMediaUrl('avatar');
        return $url ?: null; // Return null if empty string
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->useDisk('public')
            ->singleFile(); // only ONE profile picture
    }

    public function registerMediaConversions(Media $media = null): void
    {
        // Convert all images to webp format for better performance
        $this->addMediaConversion('webp')
            ->format('webp')
            ->nonQueued(); // Use nonQueued for smaller apps, or queued for larger ones

        // Create a thumbnail version (optional but very useful!)
        $this->addMediaConversion('thumb')
            ->format('webp') // Also make the thumbnail webp
            ->width(300)
            ->height(200)
            ->sharpen(10) // Make it a bit sharper
            ->nonQueued();
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }


    public function company()
    {
        return $this->belongsTo(Company::class);
    }


    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }

    public function savedJobs(): BelongsToMany
    {
        return $this->belongsToMany(Job::class, 'saved_jobs', 'user_id', 'job_id');
    }

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function appliedJobs(): BelongsToMany
    {
        return $this->belongsToMany(
            Job::class,
            'job_applications',
            'user_id',
            'job_id'
        )->withTimestamps()
            ->orderBy('job_applications.created_at', 'desc');;
    }

    //     public function applied()
    // {
    //     return $this->hasMany(JobApplication::class, 'user_id'); // one-to-many, not many-to-many
    // }
}
