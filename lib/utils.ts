import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SecureStore from "expo-secure-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function secureStoreSet(key: string, value: string) {
  try {
    await SecureStore.setItem(key, value);
    console.log("sett");
  } catch (e) {
    console.log(e);
  }
}

export async function secureStoreGet(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function isUserLoggedIn() {
  const token = await secureStoreGet("jwt");
  return token ? true : false;
}
