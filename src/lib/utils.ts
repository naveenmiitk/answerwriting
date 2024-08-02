import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");


export const generateSlug = (text : string) => {
  return text
    .toString() // Convert to string
    .normalize("NFD") // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove remaining accents
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim starting hyphen
    .replace(/-+$/, ""); // Trim ending hyphen
}

export const FilterSelected = (A : any[], B : any[]) => {
  // 1. Create a Set from B's object IDs for efficient lookups
  const bIdSet = new Set(B.map((obj) => obj.id));

  // 2. Filter A's objects using a loop for clarity and control
  const uniqueInA = A.filter((obj) => {
    // Check if the current object's ID is not present in B's ID set
    return !bIdSet.has(obj.id);
  });

  // 3. Return the array of unique objects
  return uniqueInA;
}
