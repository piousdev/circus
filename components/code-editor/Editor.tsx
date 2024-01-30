import { materialDark } from "@/components/code-editor/material-dark";
import { materialLight } from "@/components/code-editor/material-light";
import { defaultKeymap } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useRef, useState } from 'react';
import { BiLogoCss3, BiLogoHtml5, BiLogoJavascript } from "react-icons/bi";

interface EditorProps {
    language: string;
    theme: string;
    className?: string;
    onChange: (content: string) => void;
}

const greetings = "Greetings, circus";

const languagePlaceholder = (language: string) => {
    switch (language) {
        case 'javascript':
            return `console.log("${greetings}")`;
        case 'html':
            return `<h1>${greetings}</h1>`;
        case 'css':
            return `h1 { color: Black;}`;
        default:
            return '';
    }
}

const languageExtension = (language: string) => {
    switch (language) {
        case 'javascript':
            return javascript();
        case 'html':
            return html();
        case 'css':
            return css();
        default:
            return [];
    }
};

const getLanguageIcon = (language: string) => {
    switch (language) {
        case 'javascript':
            return <BiLogoJavascript className='text-2xl text-yellow-400' />;
        case 'html':
            return <BiLogoHtml5 className='text-2xl text-orange-500' />;
        case 'css':
            return <BiLogoCss3 className='text-2xl text-blue-500' />;
        default:
            return null;
    }
}

const themeExtension = (theme: string) => {
    return theme === 'dark' ? materialDark : materialLight;
}


const Editor = ({language, theme, onChange}: EditorProps) => {
    const editorRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        if (!editorRef.current) return;

        const updateListener = EditorView.updateListener.of((update) => {
            if (update.changes) {
                onChange(update.state.doc.toString());
            }
        });

        const startState = EditorState.create({
            doc: languagePlaceholder(language),
            extensions: [
                basicSetup,
                updateListener,
                themeExtension(theme),
                keymap.of(defaultKeymap),
                languageExtension(language)
            ]
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current
        });

        return () => {
            view.destroy();
        };
    }, [language, theme, onChange]);

    return (
        <div className=''>
            <div className='flex justify-between items-center p-[0.5em]'>
                {getLanguageIcon(language)}
            </div>
            <div className='editor' ref={editorRef} />
        </div>
    )
};

export default Editor;