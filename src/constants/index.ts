import {
  BookIcon,
  CarIcon,
  DumbbellIcon,
  HeartIcon,
  HomeIcon,
  PawPrintIcon,
  ShapesIcon,
  ShirtIcon,
  ShoppingCartIcon,
  SmartphoneIcon,
} from "lucide-react";

export const defaultLocation = {
  lat: 6.585323364828695,
  lng: 79.9706797982489,
};

export const categories = [
  {
    id: 1,
    value: "electronics",
    label: "Electronics",
    icon: SmartphoneIcon,
  },
  {
    id: 2,
    value: "fashion",
    label: "Fashion",
    icon: ShirtIcon,
  },
  {
    id: 3,
    value: "homeAppliances",
    label: "Home Appliances",
    icon: HomeIcon,
  },
  {
    id: 4,
    value: "beauty",
    label: "Beauty & Health",
    icon: HeartIcon,
  },
  {
    id: 5,
    value: "toys",
    label: "Toys & Games",
    icon: ShapesIcon,
  },
  {
    id: 6,
    value: "books",
    label: "Books & Media",
    icon: BookIcon,
  },
  {
    id: 7,
    value: "automotive",
    label: "Automotive",
    icon: CarIcon,
  },
  {
    id: 8,
    value: "sports",
    label: "Sports & Outdoors",
    icon: DumbbellIcon,
  },
  {
    id: 9,
    value: "groceries",
    label: "Groceries",
    icon: ShoppingCartIcon,
  },
  {
    id: 10,
    value: "pets",
    label: "Pets",
    icon: PawPrintIcon,
  },
];
