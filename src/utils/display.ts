import { unavailableCopy } from "../config/brand";

export const displayValue = (value?: string | number | boolean | null) => {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === 0) return "0";
  if (value === undefined || value === null || value === "") {
    return unavailableCopy;
  }
  return String(value);
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
