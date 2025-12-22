import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { logout } from "@/routes";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { BriefcaseBusiness, LogOut } from "lucide-react";

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

interface EmployersProps {
    jobs: {
        data: Job[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    canRegister?: boolean;
}




export default function ForEmployers({ jobs }: EmployersProps) {

    const isMobile = useIsMobile()
    const { url } = usePage()
    // const { auth } = usePage<SharedData>().props;

    const links = [
        { href: "/", label: "Find Jobs" },
        // { href: "/jobSeeker/aboutUs", label: "About Us" },
        // { href: "/jobSeeker/appliedJobs", label: "Applied Jobs" },
        // { href: "/jobSeeker/contactUs", label: "Contact Us" },
        { href: "/jobSeeker/forEmployers", label: "For Employers" },
    ]
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




            </header >
            <div className="flex flex-col md:flex-row items-center justify-between mt-10 mx-5 md:mx-20 gap-6">
                <div >
                    <h1 className="flex text-4xl font-bold items-center mt-20 mx-20">Looking to Expand Your Team?</h1>
                    <p className="text-lg text-gray-700 mx-20">Post your job and connect with skilled professionals now.</p>
                    <div className="mt-10 mx-20">
                        <Link
                            href={'/register/recruiter'}
                            className="text-white bg-[#309689] px-4 py-2 rounded hover:bg-teal-600 transition-colors"
                        >
                            Post a Job
                        </Link>
                    </div>

                </div>

                
                    <img className="m-20 w-full max-w-md md:max-w-lg lg:max-w-xl" src="/LTS-hero-hire-social-share.jpg" alt="img" />
                
            </div>




        </div>
    )
}