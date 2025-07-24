/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalCommand,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Icon,
  Italic,
  LucideIcon,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

function Divider() {
  return <div className="w-[1.5px] h-7 bg-foreground/5 " />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  const ToolbarButton = ({
    action,
    command,
    isActive,
    Icon,
  }: {
    action: TextFormatType | ElementFormatType;
    command: LexicalCommand<TextFormatType | ElementFormatType>;
    isActive?: boolean;
    Icon: LucideIcon;
  }) => {
    return (
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(command, action);
        }}
        className={
          "active:bg-gray-300 p-2 rounded-full hover:bg-gray-300 " +
          (isActive ? "bg-gray-300" : "")
        }
        aria-label={`Format ${action}`}
      >
        <Icon className="size-4" />
      </button>
    );
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="flex items-center gap-1" ref={toolbarRef}>
      <ToolbarButton
        action="bold"
        isActive={isBold}
        Icon={Bold}
        command={FORMAT_TEXT_COMMAND}
      />
      <ToolbarButton
        action="italic"
        isActive={isItalic}
        Icon={Italic}
        command={FORMAT_TEXT_COMMAND}
      />
      <ToolbarButton
        action="underline"
        isActive={isUnderline}
        Icon={Underline}
        command={FORMAT_TEXT_COMMAND}
      />
      <ToolbarButton
        action="strikethrough"
        isActive={isStrikethrough}
        Icon={Strikethrough}
        command={FORMAT_TEXT_COMMAND}
      />
      <Divider />
      <ToolbarButton
        action="left"
        Icon={AlignLeft}
        command={FORMAT_ELEMENT_COMMAND}
      />
      <ToolbarButton
        action="center"
        Icon={AlignCenter}
        command={FORMAT_ELEMENT_COMMAND}
      />
      <ToolbarButton
        action="right"
        Icon={AlignRight}
        command={FORMAT_ELEMENT_COMMAND}
      />
      <ToolbarButton
        action="justify"
        Icon={AlignJustify}
        command={FORMAT_ELEMENT_COMMAND}
      />
    </div>
  );
}
