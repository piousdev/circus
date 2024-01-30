'use client';
import Editor from "@/components/code-editor/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Save, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface PlaygroundProps {
    displayName: string
}

let documentCount = 0;

const Playground = ({displayName}: PlaygroundProps) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [cssContent, setCssContent] = useState<string>('');
    const [jsContent, setJsContent] = useState<string>('');

    useEffect(() => {
        documentCount += 1;
    }, []);

    const documentTitle = displayName ? `${displayName}_game` : `circus_game_${documentCount}`;
    const isDarkMode = false;

    const getIframeSrcDoc = () => {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${documentTitle}</title>
                <style>${cssContent}</style>
            </head>
            <body>
                <header>
                    <!-- Header content -->
                </header>
                <main>
                    ${htmlContent}
                </main>
                <footer>
                    <!-- Footer content -->
                </footer>
                <script>${jsContent}</script>
            </body>
            </html>
        `;
    };

    return (
      <>
        <div className='flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800'>
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold text-gray-900 dark-text-gray-100'>Document Title</h1>
            <p className='text-sm text-gray-500 dark-text-gray-400'>Document Description</p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button size='icon' variant='outline'>
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Button>
            <Button className='flex space-x-2' size='default' variant='outline'>
              <span className='text-md'>Star</span>
              <Star className='h-4 w-4' />
            </Button>
            <Button size='icon' variant='outline'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>More Options</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuLabel>More options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='flex gap-2'>
                <Trash2 className='text-red-400 h-4 w-4'/>
                <span className='text-red-400'>Delete</span>
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </Button>
            <Button className='flex space-x-2' size='default' variant='outline'>
              <span className='text-md'>Save</span>
              <Save className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <ResizablePanelGroup
            direction='vertical'
            className={cn('', isDarkMode ? 'bg-gray-900' : 'bg-gray-100')}
        >
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={30}>
                        <Editor
                            language='html'
                            theme={isDarkMode ? 'dark' : 'light'}
                            onChange={setHtmlContent}
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                        <Editor
                            language='css'
                            theme={isDarkMode ? 'dark' : 'light'}
                            onChange={setCssContent}
                        />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30}>
                        <Editor
                            language='javascript'
                            theme={isDarkMode ? 'dark' : 'light'}
                            onChange={setJsContent}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                <div className='iframe'>
                <iframe
                    className='pane'
                    title='output'
                    sandbox='allow-scripts'
                    srcDoc={getIframeSrcDoc()}
                    style={{ border: 'none' }}
                    width='100%'
                    height='100%'
                />
            </div>
            </ResizablePanel>
        </ResizablePanelGroup>
      </>
    );
};

export default Playground;