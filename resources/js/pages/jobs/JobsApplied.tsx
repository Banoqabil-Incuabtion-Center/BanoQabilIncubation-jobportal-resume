import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

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
    email: string;
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
                <h2 className="mx-5 my-3 flex items-center text-4xl font-bold">
                    Applied Jobs
                </h2>

                {applications?.data?.map((app) => (
                    <Card
                        key={app.id}
                        className="mx-5 my-5 block transition-transform hover:scale-[1.01]"
                    >
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="font-mono">
                                    {app.job?.title}
                                </CardTitle>
                                <CardTitle className="text-[#309689]">
                                    {app.seeker.name}
                                </CardTitle>
                                <CardContent>
                                    <span className="font-bold">Resume:</span>{' '}
                                    {app.resume ? (
                                        <a
                                            href={`/resume/${app.resume.replace('resumes/', '')}`}
                                            target="_blank"
                                            className="text-blue-500"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        'Not Uploaded'
                                    )}
                                </CardContent>
                                <CardContent>
                                    <span className="font-bold">Letter:</span>{' '}
                                    {app.cover_letter || 'No Cover Letter'}
                                </CardContent>
                                <CardFooter>
                                    <span className="font-bold">
                                        Applied at:
                                    </span>{' '}
                                    {app.applied_at}
                                </CardFooter>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
