import LogoContainer from "@/components/navigation/logo-container";
import Search from "@/components/navigation/search";
import { ToggleTheme } from "@/components/toggle-theme";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Noticia_Text, Nunito_Sans } from "next/font/google";
import Link from "next/link";

const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '700'] });
const noticiaText = Noticia_Text({ subsets: ['latin'], weight: ['400', '700'] });

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <LogoContainer />
                    <nav className={cn("flex items-center justify-between gap-6 text-sm ml-[2rem]", nunitoSans.className)}>
                        <Link href="/hub">Hub</Link>
                        <Link href="/playground">Playground</Link>
                        <Link href="#">Developers</Link>
                        <Link href="#">Dashboard</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
                    <Search />
                    <UserButton afterSignOutUrl="/" />
                    <ToggleTheme />
                </div>
            </div>
        </header>
    );
};

export default Navbar