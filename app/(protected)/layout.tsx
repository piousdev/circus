import Navbar from "@/components/navigation/navbar";
import React from "react";

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex h-full flex-col justify-between text-forground'>
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout;