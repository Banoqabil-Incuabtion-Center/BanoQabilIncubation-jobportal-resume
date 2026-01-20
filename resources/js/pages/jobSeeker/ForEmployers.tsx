import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link, usePage } from '@inertiajs/react';
import { BriefcaseBusiness } from 'lucide-react';

export default function ForEmployers() {
    const isMobile = useIsMobile();
    const { url } = usePage();
    // const { auth } = usePage<SharedData>().props;

    const links = [
        { href: '/', label: 'Find Jobs' },
        { href: '/jobSeeker/forEmployers', label: 'For Employers' },
    ];
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
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </header>
            <div className="mx-5 mt-10 flex flex-col items-center justify-between gap-6 md:mx-20 md:flex-row">
                <div>
                    <h1 className="mx-20 mt-20 flex items-center text-4xl font-bold">
                        Looking to Expand Your Team?
                    </h1>
                    <p className="mx-20 text-lg text-gray-700">
                        Post your job and connect with skilled professionals
                        now.
                    </p>
                    <div className="mx-20 mt-10">
                        <Link
                            href={'/register/recruiter'}
                            className="rounded bg-[#309689] px-4 py-2 text-white transition-colors hover:bg-teal-600"
                        >
                            Post a Job
                        </Link>
                    </div>
                </div>

                <img
                    className="m-20 w-full max-w-md md:max-w-lg lg:max-w-xl"
                    src="/LTS-hero-hire-social-share.jpg"
                    alt="img"
                />
            </div>
        </div>
    );
}
