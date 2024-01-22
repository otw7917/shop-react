export interface Product {
  id: string;
  category: string;
  sizes: string[];
  name: string;
  description: string;
  url: string;
  price: string;
}

export interface CartProduct extends Product {
  selectedSize: string;
  quantity: number;
}

type Category = "man" | "woman" | "baby";
type Sizes = Size[];
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2XL";

export interface Products {
  [id: string]: Product;
}

type ProdcutId = string;
export type CartProducts = Record<ProductId, CartProduct>;
