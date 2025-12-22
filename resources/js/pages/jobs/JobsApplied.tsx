import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Applied Jobs',
        href: '/jobs/jobsApplied',
    },
];

interface Application {
    id: number;
    job: Job;
    seeker: Seeker;
    resume: string;
    cover_letter: string;
    applied_at: string;
}
interface Job {
    id: number;
    title: string;
}

interface Seeker {
    id: number;
    name: string;
    email: string
}
interface Props {
    applications: {
        data: Application[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function JobsApplied({ applications }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <div>
            <h2 className="flex text-4xl font-bold items-center mx-20 my-3">Applied Jobs</h2>

            {applications?.data?.map(app => (
                <Card key={app.id} className="block mx-20 my-5 transition-transform hover:scale-[1.01]">
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                            <CardTitle className="font-mono">{app.job?.title}</CardTitle>
                            <CardTitle className="text-[#309689]">{app.seeker.name}</CardTitle>
                            <CardContent>Resume: {app.resume ?
                                <a href={`/resume/${app.resume.replace('resumes/', '')}`} target="_blank">View</a>
                                : 'Not Uploaded'}
                            </CardContent>
                            <CardContent>Letter: {app.cover_letter || 'No Cover Letter'}</CardContent>
                            <CardFooter>Applied at: {app.applied_at}</CardFooter>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
        </AppLayout>
    )
}