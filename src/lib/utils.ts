import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 className：clsx 处理条件类，twMerge 消解 Tailwind 冲突。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
