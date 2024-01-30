import Navbar from "@/components/navigation/navbar";
import React from "react";

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='flex h-full flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-200 to-orange-800'>
            <Navbar />
            {children}
        </div>
    )
}

export default ProtectedLayout;