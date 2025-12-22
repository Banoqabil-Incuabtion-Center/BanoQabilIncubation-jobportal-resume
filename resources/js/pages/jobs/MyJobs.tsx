import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { toast } from "sonner";
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import CreateJobForm from './Create';
import Edit from './Edit';
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Jobs',
        href: '/jobs/MyJobs',
    },
];

interface Job {
    id: number;
    company: Company;
    title: string;
    salary: number;
}

interface Company {
    id: number;
    name: string;
}

interface MyJobsProps {
    jobs: {
        data: Job[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}
interface JobData {
    id: number;
    title: string;
    salary: string;
}

interface ConfirmAlertProps {
    id: number;
}

function ConfirmAlert({ id }: ConfirmAlertProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        Inertia.delete(`/jobs/${id}`, {
            onSuccess: () => {
                toast.success('Job deleted succesfully!');
            },
            onError: () => toast.error("Failed to delete job"),
        });

        setOpen(false);
    };

    return (
        <>
            <Button
                variant="destructive"
                onClick={() => setOpen(true)}>
                <Trash2 />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Job</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600 mt-1">
                        Are you sure you want to delete this job? This action cannot be undone.
                    </p>

                    <DialogFooter className="mt-4">


                        <Button className='hover:bg-red-400' variant="destructive" onClick={handleDelete}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    );
}


export default function MyJobs({ jobs }: MyJobsProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const handlePagination = (url?: string | null) => {
        if (!url) return
        Inertia.get(url, {}, { preserveState: true })
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Jobs" />

            <div className="flex justify-between items-center m-3 ">
                <h1 className='text-black font-bold text-3xl'>My Jobs</h1>

                {/* Create Job Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>

                        <Button className='bg-[#309689] hover:bg-gray-300 hover:text-black'><Plus className='mr-0'/> Create Job</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Job
                            </DialogTitle>
                        </DialogHeader>

                        <CreateJobForm onSuccess={() => setIsDialogOpen(false)} />


                    </DialogContent>

                </Dialog>
            </div>

            {/* Edit Job Modal */}
            <div className="flex justify-between items-center m-3 ">
                <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
                    <DialogTrigger asChild>


                        {/* <Button variant="secondary"><Edit2 className="" /></Button> */}

                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Edit
                            </DialogTitle>
                        </DialogHeader>

                        {selectedJob && (
                            <Edit job={selectedJob} onSuccess={() => setIsEditOpen(false)} />
                        )}


                    </DialogContent>

                </Dialog>
            </div>

            {/* Job Cards Section */}
            <div className="p-3 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {jobs.data.length === 0 ? (
                    <p className="text-gray-500">No jobs found.</p>
                ) : (
                    jobs.data.map((job) => (
                        <Card key={job.id} className="hover:shadow-md transition">
                            <CardHeader>
                                <div className='flex justify-between'>
                                    <div>
                                        <CardTitle >{job.company?.name ?? "No Company"}</CardTitle>
                                        <CardTitle className="text-[#309689] text-lg">{job.title}</CardTitle>
                                        <CardDescription>Salary: {job.salary}</CardDescription>
                                    </div>
                                    <div>
                                        <Field orientation="horizontal">

                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setSelectedJob({
                                                        ...job,
                                                        salary: job.salary.toString()
                                                    });
                                                    setIsEditOpen(true);
                                                }}
                                            ><Edit2 /></Button>


                                            <ConfirmAlert id={job.id} />

                                        </Field>
                                    </div>
                                </div>


                            </CardHeader>
                        </Card>
                    ))
                )}
            </div>

            {/* PAGINATION */}
            <Pagination>
                <PaginationContent>
                    {/* previous */}
                    <PaginationPrevious
                        onClick={() => handlePagination(jobs.links[0].url)}
                        className={!jobs.links[0].url ? "opacity-50 pointer-events-none" : ""}
                    />

                    {/* page numbers */}
                    {jobs.links.slice(1, -1).map((link, index) => {
                        if (link.label === '…') {
                            return (
                                <PaginationEllipsis key={index} />
                            )
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={link.active}
                                    onClick={() => handlePagination(link.url)}
                                >
                                    {link.label.replace(/&laquo;|&raquo;/g, '')}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }

                    )}

                    {/* next */}
                    <PaginationNext
                        onClick={() => handlePagination(jobs.links[jobs.links.length - 1].url)}
                        className={!jobs.links[jobs.links.length - 1].url ? "opacity-50 pointer-events-none" : ""} />
                </PaginationContent>
            </Pagination>



        </AppLayout >
    );
}
