import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

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
  const now = moment();
  const then = moment(date);
  const diff = now.diff(then, "minutes");
  console.log(diff);
  if (diff < 60) {
    return `${diff} 분 전`;
  } else if (diff < 1440) {
    const hours = Math.floor(diff / 60);
    return `${hours} 시간 전`;
  } else {
    const days = Math.floor(diff / 1440);
    return `${days} 일 전`;
  }
};
