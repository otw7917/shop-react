import { Product as ProductType } from "../types";

function ProductThumbnail({ product }: { product: ProductType }) {
  // const image dir images/* --------> 외부 스토리지에서 url 가져오는경우 경로 확인하기
  const { id, category, name, description, price, image } = product;
  return (
    <div id={id} className='m-2'>
      <div>
        <img src={"/" + image} className='w-full h-auto' />
      </div>
      <div className='mx-2'>
        <div>{category}</div>
        <div>{name}</div>
        <div className='truncate'>{description}</div>
        <div>{price}</div>
      </div>
    </div>
  );
}

export default ProductThumbnail;
