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

// const theme = {
//   ltr: "ltr",
//   rtl: "rtl",
//   paragraph: "editor-paragraph",
//   quote: "editor-quote",
//   heading: {
//     h1: "editor-heading-h1",
//     h2: "editor-heading-h2",
//     h3: "editor-heading-h3",
//     h4: "editor-heading-h4",
//     h5: "editor-heading-h5",
//     h6: "editor-heading-h6",
//   },
//   list: {
//     nested: {
//       listitem: "editor-nested-listitem",
//     },
//     ol: "editor-list-ol",
//     ul: "editor-list-ul",
//     listitem: "editor-listItem",
//     listitemChecked: "editor-listItemChecked",
//     listitemUnchecked: "editor-listItemUnchecked",
//   },
//   hashtag: "editor-hashtag",
//   image: "editor-image",
//   link: "editor-link",
//   text: {
//     bold: "editor-text-bold",
//     code: "editor-text-code",
//     italic: "editor-text-italic",
//     strikethrough: "editor-text-strikethrough",
//     subscript: "editor-text-subscript",
//     superscript: "editor-text-superscript",
//     underline: "editor-text-underline",
//     underlineStrikethrough: "editor-text-underlineStrikethrough",
//   },
//   code: "editor-code",
//   codeHighlight: {
//     atrule: "editor-tokenAttr",
//     attr: "editor-tokenAttr",
//     boolean: "editor-tokenProperty",
//     builtin: "editor-tokenSelector",
//     cdata: "editor-tokenComment",
//     char: "editor-tokenSelector",
//     class: "editor-tokenFunction",
//     "class-name": "editor-tokenFunction",
//     comment: "editor-tokenComment",
//     constant: "editor-tokenProperty",
//     deleted: "editor-tokenProperty",
//     doctype: "editor-tokenComment",
//     entity: "editor-tokenOperator",
//     function: "editor-tokenFunction",
//     important: "editor-tokenVariable",
//     inserted: "editor-tokenSelector",
//     keyword: "editor-tokenAttr",
//     namespace: "editor-tokenVariable",
//     number: "editor-tokenProperty",
//     operator: "editor-tokenOperator",
//     prolog: "editor-tokenComment",
//     property: "editor-tokenProperty",
//     punctuation: "editor-tokenPunctuation",
//     regex: "editor-tokenVariable",
//     selector: "editor-tokenSelector",
//     string: "editor-tokenSelector",
//     symbol: "editor-tokenProperty",
//     tag: "editor-tokenProperty",
//     url: "editor-tokenOperator",
//     variable: "editor-tokenVariable",
//   },
// };

interface Props {
  onChange?: (e: any) => void;
  name: string;
}

export default function TextEditor(props: Props): JSX.Element {
  //   const editorStateRef = useRef<EditorState | undefined>(undefined);
  //   const initialConfig = {
  //     namespace: "MyEditor",
  //     theme,
  //     onError,
  //   };

  const [isFocused, setIsFocused] = useState(false);
  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.

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
      {/* <LexicalComposer initialConfig={initialConfig}>
        <div
          className={`border rounded-3xl  focus:bg-muted/25 focus:outline-none p-2 ${
            isFocused ? "border-foreground/80" : "border-foreground/30"
          }`}
        >
          <ToolbarPlugin />

          <RichTextPlugin
            contentEditable={
              <ContentEditable
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="outline-none p-2 h-96 overflow-y-scroll"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        <OnChangePlugin
          onChange={(editorState) => {
            props.onChange?.(editorState);
          }}
        />
        <HistoryPlugin />
      </LexicalComposer> */}
    </>
  );
}
