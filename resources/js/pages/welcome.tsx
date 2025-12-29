import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { login, logout, register } from "@/routes"
import { SharedData } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { Bell, Bookmark, BriefcaseBusiness, LogOut, Search } from "lucide-react"
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Inertia } from "@inertiajs/inertia"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
    canRegister?: boolean;
}



export default function Index({ jobs, canRegister = true }: IndexProps) {
    const isMobile = useIsMobile()
    const { url } = usePage()
    const currentPath = url.split('?')[0];
    const { auth } = usePage<SharedData>().props;

    // console.log("jobs:", jobs);
    // console.log("auth:", auth);

    const links = [
        { href: "/", label: "Home" },
        { href: "/jobSeeker/aboutUs", label: "About Us" },
        { href: "/jobSeeker/appliedJobs", label: "Applied Jobs" },
        { href: "/jobSeeker/contactUs", label: "Contact Us" },
    ]


    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
    };

    const [hasUnread, setHasUnread] = useState(true);

    const [savedJobs, setSavedJobs] = useState<number[]>([]); // store saved job IDs

    const [animateId, setAnimateId] = useState<number | null>(null);


    useEffect(() => {
        if (auth.user) {
            // Fetch saved job IDs from API endpoint
            fetch('/api/user/saved-jobs')
                .then(res => res.json())
                .then((data: number[]) => setSavedJobs(data));
        }
    }, [auth.user]);

    const handlePagination = (url?: string | null) => {
        if (!url) return
        Inertia.get(url, {}, { preserveState: true })
    }
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        router.get('/jobs', { search: searchTerm }, { preserveState: true });
    };
    return (
        <div>
            <header className="flex items-center justify-between w-full px-4 md:px-6 py-4">
                <Sheet>
                    {/* Logo + Mobile Trigger */}
                    <SheetTrigger asChild className="md:hidden">
                        <button className="flex items-center font-bold text-2xl focus:outline-none">
                            <BriefcaseBusiness className="mr-2" />
                            <h4 className="text-[#309689] text-xl">Job Portal</h4>
                        </button>
                    </SheetTrigger>

                    {/* Desktop Logo */}
                    <div className="hidden md:flex items-center font-bold text-2xl">
                        <BriefcaseBusiness className="mr-2" />
                        <h3 className="text-[#309689]">Job Portal</h3>
                    </div>

                    {/* Mobile Sheet */}
                    <SheetContent side="right" className="w-64">
                        <nav className="flex flex-col gap-3 mt-10 ">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 m-1 rounded-full ${currentPath === link.href
                                            ? "bg-[#309689] text-white"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <Link
                                href="/resume"
                                className={`mx-1 px-3 py-2 rounded-full ${currentPath === "/resume"
                                        ? "bg-[#309689] text-white"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                Resume
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>


                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <NavigationMenu viewport={isMobile}>

                        <NavigationMenuList className="flex gap-1">
                            {links.map((link) => (

                                <NavigationMenuItem key={link.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={link.href}
                                            className={`px-3 py-1 rounded ${currentPath === link.href
                                                ? "bg-[#309689] text-white" // active link style
                                                : "hover:bg-gray-200"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            ))}
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <a href="/resume" className={`px-3 py-1 rounded ${window.location.pathname === "/resume"
                                        ? "bg-[#309689] text-white"
                                        : "hover:bg-gray-200"
                                        }`}>Resume</a>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>

                    </NavigationMenu>

                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/jobSeeker/savedJobs"
                                className="p-2 rounded transition">
                                {url === "/jobSeeker/savedJobs" ? (
                                    <Bookmark className="h-6 w-6 text-[#309689]" fill="currentColor" />
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

                                    <button className="p-2 rounded transition"
                                        onClick={() => setHasUnread(false)}>
                                        <Bell
                                            className={`h-6 w-6 cursor-pointer ${hasUnread ? "text-[#309689]" : "text-gray-600"
                                                }`}
                                        />
                                    </button>

                                </DropdownMenuTrigger>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p>Notifications</p>
                            </TooltipContent>
                        </Tooltip>


                        <DropdownMenuContent className="w-64 mr-3" align="end">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    You have 3 new job recommendations
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Your application for XYZ Company has been viewed
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
                                        alt="avatar image" />
                                    <AvatarFallback>IMG</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mr-3" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            className="flex items-center w-full"
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
                                    className="bg-[#309689] inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#fff] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            )}
                            <Link
                                href={'/jobSeeker/forEmployers'}
                                className=" inline-block border-[#19140035] text-sm hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">For Employers/Post a Job</Link>
                        </>
                    )}

                </div>
            </header >

            <div className="flex flex-col items-center text-center px-4 md:px-0 mt-12">
                <h2 className="text-3xl sm:text-4xl font-bold">Find Your Dream Job Here</h2>
                <p className="mt-3 text-gray-400 text-sm sm:text-md">Connecting talent with Opportunity:Your Gateway to Success</p>
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-5 relative">
                    <Input className="w-full h-12 pr-24 rounded-full px-4 sm:px-6"
                        placeholder="Search here..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                    />
                    <Button
                        onClick={handleSearch}
                        className="absolute right-0 top-0 h-full bg-[#309689] hover:bg-teal-500 text-white px-4 sm:px-6 rounded-full flex items-center gap-2 transition-colors"
                    >
                        <Search size={18} />
                        <span className="hidden sm:inline font-medium">Search Job</span>
                    </Button>
                </div>
            </div>



            <div className="px-4 sm:px-6 md:px-12 lg:px-20 mt-10">
                <h1 className="flex text-3xl font-bold items-center px-10 mb-2">Recent Jobs</h1>
                <p className="text-md sm:text-sm mb-5 px-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero ipsum, doloribus sint vitae fugit est porro!</p>


                {/* ✅ Job Cards Section */}

                {jobs?.data?.map((job) => (
                    <Card key={job.id} className="block mx-10 my-5 transition-transform hover:scale-[1.01]">
                        <CardHeader className="flex flex-col sm:flex-row sm:justify-between items-center gap-3">
                            <div>
                                <CardTitle className="font-mono text-center sm:text-left ">{job.company?.name ?? "No Company"}</CardTitle>
                                <CardTitle className="text-[#309689] text-center sm:text-left ">{job.title}</CardTitle>
                                <CardDescription className="text-center sm:text-left ">Salary: {job.salary}</CardDescription>
                            </div>

                            <div className="flex gap-2 items-center justify-center">
                                <Link
                                    // href="/jobSeeker/savedJobs"
                                    className="p-0 rounded transition"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!auth.user)
                                            return router.visit(login());

                                        // trigger animation
                                        setAnimateId(job.id);
                                        setTimeout(() => setAnimateId(null), 300);


                                        router.post(`/jobSeeker/save-job/${job.id}`, {}, {
                                            onSuccess: () => {
                                                // toggle in UI
                                                setSavedJobs(prev =>
                                                    prev.includes(job.id)
                                                        ? prev.filter(id => id !== job.id)
                                                        : [...prev, job.id]
                                                );
                                            }
                                        })
                                    }}>
                                    {auth.user && savedJobs.includes(job.id) ? (
                                        <Bookmark className={`h-7 w-7 text-[#309689] ${animateId === job.id ? "animate-pop" : ""} flex justify-center`} fill="currentColor" />
                                    ) : (
                                        <Bookmark className={`h-7 w-7 text-gray-600 ${animateId === job.id ? "animate-pop" : ""} flex justify-center`} />
                                    )}
                                </Link>
                                <Link
                                    href={`/jobs/apply/${job.id}`}
                                    className="text-white bg-[#309689] px-3 py-1.5 align-baseline rounded hover:bg-teal-600 transition-colors"
                                >
                                    Apply
                                </Link>
                            </div>


                        </CardHeader>
                    </Card>
                ))
                }

                <Pagination className="mt-6 mb-6">
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
            </div>

        </div >
    )
}