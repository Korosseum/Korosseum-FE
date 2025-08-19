import useAuth from "@/hooks/useAuth";
import useInput from "@/hooks/useInput";
import useWindowSize from "@/hooks/useWindowSize";
import apiCall from "@/lib/apiCall";
import { motion } from "framer-motion";
import {
  ImageIcon,
  ListCheck,
  SmileIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignIn from "../SignIn";

interface User {
  nickname: string;
  nicknameIndex: number;
  photo: string;
  email: string;
  provider: string;
}

export default function NewPost({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { user, loading } = useAuth();

  const [images, setImages] = useState<File[]>([]);
  const windowSize = useWindowSize();

  const contentInput = useInput({
    initialValue: "",
    onChange: (e) => {
      // onChange 시 content 영역 높이 자동 조절 로직
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    },
  });
  const topicInput = useInput({
    initialValue: "",
  });

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  if (!user) {
    return (
      isOpen && (
        <div className="fixed top-0 flex justify-center left-0 w-full h-full items-center bg-black/4 backdrop-blur-sm">
          <div className="w-1/2 h-1/2 flex justify-center items-center  flex-col bg-white/80 rounded-xl text-black">
            <SignIn />
          </div>
        </div>
      )
    );
  }

  const onSaveHandler = async () => {
    const formData = new FormData();

    formData.append("content", contentInput.value);
    formData.append("topic", topicInput.value);
    await images.forEach((image) => {
      formData.append("files", image);
    });

    const response = await apiCall.post("/post", {
      body: formData,
    });

    console.log(response);
  };

  return (
    isOpen && (
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
              <div className="w-9 h-9 bg-muted rounded-full overflow-hidden flex justify-center items-center">
                <Image
                  src={user.photo}
                  alt="userPhoto"
                  layout="raw"
                  className="object-cover"
                  width={36}
                  height={36}
                />
              </div>
            </div>
            <div className="h-full min-h-12 w-full flex justify-center">
              <div className="w-[1px] h-full rounded-full bg-muted"></div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="flex gap-2">
              <h2 className="text-sm font-bold">{user.nickname}</h2>
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
              {/* <button className="hover:bg-muted ">
                <VideoIcon size={18} strokeWidth={1} />
              </button> */}
              {/* <button className="hover:bg-muted ">
                <SmileIcon size={18} strokeWidth={1} />
              </button> */}
              {/* <button className="hover:bg-muted ">
                <ListCheck size={18} strokeWidth={1} />
              </button> */}
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}
