import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface JobForm {
    title: string;
    salary: string;
}

interface Props {
    onSuccess: () => void;
}

export default function CreateJobForm({ onSuccess }: Props) {
    const { data, setData, post, processing, errors } = useForm<JobForm>({
        title: '',
        salary: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/jobs', {
            onSuccess: () => {
                toast("Job has been created", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                onSuccess(); // close modal or refresh list
            },

        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <FieldSet>
                    <FieldDescription>Fill Accurate Details</FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor='title'>Title</FieldLabel>
                            <Input
                                id="title"
                                placeholder="PHP Developer"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}

                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='salary'>Salary</FieldLabel>
                            <Input
                                id="salary"
                                placeholder="$50,000 USD"
                                value={data.salary}
                                onChange={e => setData('salary', e.target.value)}

                            />
                            {errors.salary && <p className="text-red-500">{errors.salary}</p>}
                        </Field>
                    </FieldGroup>
                </FieldSet>

                <Field>
                    <div className="flex justify-end space-x-2">
                        <Button
                            className='bg-[#309689]'
                            type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create Job'}
                        </Button>
                    </div>
                </Field>

            </FieldGroup>
        </form>

    );
}

