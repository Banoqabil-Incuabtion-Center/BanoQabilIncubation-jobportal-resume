import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {

    const {auth} = usePage<SharedData>().props; 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className='font-bold text-4xl'>Welcome, {auth?.user?.name}</h1>
            </div>
        </AppLayout>
    );
}
