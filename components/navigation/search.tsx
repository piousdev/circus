import { UserButton } from "@clerk/nextjs";
import { Code, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "../ui/command";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const SearchButton = () => {
    return (
        <div className="w-full flex-1 md:w-auto md:flex-none">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Button variant="outline" className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
                            <span className="hidden lg:inline-flex">Search...</span>
                            <span className="inline-flex lg:hidden">Search...</span>
                            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">⌘ K</kbd>
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="p-0">
                    <Command>
                        <CommandInput placeholder="Type a command or search..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>
                                    <Gamepad2 className="mr-2 h-4 w-4" />
                                    <Link href='/hub'>Hub</Link>
                                </CommandItem>
                                <CommandItem>
                                    <Code className="mr-2 h-4 w-4" />
                                    <Link href='/playground' className='cursor-pointer'>Playground</Link>
                                    <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Commands">
                                <CommandItem>
                                    <span>
                                        <UserButton showName />
                                    </span>
                                    <CommandShortcut>⌘U</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <span>Search community</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    )
};

export default SearchButton;