import Banner from "../components/banner";
import ProductThumbnail from "../components/productThumbnail";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/firebase";
import { useQuery } from "@tanstack/react-query";

const IMAGE = {
  name: "banner",
  filePath: "images/banner.jpg",
  title: "COFFEE SHOP",
  description: "every coffee in the world",
};

function Home() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const navigate = useNavigate();

  if (isLoading) return <>Loading</>;

  const goProductDetailPage = (e: React.MouseEvent<HTMLUListElement>) => {
    const productId = (e.target as HTMLElement).closest("li")?.dataset.id;
    if (productId) {
      navigate("product/" + productId);
    }
  };

  return (
    <>
      <section className='relative w-full h-96 my-2'>
        <Banner IMAGE={IMAGE} objectFit='object-cover' />
      </section>
      <section className='flex flex-col gap-4 mx-2'>
        <h1>Prodcut page</h1>
        <ul
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          onClick={goProductDetailPage}
        >
          {products &&
            Object.entries(products).map(([id, product]) => (
              <li
                key={id}
                data-id={id}
                className='m-2 rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg'
              >
                <ProductThumbnail product={product} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
