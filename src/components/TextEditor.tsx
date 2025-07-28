// import { $getRoot, $getSelection, EditorState } from "lexical";

// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { JSX, useRef, useState } from "react";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";

const onError = (error: Error) => {
  console.error(error);
};

interface Props {
  onChange?: (e: any) => void;
  value?: string;
  name: string;
}

export default function TextEditor(props: Props): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={`border rounded-3xl  focus:bg-muted/25 focus:outline-none p-2 ${
          isFocused ? "border-foreground/80" : "border-foreground/30"
        }`}
      >
        <textarea
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          name="content"
          className="w-full h-full max-h-60 rounded-2xl p-3 outline-none"
        ></textarea>
      </div>
    </>
  );
}
