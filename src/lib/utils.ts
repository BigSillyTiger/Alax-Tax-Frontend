import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const joinAllValues = (obj: { [key: string]: string }) => {
  return Object.values(obj).join(" ");
};