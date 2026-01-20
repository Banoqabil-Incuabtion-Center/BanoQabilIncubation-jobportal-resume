// import { dashboard} from '@/routes';
import { useState } from 'react';

import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
// import Modal from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { login, logout, register } from '@/routes';
import { Inertia } from '@inertiajs/inertia';
import { Bell, Bookmark, BriefcaseBusiness, LogOut } from 'lucide-react';
// import { DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';

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

interface IndexProps {
    jobs: {
        data: Job[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    canRegister: boolean;
}

export default function Index({ jobs, canRegister = true }: IndexProps) {
    const isMobile = useIsMobile();
    const { url } = usePage();
    const { auth } = usePage<SharedData>().props;

    // console.log("jobs:", jobs);
    // console.log("auth:", auth);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/jobSeeker/aboutUs', label: 'About Us' },
        { href: '/jobSeeker/appliedJobs', label: 'Applied Jobs' },
        { href: '/jobSeeker/contactUs', label: 'Contact Us' },
    ];

    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
    };

    const [hasUnread, setHasUnread] = useState(true);
    const handlePagination = (url?: string | null) => {
        if (!url) return;
        Inertia.get(url, {}, { preserveState: true });
    };

    const [savedJobs, setSavedJobs] = useState<number[]>([]); // store saved job IDs

    const [animateId, setAnimateId] = useState<number | null>(null);
    return (
        <div>
            <header className="flex w-full items-center justify-between px-6 py-4">
                <div className="flex flex-wrap items-center text-2xl font-bold">
                    <BriefcaseBusiness className="mr-2" />
                    <h3 className="text-[#309689]"> Job Portal</h3>
                </div>

                <div>
                    <NavigationMenu viewport={isMobile}>
                        <NavigationMenuList className="flex-wrap">
                            {links.map((link) => (
                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={link.href}
                                            className={`rounded px-3 py-1 ${
                                                url === link.href
                                                    ? 'bg-[#309689] text-white' // active link style
                                                    : 'hover:bg-gray-200'
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <a
                                        href="/resume"
                                        className={`rounded px-3 py-1 ${
                                            window.location.pathname ===
                                            '/resume'
                                                ? 'bg-[#309689] text-white'
                                                : 'hover:bg-gray-200'
                                        }`}
                                    >
                                        Resume
                                    </a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4 align-baseline">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/jobSeeker/savedJobs"
                                className="rounded p-2 transition"
                            >
                                {url === '/jobSeeker/savedJobs' ? (
                                    <Bookmark
                                        className="h-6 w-6 text-[#309689]"
                                        fill="currentColor"
                                    />
                                ) : (
                                    <Bookmark className="h-6 w-6 text-gray-600" />
                                )}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Saved Jobs</p>
                        </TooltipContent>
                    </Tooltip>

                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className="rounded p-2 transition"
                                        onClick={() => setHasUnread(false)}
                                    >
                                        <Bell
                                            className={`h-6 w-6 cursor-pointer ${
                                                hasUnread
                                                    ? 'text-[#309689]'
                                                    : 'text-gray-600'
                                            }`}
                                        />
                                    </button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p>Notifications</p>
                            </TooltipContent>
                        </Tooltip>

                        <DropdownMenuContent className="mr-3 w-64" align="end">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    You have 3 new job recommendations
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Your application for XYZ Company has been
                                    viewed
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    New message from ABC Recruiter
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    New notification
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        className="cursor-pointer"
                                        src="/avatar.jpg"
                                        alt="avatar image"
                                    />
                                    <AvatarFallback>IMG</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="mr-3 w-56"
                                align="start"
                            >
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            className="flex w-full items-center"
                                            href={logout()}
                                            as="button"
                                            onClick={handleLogout}
                                            data-test="logout-button"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] bg-[#309689] px-5 py-1.5 text-sm leading-normal text-[#fff] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            )}
                            <Link
                                href={'/jobSeeker/forEmployers'}
                                className="inline-block border-[#19140035] text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                For Employers/Post a Job
                            </Link>
                        </>
                    )}
                </div>
            </header>
            {/* ✅ Job Cards Section */}
            {jobs?.data?.map((job) => (
                <Card
                    key={job.id}
                    className="mx-20 my-5 block transition-transform hover:scale-[1.01]"
                >
                    <CardHeader className="flex flex-row items-start justify-between">
                        <div>
                            <CardTitle className="font-mono">
                                {job.company?.name ?? 'No Company'}
                            </CardTitle>
                            <CardTitle className="text-[#309689]">
                                {job.title}
                            </CardTitle>
                            <CardDescription>
                                Salary: {job.salary}
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 self-start">
                            <Link
                                // href="/jobSeeker/savedJobs"
                                className="rounded p-2 transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!auth.user)
                                        return router.visit(login());

                                    // trigger animation
                                    setAnimateId(job.id);
                                    setTimeout(() => setAnimateId(null), 300);

                                    router.post(
                                        `/jobSeeker/save-job/${job.id}`,
                                        {},
                                        {
                                            onSuccess: () => {
                                                // toggle in UI
                                                setSavedJobs((prev) =>
                                                    prev.includes(job.id)
                                                        ? prev.filter(
                                                              (id) =>
                                                                  id !== job.id,
                                                          )
                                                        : [...prev, job.id],
                                                );
                                            },
                                        },
                                    );
                                }}
                            >
                                {auth.user && savedJobs.includes(job.id) ? (
                                    <Bookmark
                                        className={`h-6 w-6 text-[#309689] ${animateId === job.id ? 'animate-pop' : ''}`}
                                        fill="currentColor"
                                    />
                                ) : (
                                    <Bookmark
                                        className={`h-6 w-6 text-gray-600 ${animateId === job.id ? 'animate-pop' : ''}`}
                                    />
                                )}
                            </Link>
                            <Link
                                href={`/jobs/apply/${job.id}`}
                                className="rounded bg-[#309689] px-4 py-2 text-white transition-colors hover:bg-teal-600"
                            >
                                Apply
                            </Link>
                        </div>
                    </CardHeader>
                </Card>
            ))}
            {/* PAGINATION */}
            <Pagination>
                <PaginationContent>
                    {/* previous */}
                    <PaginationPrevious
                        onClick={() => handlePagination(jobs.links[0].url)}
                        className={
                            !jobs.links[0].url
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />

                    {/* page numbers */}
                    {jobs.links.slice(1, -1).map((link, index) => {
                        if (link.label === '…') {
                            return <PaginationEllipsis key={index} />;
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
                        );
                    })}

                    {/* next */}
                    <PaginationNext
                        onClick={() =>
                            handlePagination(
                                jobs.links[jobs.links.length - 1].url,
                            )
                        }
                        className={
                            !jobs.links[jobs.links.length - 1].url
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationContent>
            </Pagination>
            );
        </div>
    );
}
