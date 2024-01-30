'use client';
import Editor from "@/components/code-editor/Editor";
import {useEffect, useState} from "react";

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
            <div className='pane top-pane'>
                <Editor language='html' theme={isDarkMode ? 'dark' : 'light'} onChange={setHtmlContent} />
                <Editor language='css' theme={isDarkMode ? 'dark' : 'light'} onChange={setCssContent} />
                <Editor language='javascript' theme={isDarkMode ? 'dark' : 'light'} onChange={setJsContent} />
            </div>
            <div className='pane'></div>
            <iframe
                className='pane'
                title='output'
                sandbox='allow-scripts'
                srcDoc={getIframeSrcDoc()}
                style={{ border: 'none' }}
                width='100%'
                height='100%'
            />
        </>
    );
};

export default Playground;