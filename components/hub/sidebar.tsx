'use client';
import { cn } from '@/lib/utils';
import { Dna, Flame, Link, LucideIcon, MessageCircle, SquarePen, TerminalSquare } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Route = {
    icon: LucideIcon;
    href: string;
    label: string;
    external?: boolean;
};

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const routes: Route[] = [
        {
            icon: Flame,
            href: '/hub/new-releases',
            label: 'New Releases',
        },
        {
            icon: SquarePen,
            href: 'hub/creators',
            label: 'Creators',
        },
        {
            icon: Dna,
            href: 'hub/genres',
            label: 'Genres',
        },
        {
            icon: MessageCircle,
            href: 'hub/reviews',
            label: 'Reviews',
        },
        {
            icon: TerminalSquare,
            href: 'hub/developers',
            label: 'Developers',
        },
    ];

    const onNavigate = (url: string) => {
        setIsSidebarExpanded(false);
        return router.push(url);
    };

    return (
        <div className='space-y-4 flex flex-col h-full text-primary bg-secondary mt-[3.5rem] pt-[2rem] w-[180px]'>
            <div className='p-3 flex flex-1 justify-center'>
                <div className='space-y-2'>
                    {routes.map((route, index) => (
                        <div
                            key={route.href}
                            className={cn('text-muted-forground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition', pathname === route.href && 'bg-primary-10 text-primary gap-4')}
                        >
                            {route.external ? (
                                <Link href={route.href} className='flex flex-col flex-1 gap-2 items-center'>
                                    <div>
                                        <route.icon className='h-5 w-5' />
                                    </div>
                                    <span>{route.label}</span>
                                </Link>
                            ) : (
                                <div
                                    onClick={() => onNavigate(route.href)}
                                    className='flex flex-1 flex-row gap-2 items-center'
                                >
                                    <div>
                                        <route.icon className='h-5 w-5' />
                                    </div>
                                    <span>{route.label}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};