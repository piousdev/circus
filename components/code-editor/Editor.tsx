import React, { useRef, useEffect } from 'react';
import { EditorState } from "@codemirror/state";
import {EditorView, gutter, keymap, lineNumbers} from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import {basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {html} from "@codemirror/lang-html";
import {css} from "@codemirror/lang-css";

const Editor = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: "Hello World",
            extensions: [keymap.of(defaultKeymap)]
        });

        const view = new EditorView({
            extensions: [
                basicSetup,
                lineNumbers(),
                gutter({class: "cm-mygutter"}),
                javascript(),
                html(),
                css(),
            ],
            state: startState,
            parent: editorRef.current
        });

        return () => {
            view.destroy(); // Clean up on unmount
        };
    }, []);

    return <div ref={editorRef} />;
};

export default Editor;