import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import imageCompressor from "browser-image-compression";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBgColor = (index: number) => {
  const colors = [
    "bg-side-1",
    "bg-side-2",
    "bg-side-3",
    "bg-side-4",
    "bg-side-5",
    "bg-side-6",
    "bg-side-7",
  ];
  return colors[index];
};

export const getTimeAgo = (date: string) => {
  if (!date) {
    return "";
  }
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then, "seconds");

  if (diff < 60) {
    return `${diff} 초 전`;
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} 분 전`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} 시간 전`;
  } else {
    const days = Math.floor(diff / 86400);
    return `${days} 일 전`;
  }
};

export const imageCompress = async (image: File) => {
  const compressedImage = await imageCompressor(image, {
    maxSizeMB: 1,
    useWebWorker: true,
    maxWidthOrHeight: 1920,
  });
  return compressedImage;
};
