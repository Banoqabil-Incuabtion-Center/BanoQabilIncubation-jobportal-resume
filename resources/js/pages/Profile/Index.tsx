import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import { login, logout, register } from "@/routes";
import { SharedData } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Bell, Bookmark, BriefcaseBusiness, Camera, LogOut, Trash2, UserRoundPen } from "lucide-react";
import { useRef, useState } from "react";
import { router } from '@inertiajs/react';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
    avatar_url?: string | null;
}



interface IndexProps {
    canRegister?: boolean;
}

function Index({ canRegister = true }: IndexProps) {
    
    const isMobile = useIsMobile()
    const { url } = usePage()
    const currentPath = url.split('?')[0];
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const avatarSrc = user?.avatar_url || user?.avatar || undefined;

    console.log('User data:', user);
    console.log('Avatar URL:', user?.avatar_url);


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

    // Image upload functionality
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const showSheet = url !== ('/resume');
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };


    const { delete: destroy } = useForm<{ avatar: File | null }>({
        avatar: null,
    });

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setUploading(true);

            // Use router.post directly
            router.post('/profile/avatar',
                { avatar: file },  // Data object
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedFile(null);
                        window.location.reload();
                    },
                    onError: (errors) => {
                        alert(errors.avatar || 'Upload failed');
                        setSelectedFile(null);
                    },
                }
            );
        }
    };


    const handleRemove = () => {
        if (!confirm('Are you sure you want to remove your profile picture?')) return;

        destroy('/profile/avatar', {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedFile(null); // Clear preview
            },
            onError: () => {
                alert('Failed to remove avatar');
            }
        });
    };
    // Get user initials for fallback
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };


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
                                href="/resume"
                                onClick={() => {
                                    setIsSheetOpen(false);
                                    cleanup();
                                }}
                                className={`mx-1 px-3 py-2 rounded-full ${window.location.pathname === "/resume"
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
                                    <Link href="/resume" className={`px-3 py-1 rounded ${window.location.pathname === "/resume"
                                        ? "bg-[#309689] text-white"
                                        : "hover:bg-gray-200"
                                        }`}>Resume</Link>
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
                                    <AvatarFallback className="bg-[#309689] text-white">
                                        {user?.name ? getUserInitials(user.name) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 mr-3" align="start">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            className="flex items-center w-full"
                                            href="/Profile/Index"
                                        >
                                            <UserRoundPen className="mr-2 h-4 w-4" />
                                            My Profile
                                        </Link>
                                    </DropdownMenuItem>
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


            {/* Avatar Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                        Update your profile picture. Recommended size: 400x400px
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar Display */}
                        <div className="relative">
                            <Avatar className="h-32 w-32">
                                <AvatarImage
                                    src={String(user?.avatar_url || undefined)}  //  Use avatar_url directly
                                    alt={user?.name || "User avatar"}
                                />
                                <AvatarFallback className="bg-[#309689] text-white text-3xl">
                                    {user?.name ? getUserInitials(user.name) : 'U'}
                                </AvatarFallback>
                            </Avatar>

                            {/* PREVIEW IMAGE */}
                            {selectedFile && (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    className="h-32 w-32 rounded-full absolute top-0 left-0 object-cover border-2 border-[#309689]"
                                />
                            )}
                        </div>

                        {/* Avatar Actions */}
                        <div className="flex flex-col gap-3 items-center sm:items-start">
                            <Button
                                onClick={triggerFileInput}
                                disabled={uploading}
                                className="bg-[#309689] hover:bg-[#267a6f] text-white"
                            >
                                <Camera className="mr-2 h-4 w-4" />
                                {uploading ? 'Uploading...' : 'Change Photo'}
                            </Button>

                            {(user?.avatar_url || user?.avatar) && (
                                <Button
                                    onClick={handleRemove}
                                    disabled={uploading}
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove Photo
                                </Button>
                            )}

                            <p className="text-sm text-gray-500">
                                JPG, PNG or GIF. Max size 2MB
                            </p>
                        </div>
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </CardContent>
            </Card>

            {/* Personal Information Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                        Update your personal details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            defaultValue={user?.name}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue={user?.email}
                            placeholder="Enter your email"
                        />
                    </div>

                    <Button className="bg-[#309689] hover:bg-[#267a6f] text-white">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>


        </div>
    )
}

export default Index;