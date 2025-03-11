import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { base_api } from "~/constants";

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

export async function getUser() {
  const token = await secureStoreGet("jwt");
  if (!token) return null;
  console.log(token);

  try {
    const user = jwtDecode(token);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchData(
  path: String,
  method: string,
  body: any = null
) {
  return await fetch(`${base_api}/${path}`, {
    headers: {
      Authorization: (await secureStoreGet("jwt")) ?? "",
      "Content-Type": "application/json",
    },
    method: method,
    ...(method != "GET" && { body: JSON.stringify(body) }),
  });
}

export function formatTimestamp(timestamp: number): string {
  const dateObj = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  };

  return dateObj.toLocaleString("en-US", options).replace(" at", "");
}
