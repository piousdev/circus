"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ThemeItemProps {
    themeName: string;
    themeValue: string;
    setTheme: (theme: string) => void;
}

const ThemeItem: React.FC<ThemeItemProps> = ({ themeName, themeValue, setTheme }) => (
    <DropdownMenuItem onClick={() => setTheme(themeValue)}>
        {themeName}
    </DropdownMenuItem>
);

const ThemeToggleButton = React.forwardRef<HTMLButtonElement, {}>((props, ref) => (
    <Button ref={ref} className="w-7 h-7" variant="secondary" size="icon" {...props}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
    </Button>
));

ThemeToggleButton.displayName = "ThemeToggleButton";

export default ThemeToggleButton;

export const ToggleTheme = () => {
    const { setTheme } = useTheme();

    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
        { name: 'System', value: 'system' },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ThemeToggleButton />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {themes.map(theme => (
                    <ThemeItem
                        key={theme.value}
                        themeName={theme.name}
                        themeValue={theme.value}
                        setTheme={setTheme}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}