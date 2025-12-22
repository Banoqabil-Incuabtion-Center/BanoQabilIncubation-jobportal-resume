import { BriefcaseBusiness } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            </div> */}
            <div className="flex flex-wrap items-center font-bold text-2xl">
                <span className='mr-2'><BriefcaseBusiness/></span>
                <span className=" font-semibold">
                    Job <span className='text-[#309689]'>Portal</span>
                </span>
            </div>
        </>
    );
}
