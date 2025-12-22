import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface ApplicationForm {
    full_name: string;
    email: string;
    phone_no: string;
    cover_letter?: string;
    resume: File | null;
}

interface Company {
    id: number;
    name: string;
}
interface Job {
    id: number;
    company: Company;
    title: string;
    salary: number;
}

interface ApplyProps {
    jobs: {
        data: Job[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    onSuccess: () => void
    // canRegister?: boolean;
}

export default function Apply({ jobs, onSuccess }: ApplyProps) {
    const job = jobs?.data?.[0];
    const { data, setData, post, processing, errors } = useForm<ApplicationForm>({
        full_name: '',
        email: '',
        phone_no: '',
        cover_letter: '',
        resume: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/jobs/apply/${job.id}`, {
            onSuccess: () => {
                toast("Application has been submitted", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                onSuccess();
            },
            onError: (errors) => {
        
        if (errors?.error) {
            toast.error(errors.error);
        }
    },
        });
    };
    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-xl mt-20 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Job Application</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="p-4 rounded-xl">
                    {job ? (
                        <div className="bg-gray-50 p-6 shadow-md rounded-xl">
                            <h3 className="text-xl font-semibold mb-4">Applying for:</h3>
                            <p className="text-black mb-2 font-bold">{job.company.name}</p>
                            <p className="text-[#309689] mb-2 font-bold">{job.title}</p>
                            <p className="text-gray-700 mb-2"> {job.salary} per year</p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-6 shadow-md rounded-xl text-gray-500">
                            No job selected or available.
                        </div>
                    )}
                </div>

                <div className="lg:col-span-2 bg-white p-8 shadow-md rounded-xl">
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <FieldSet className="space-y-6">
                                <FieldLegend className="text-xl font-semibold text-[#309689]">Job Application Form</FieldLegend>
                                <FieldDescription className="text-gray-500">Fill accurate information</FieldDescription>


                                <FieldGroup>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Field>
                                            <FieldLabel className="font-medium text-gray-700">Full Name</FieldLabel>
                                            <Input
                                                className="mt-2"
                                                type="text"
                                                name="full_name"
                                                id="full_name"
                                                placeholder="Enter full name"
                                                value={data.full_name}
                                                onChange={(e) => setData('full_name', e.target.value)} />
                                        </Field>



                                        <Field>
                                            <FieldLabel className="font-medium text-gray-700">Email</FieldLabel>
                                            <Input
                                                className="mt-2"
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Enter your Email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)} />
                                        </Field>



                                        <Field>
                                            <FieldLabel className="font-medium text-gray-700">Phone No</FieldLabel>
                                            <Input
                                                className="mt-2"
                                                type="text"
                                                name="phone_no"
                                                id="phone_no"
                                                placeholder="Enter Your Phone number"
                                                value={data.phone_no}
                                                onChange={(e) => setData('phone_no', e.target.value)} />
                                        </Field>



                                        <Field>
                                            <FieldLabel className="font-medium text-gray-700">Upload resume(pdf, docx, doc)</FieldLabel>
                                            <Input
                                                className="mt-2"
                                                type="file"
                                                id="resume"
                                                name="resume"
                                                onChange={(e) => setData('resume', e.target.files?.[0] ?? null)} />
                                        </Field>
                                    </div>



                                    <Field>
                                        <FieldLabel className="font-medium text-gray-700">Cover Letter</FieldLabel>
                                        <textarea
                                            className="mt-2 w-full h-32 border rounded-md p-3 focus:ring focus:ring-blue-300 outline-none"
                                            name="cover_letter"
                                            id="cover_letter"
                                            placeholder="Tell us why you want this job..."
                                            value={data.cover_letter}
                                            onChange={(e) => setData('cover_letter', e.target.value)} />
                                    </Field>

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>

                        <div className="pt-4">
                            <Button
                                type="submit" disabled={processing} className="w-full text-lg text-white bg-[#309689] px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
                                {processing ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>

                    </form>
                </div>


            </div>
        </div>
    )
}