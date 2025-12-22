import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { login, logout, register } from "@/routes"
import { SharedData } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { Bell, Bookmark, BriefcaseBusiness, CircleUser, LogOut } from "lucide-react"
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { useEffect, useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Inertia } from "@inertiajs/inertia"

interface JobApplication {
    id: number;
    company: Company;
    title: string;
    salary: number;
}

interface Company {
    id: number;
    name: string;
}

interface AppliedProps {
    jobs: {
        data: JobApplication[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    canRegister?: boolean;
}


export default function AppliedJobs({ jobs, canRegister = true }: AppliedProps) {
    const isMobile = useIsMobile()
    const { url } = usePage()
    const { auth } = usePage<SharedData>().props;

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

    const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('api/user/applied-jobs')
            .then((res) => res.json())
            .then((data) => {
                setAppliedJobs(data);
                setLoading(false);
            });
    }, []);

    const handlePagination = (url?: string | null) => {
        if (!url) return
        Inertia.get(url, {}, { preserveState: true })
    }


    return (
        <div>
            <header className="flex items-center justify-between w-full px-6 py-4">
                <div className="flex flex-wrap items-center font-bold text-2xl">
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
                                            className={`px-3 py-1 rounded ${url === link.href
                                                ? "bg-[#309689] text-white" // active link style
                                                : "hover:bg-gray-200"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                            ))}

                        </NavigationMenuList>

                    </NavigationMenu>

                </div>


                <div className="flex items-center gap-4 align-baseline">
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
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}

                </div>




            </header >
            <div>
                <h2 className="flex text-4xl font-bold items-center mx-20 my-3">Applied Jobs</h2>

                {jobs?.data?.map(job => (
                    <Card key={job.id} className="block mx-20 my-5 transition-transform hover:scale-[1.01]">
                        <CardHeader className="flex flex-row justify-between items-start">
                            <div>
                                <CardTitle className="font-mono">{job.company?.name}</CardTitle>
                                <CardTitle className="text-[#309689]">{job.title}</CardTitle>
                                <CardDescription>Salary: {job.salary}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Pagination className="mb-4">
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
    )
}