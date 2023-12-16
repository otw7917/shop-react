export interface Product {
  id: string;
  category: string;
  sizes: string[];
  name: string;
  description: string;
  url: string;
  price: string;
}

type Category = "man" | "woman" | "baby";
type Sizes = Size[];
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2XL";
