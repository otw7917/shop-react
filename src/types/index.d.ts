export interface Product {
  id: string;
  category: Category;
  options: Sizes;
  name: string;
  description: string;
  image: string;
  price: string;
}

type Category = "man" | "woman" | "baby";
type Sizes = Size[];
type Size = "S" | "M" | "L" | "XL" | "2XL";
