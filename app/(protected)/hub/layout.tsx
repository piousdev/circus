import { Sidebar } from "@/components/hub/sidebar";


const HubLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div>
            <div className='hidden md:flex flex-col fixed inset-y-0'>
                <Sidebar />
            </div>
            <main className='md:pl-20 pt-16 h-full'>
                {children}
            </main>
        </div>
    )
};

export default HubLayout;