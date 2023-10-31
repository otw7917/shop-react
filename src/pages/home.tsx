import { useEffect, useState } from "react";
import Banner from "../components/banner";
import Product from "../components/product";
import { Product as ProductType } from "../types";

const IMAGE = {
  name: "banner",
  filePath: "images/banner.jpg",
  title: "COFFEE SHOP",
  description: "every coffee in the world",
};

function Home() {
  const [products, setProducts] = useState<{
    [productId: string]: ProductType;
  } | null>(null);

  useEffect(() => {
    fetch("data/products.json", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  if (!products) return <>Loading</>;

  return (
    <>
      <section className='relative w-full h-96 my-2'>
        <Banner IMAGE={IMAGE} objectFit='object-cover' />
      </section>
      <section className='flex flex-col gap-4 mx-2'>
        <h1>Prodcut page</h1>
        <ul className='grid grid-cols-4 gap-2'>
          {Object.entries(products).map(([id, product]) => (
            <li key={id}>
              <Product product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
