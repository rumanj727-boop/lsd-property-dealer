import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `\u20B9${(price / 10000000).toFixed(2)} Cr`;
  }
  return `\u20B9${(price / 100000).toFixed(2)} Lakhs`;
}
