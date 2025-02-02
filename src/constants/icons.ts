import { LucideIcon } from "lucide-react";
import {
  Package,
  Bath,
  Bed,
  Flower2,
  CookingPotIcon as Kitchen,
  Sofa,
  Waves,
  Sun,
  GrapeIcon,
} from "lucide-react";
import { Lightbulb } from "lucide-react";

type CategoryIcon = {
  [key: string]: LucideIcon;
};

const categoryIcons: CategoryIcon = {
  "0": Package,
  "1": Kitchen,
  "2": Sofa,
  "3": Bed,
  "4": Bath,
  "5": Waves,
  "6": Lightbulb,
  "7": Flower2,
  "8": Sun,
  "9": GrapeIcon,
  "10": Package,
};

export default categoryIcons;
