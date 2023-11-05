import { Product as ProductType } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (!productId) return;

    fetch("/data/products.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data[productId]);
      });
  }, [productId]);

  if (!product) return <>Loading</>;

  const { image, name, price, description, options, category } = product;

  return (
    <div>
      <div className='flex h-96 w-full px-4'>
        <div className='w-1/2 h-full flex-shrink-0'>
          <img src={"/" + image} className='h-full m-auto'></img>
        </div>
        <div>
          <>
            <div>{category}</div>
            <h1>{name}</h1>
            <div>{description}</div>
            <div>₩{price}</div>
          </>
          <fieldset>
            <select name='size_option' id='options'>
              {options.map((option) => (
                <option>{option}</option>
              ))}
            </select>
          </fieldset>
          <>
            <button>장바구니 추가</button>
            <button>바로 결제</button>
          </>
        </div>
      </div>
    </div>
  );
}

export default Detail;
