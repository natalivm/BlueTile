export const CATEGORIES = [
  "General",
  "Technology",
  "Business",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  General: "bg-gray-100 text-gray-700",
  Technology: "bg-blue-100 text-blue-700",
  Business: "bg-green-100 text-green-700",
  Sports: "bg-orange-100 text-orange-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Health: "bg-red-100 text-red-700",
  Science: "bg-teal-100 text-teal-700",
};
