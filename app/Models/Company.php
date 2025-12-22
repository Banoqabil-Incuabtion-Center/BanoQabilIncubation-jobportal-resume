<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    use HasFactory;

    protected $table = 'companies';

    protected $guarded = [];

    public function users(){
        return $this->hasMany(User::class);
    }

    public function job(){
        return $this->hasMany(Job::class);
    }
}
