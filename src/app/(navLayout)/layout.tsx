"use client";
import Footer from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import useInput from "@/hooks/useInput";
import useWindowSize from "@/hooks/useWindowSize";
import apiCall from "@/lib/apiCall";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ImageIcon,
  ListCheck,
  SmileIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  const windowSize = useWindowSize();

  const [isOpen, setIsOpen] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const contentInput = useInput({
    initialValue: "",
    onChange: (e) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    },
  });
  const topicInput = useInput({
    initialValue: "",
  });
  const onClickHandler = () => {
    setIsOpen(true);
  };

  const onSaveHandler = async () => {
    const formData = new FormData();

    formData.append("content", contentInput.value);
    formData.append("topic", topicInput.value);
    await images.forEach((image) => {
      formData.append("files", image);
    });

    console.log(images);
    console.log(formData);

    const response = await apiCall.post("/post", {
      body: formData,
    });

    console.log(response);
  };

  return (
    <div className="grid h-screen grid-rows-[50px_minmax(auto,1fr)_60px]">
      <header className="border-b bg-white">
        <Navigation />
      </header>
      <div className="max-w-5xl mx-auto w-full">{children}</div>
      <footer
        onClick={onClickHandler}
        className="border-t bg-muted/50 flex overflow-hidden rounded-t-lg h-full justify-between pb-[10px]"
      >
        <Footer />
      </footer>
      {isOpen && (
        <motion.div
          initial={{ y: windowSize.height }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed h-full w-full bg-white"
        >
          <div className="flex justify-between items-center border-b border-[0.5px] shadow-sm shadow-border  border-border ">
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-base font-semibold"
            >
              취소
            </button>
            <h2 className="text-lg font-bold">New Post</h2>
            <button
              onClick={onSaveHandler}
              className="p-4 text-base font-semibold"
            >
              저장
            </button>
          </div>

          <div className=" flex w-full py-4">
            <div className="w-20 flex gap-2 flex-col items-center">
              <div className="w-full flex justify-center">
                <div className="w-9 h-9 bg-muted rounded-full flex justify-center items-center">
                  ?
                </div>
              </div>
              <div className="h-full min-h-12 w-full flex justify-center">
                <div className="w-[1px] h-full rounded-full bg-muted"></div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col">
              <div className="flex gap-2">
                <h2 className="text-sm font-bold">hyeseong__</h2>
                <div className="bg-muted rounded-md flex items-center">
                  <input
                    {...topicInput}
                    name="topic"
                    className="text-xs focus:border-none font-semibold opacity-70 placeholder:text-center h-3 px-2 w-14 focus:outline-none"
                    placeholder="topic"
                  />
                </div>
              </div>
              <textarea
                name="content"
                id="content"
                className="w-full resize-none pr-10 text-xs/snug focus:outline-none"
                placeholder="내용을 입력해주세요"
                rows={1}
                {...contentInput}
              />

              <div className="flex gap-1 py-2 w-full overflow-x-scroll scrollbar-hide">
                {images.map((image) => (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="postImage"
                    layout="raw"
                    className="object-cover"
                    key={image.name}
                    width={100}
                    height={100}
                  />
                ))}
              </div>

              <div className="flex items-center py-2 gap-2">
                <div>
                  <label htmlFor="postImages">
                    <ImageIcon size={18} strokeWidth={1} />
                  </label>
                  <input
                    type="file"
                    name="postImages"
                    id="postImages"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      setImages(Array.from(e.target.files || []));
                    }}
                  />
                </div>
                <button className="hover:bg-muted ">
                  <VideoIcon size={18} strokeWidth={1} />
                </button>
                <button className="hover:bg-muted ">
                  <SmileIcon size={18} strokeWidth={1} />
                </button>
                <button className="hover:bg-muted ">
                  <ListCheck size={18} strokeWidth={1} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
