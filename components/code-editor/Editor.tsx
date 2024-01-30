import { materialDark } from "@/components/code-editor/material-dark";
import { materialLight } from "@/components/code-editor/material-light";
import { defaultKeymap } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useRef } from 'react';

interface EditorProps {
    language: string;
    theme: string;
    onChange: (content: string) => void;
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

const themeExtension = (theme: string) => {
    return theme === 'dark' ? materialDark : materialLight;
}

const Editor = ({language, theme, onChange}: EditorProps) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const updateListener = EditorView.updateListener.of((update) => {
            if (update.changes) {
                onChange(update.state.doc.toString());
            }
        });

        const startState = EditorState.create({
            doc: "Hello World",
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

    return <div ref={editorRef} />;
};

export default Editor;