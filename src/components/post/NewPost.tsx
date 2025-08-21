import useAuth from "@/hooks/useAuth";
import useInput from "@/hooks/useInput";
import useWindowSize from "@/hooks/useWindowSize";
import apiCall from "@/lib/apiCall";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import SignIn from "../SignIn";
import * as uuid from "uuid";

import imageCompressor from "browser-image-compression";

interface Image {
  id: string;
  originalFile: File;
  status: "compressing" | "compressed" | "error";
  compressedFile: File | null;
  preview: string;
  presignedUrl: string | null;
}

export default function NewPost({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { user } = useAuth();

  const [images, setImages] = useState<Image[]>([]);
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

  const imageCompress = async (image: File) => {
    const compressedImage = await imageCompressor(image, {
      maxSizeMB: 1,
      useWebWorker: true,
      maxWidthOrHeight: 1920,
    });
    return compressedImage;
  };

  const onSaveHandler = async () => {
    // image 검증 및 presigned url 요청용 정보 body
    const body = await Promise.all(
      images.map((image) => {
        return {
          type: image.originalFile.type,
          name: image.originalFile.name,
          size: image.originalFile.size,
          id: image.id,
        };
      })
    );
    console.log(body);

    //response =  {data: {presignedUrls: {}}};

    const presignedResult = await apiCall.post("/s3/presigned-url", {
      body: {
        files: body,
        type: "image",
        folder: "images/post",
      },
    });

    const { presignedUrls } = presignedResult.data;
    console.log("presignedUrls", presignedUrls);

    const uploadPromises = images.map(async (image) => {
      const url = presignedUrls[image.id];

      console.log("url", url);

      if (!url) {
        throw new Error(
          `${image.originalFile.name} 에 해당하는 업로드 url 정보가 없습니다.`
        );
      }

      const fileState = image.compressedFile;

      const uploadPromise = await fetch(url, {
        method: "PUT",
        body: fileState,
        headers: {
          "Content-Type": image.originalFile.type,
        },
      }).then((response) => {
        if (response.ok) {
          console.log(`${image.originalFile.name} 업로드 성공`);
        } else {
          console.log(`${image.originalFile.name} 업로드 실패`);
        }
      });

      return uploadPromise;
    });

    const uploadResults = await Promise.allSettled(uploadPromises);
    console.log("uploadResults", uploadResults);
  };

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files?.length == 0) return;

    const initialImages = files.map((file) => {
      return {
        id: uuid.v4(),
        originalFile: file,
        status: "compressing" as const,
        compressedFile: null,
        preview: URL.createObjectURL(file),
        presignedUrl: null,
      };
    });
    setImages(initialImages);

    const compressionPromises = initialImages.map(async (image) => {
      try {
        const compressedImage = await imageCompress(image.originalFile);
        return {
          ...image,
          status: "compressed" as const,
          compressedFile: compressedImage,
        };
      } catch (error) {
        return {
          ...image,
          status: "error" as const,
        };
      }
    });

    const settledImages = await Promise.all(compressionPromises);
    setImages(settledImages);
  };

  const allCompressed = images.every((image) => image.status === "compressed");

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
                  src={image.preview}
                  alt="postImage"
                  layout="raw"
                  className="object-cover"
                  key={image.originalFile.name}
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
                  onChange={onChangeHandler}
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
