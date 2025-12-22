<?php

namespace App\Actions\Fortify;

use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {

        $role = $input['role'] ?? 'jobSeeker';
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'role' => ['required', 'in:jobSeeker,recruiter'],
            'company' => ['nullable', 'string', 'max:255'],
        ])->validate();

        $companyId = null;

        if ($role === 'recruiter' && !empty($input['company'])) {
            $company = Company::firstOrCreate(['name' => $input['company']]);
            $companyId = $company->id; // use the ID of the newly created or existing company
        }

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $role,
            'company_id' => $companyId,
        ]);
    }
}
