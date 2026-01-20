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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { login, logout, register } from '@/routes';
import { SharedData } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, Bookmark, BriefcaseBusiness, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface SavedProps {
    jobs: {
        data: Job[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    canRegister?: boolean;
}

export default function SavedJobs({ jobs, canRegister = true }: SavedProps) {
    const isMobile = useIsMobile();
    const { url } = usePage();
    const currentPath = url.split('?')[0];
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const avatarSrc = user?.avatar_url || user?.avatar || undefined;

    // Get user initials for fallback
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
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
    const [savedJobs, setSavedJobs] = useState<number[]>([]); // store saved job IDs
    const [animateId, setAnimateId] = useState<number | null>(null);

    useEffect(() => {
        if (auth.user) {
            // Fetch saved job IDs from API endpoint
            fetch('/api/user/saved-jobs')
                .then((res) => res.json())
                .then((data: number[]) => setSavedJobs(data));
        }
    }, [auth]);

    const handlePagination = (url?: string | null) => {
        if (!url) return
        router.visit(url, {
    preserveState: true,
    preserveScroll: true,
  })
    };

    const [hasUnread, setHasUnread] = useState(true);

    const showSheet = url !== '/resume';
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    return (
        <div>
            <header className="flex w-full items-center justify-between px-4 py-4 md:px-6">
                {showSheet && (
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        {/* Logo + Mobile Trigger */}
                        <SheetTrigger asChild className="md:hidden">
                            <button className="flex items-center text-2xl font-bold focus:outline-none">
                                <BriefcaseBusiness className="mr-2" />
                                <h4 className="text-xl text-[#309689]">
                                    Job Portal
                                </h4>
                            </button>
                        </SheetTrigger>

                        {/* Desktop Logo */}
                        <div className="hidden items-center text-2xl font-bold md:flex">
                            <BriefcaseBusiness className="mr-2" />
                            <h3 className="text-[#309689]">Job Portal</h3>
                        </div>

                        {/* Mobile Sheet */}
                        <SheetContent side="right" className="w-64">
                            <nav className="mt-10 flex flex-col gap-3">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`m-1 rounded-full px-3 py-2 ${
                                            currentPath === link.href
                                                ? 'bg-[#309689] text-white'
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <a
                                    href="/resume"
                                    onClick={() => {
                                        setIsSheetOpen(false);
                                        cleanup();
                                    }}
                                    className={`mx-1 rounded-full px-3 py-2 ${
                                        currentPath === '/resume'
                                            ? 'bg-[#309689] text-white'
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    Resume
                                </a>
                            </nav>
                        </SheetContent>
                    </Sheet>
                )}
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <NavigationMenu viewport={isMobile}>
                        <NavigationMenuList className="flex flex-wrap gap-1">
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

                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/jobSeeker/savedJobs"
                                className="rounded p-2 transition"
                            >
                                {currentPath === '/jobSeeker/savedJobs' ? (
                                    <Bookmark
                                        className="h-5 w-5 text-[#309689]"
                                        fill="currentColor"
                                    />
                                ) : (
                                    <Bookmark className="h-5 w-5 text-gray-600" />
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
                                       src={String(avatarSrc)} alt={user?.name || "User avatar"} />
                                    <AvatarFallback className="bg-[#309689] text-white"> {user?.name ? getUserInitials(user.name) : 'U'}</AvatarFallback>
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
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </header>

            <div className="mt-10 px-4 sm:px-6 md:px-12 lg:px-20">
                <h3 className="mx-10 my-3 flex justify-center text-3xl font-bold sm:text-4xl">
                    Saved Jobs
                </h3>
                {jobs?.data?.map((job) => (
                    <Card
                        key={job.id}
                        className="mx-10 my-5 block transition-transform hover:scale-[1.01]"
                    >
                        <CardHeader className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                            <div>
                                <CardTitle className="text-center font-mono sm:text-left">
                                    {job.company?.name}
                                </CardTitle>
                                <CardTitle className="text-center text-[#309689] sm:text-left">
                                    {job.title}
                                </CardTitle>
                                <CardDescription className="text-center sm:text-left">
                                    Salary: {job.salary}
                                </CardDescription>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Link
                                    // href="/jobSeeker/savedJobs"
                                    className="rounded p-0 transition"
                                    onClick={() => {
                                        if (!auth.user) return;

                                        setAnimateId(job.id);
                                        setTimeout(
                                            () => setAnimateId(null),
                                            300,
                                        );

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
                                                                      id !==
                                                                      job.id,
                                                              )
                                                            : [...prev, job.id],
                                                    );
                                                },
                                            },
                                        );
                                    }}
                                >
                                    {savedJobs.includes(job.id) ? (
                                        <Bookmark
                                            className={`h-7 w-7 text-[#309689] ${animateId === job.id ? 'animate-pop' : ''}`}
                                            fill="currentColor"
                                        />
                                    ) : (
                                        <Bookmark
                                            className={`h-7 w-7 text-gray-600 ${animateId === job.id ? 'animate-pop' : ''}`}
                                        />
                                    )}
                                    {/* {url === "/jobSeeker/savedJobs" ? (
                                            <Bookmark className="h-6 w-6 text-[#309689]" fill="currentColor" />
                                        ) : (
                                            <Bookmark className="h-6 w-6 text-gray-600" />
                                        )} */}
                                </Link>
                                <Link
                                    href={`/jobSeeker/apply/${job.id}`}
                                    className="rounded bg-[#309689] px-3 py-1.5 text-white transition-colors hover:bg-teal-600"
                                >
                                    Apply
                                </Link>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Pagination className="mt-6 mb-6">
                <PaginationContent>
                    {/* previous */}
                    <PaginationPrevious
                    href ={jobs.links[0].url || undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePagination(jobs.links[0].url)}}
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
                                href = {link.url || undefined}
                                    isActive={link.active}
                                    onClick={(e) =>  {
                                        e.preventDefault();
                                        handlePagination(link.url)}}
                                >
                                    {link.label.replace(/&laquo;|&raquo;/g, '')}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {/* next */}
                    <PaginationNext
                    href={jobs.links[jobs.links.length -1].url || undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePagination(
                                jobs.links[jobs.links.length - 1].url,
                            )
                        }}
                        className={
                            !jobs.links[jobs.links.length - 1].url
                                ? 'pointer-events-none opacity-50'
                                : ''
                        }
                    />
                </PaginationContent>
            </Pagination>
        </div>
    );
}
