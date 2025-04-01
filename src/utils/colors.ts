export const categoryColors: Record<string, string> = {
  "1": "rgb(254 202 202)", // red-200
  "2": "rgb(191 219 254)", // blue-200
  "3": "rgb(233 213 255)", // purple-200
  "4": "rgb(254 240 138)", // yellow-200
  "5": "rgb(165 243 252)", // cyan-200
  "6": "rgb(254 215 170)", // orange-200
  "7": "rgb(187 247 208)", // green-200
  "8": "rgb(191 219 254)", // blue-200
  "9": "rgb(233 213 255)", // purple-200
  "10": "rgb(224 231 255)", // indigo-200
};

export function getCategoryColor(id: string): string {
  return categoryColors[id] || "rgb(229 231 235)"; // gray-200 como fallback
} 