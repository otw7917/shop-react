import { Product as ProductType } from "../types";

function ProductThumbnail({ product }: { product: ProductType }) {
  const { category, name, description, price, url } = product;

  return (
    <>
      <img src={url} className='w-full rounded-md' />
      <div className='mx-2 rounded-md'>
        <div className='py-2'>
          <span className='bg-amber-400 p-1 rounded-md text-sm'>
            {category}
          </span>
        </div>
        <div className='text-lg font-bold'>{name}</div>
        <div className='truncate'>{description}</div>
        <div>₩{price}</div>
      </div>
    </>
  );
}

export default ProductThumbnail;
