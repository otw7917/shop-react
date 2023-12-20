import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../services/firebase";

function Detail() {
  const params = useParams();
  const productId = params.id;
  const {
    isLoading,
    data: product,
    isError,
    error,
  } = useQuery({
    queryKey: [`products/${productId}`],
    queryFn: () => getProductDetail(productId!),
  });

  if (isLoading) return <>Loading</>;
  if (isError) {
    return <>Error messages : {error.message}</>;
  }
  const { id, url, name, price, description, sizes, category } = product!;

  return (
    <div key={id}>
      <div className='flex h-96 w-full px-4'>
        <div className='w-1/2 h-full flex-shrink-0'>
          <img src={url} className='h-full m-auto'></img>
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
              {sizes.map((size) => (
                <option>{size}</option>
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
