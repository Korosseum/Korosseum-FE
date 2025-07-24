"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import TextEditor from "@/components/TextEditor";

import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default function CreatePost() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("custom");
  const [content, setContent] = useState("");

  const [preview, setPreview] = useState<any>();

  const session = useSession();

  const handleSubmit = async (formData: FormData) => {
    console.log(formData.get("title"));
    console.log(formData.get("customCategory"));
    console.log(formData.get("category"));
    console.log(formData.get("content"));
  };

  const [contentValue, setContentValue] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setContent((prev) => (prev != value ? value : prev));
    parseMarkDown(value);
  };

  const parseMarkDown = async (markdown: string) => {
    const result = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(markdown);

    setPreview(result);

    console.log(preview);
  };

  const user = session.data?.user;

  return (
    <div className="flex flex-col gap-6 px-14 py-8 w-full max-w-3xl">
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-5 items-center h-14">
          <h2 className="text-2xl font-extrabold">게시글 작성</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="border border-foreground/30 rounded-xl w-28 px-2 py-1.5"
          >
            <option value="food">음식</option>
            <option value="game">게임</option>
            <option value="daily">일상</option>
            <option value="custom">직접 입력</option>
          </select>

          {category === "custom" ? (
            <input
              required
              className="border border-foreground/30 rounded-xl w-40 px-2 py-1.5"
              type="text"
              name="customCategory"
              id="customCategory"
              maxLength={20}
            />
          ) : null}
        </div>
        <div className="relative">
          <input
            type="text"
            name="title"
            id="title"
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="peer/input pb-4 pt-6 px-6 h-14 text-base border rounded-2xl w-full border-foreground/30 focus:bg-muted/25 focus:outline-none"
            maxLength={300}
          />
          <motion.span
            className="absolute -translate-y-1/2 left-6 text-base font-medium text-foreground/60"
            initial={{ scale: 1, top: "50%", left: "6", fontWeight: 400 }}
            animate={
              isFocused || value.length > 0
                ? { scale: 0.75, top: "14px", left: "20px" }
                : { scale: 1, top: "50%", left: "6", fontWeight: 400 }
            }
            transition={{ duration: 0.14 }}
          >
            Title
            <sup className="text-red-700 text-xs">*</sup>
          </motion.span>
        </div>
        <TextEditor onChange={handleChange} name="content" />

        <button
          className="self-end bg-primary text-primary-foreground rounded-xl px-4 py-2 mr-2"
          type="submit"
        >
          마크다운 미리보기
        </button>

        <button
          className="self-end bg-primary text-primary-foreground rounded-xl px-4 py-2 mr-2"
          type="submit"
        >
          작성하기
        </button>

        {preview ? (
          <div
            className="whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        ) : null}
      </form>
    </div>
  );
}
