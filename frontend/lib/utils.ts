import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const options = ['video', 'image', 'code', 'chem', 'vcd', "roadmap"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
