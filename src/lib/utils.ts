import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
