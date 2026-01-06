import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { login, logout, register } from "@/routes"
import { SharedData } from "@/types"
import { Link, router, usePage } from "@inertiajs/react"
import { Bell, Bookmark, BriefcaseBusiness, LogOut } from "lucide-react"
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export default function ContactUs({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const isMobile = useIsMobile()
    const { url } = usePage()

    const links = [
        { href: "/", label: "Home" },
        { href: "/jobSeeker/aboutUs", label: "About Us" },
        { href: "/jobSeeker/appliedJobs", label: "Applied Jobs" },
        { href: "/jobSeeker/contactUs", label: "Contact Us" },
    ]
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const avatarSrc = user?.avatar_url || user?.avatar || undefined;

    // Get user initials for fallback
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const showSheet = url !== ('/resume');

    const [hasUnread, setHasUnread] = useState(true);
    return (
        <div>
            <header className="flex items-center justify-between w-full px-4 md:px-6 py-4">
                {showSheet && (
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
                                        className={`px-3 py-2 m-1 rounded-full ${url === link.href
                                            ? "bg-[#309689] text-white"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <a
                                    onClick={() => {
                                        setIsSheetOpen(false);
                                        cleanup();
                                    }}
                                    href="/resume"
                                    className={`mx-1 px-3 py-2 rounded-full ${url === "/resume"
                                        ? "bg-[#309689] text-white"
                                        : "hover:bg-gray-100"
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


                <div className="flex items-center gap-4 align-baseline">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/jobSeeker/savedJobs"
                                className="p-2 rounded transition">
                                {url === "/jobSeeker/savedJobs" ? (
                                    <Bookmark className="h-5 w-5 text-[#309689]" fill="currentColor" />
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

                                    <button className="p-2 rounded transition"
                                        onClick={() => setHasUnread(false)}>
                                        <Bell
                                            className={`h-5 w-5 cursor-pointer ${hasUnread ? "text-[#309689]" : "text-gray-600"
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
                                        src={String(avatarSrc)} alt={user?.name || "User avatar"} />
                                    <AvatarFallback className="bg-[#309689] text-white"> {user?.name ? getUserInitials(user.name) : 'U'}</AvatarFallback>
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

        </div >
    )
}