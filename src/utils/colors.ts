export const categoryColors = {
  "1": "bg-orange-200",
  "2": "bg-blue-200",
  "3": "bg-purple-200",
  "4": "bg-yellow-200",
  "5": "bg-cyan-200",
  "6": "bg-red-200",
  "7": "bg-green-200",
  "8": "bg-blue-200",
  "9": "bg-purple-200",
  "10": "bg-cyan-200",
} as const;

export type CategoryId = keyof typeof categoryColors;

export function getCategoryColor(id: string): string {
  return categoryColors[id as CategoryId] || "bg-gray-200";
}
