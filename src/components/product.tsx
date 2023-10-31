import { Product as ProductType } from "../types";

function Product({ product }: { product: ProductType }) {
  const { id, category, name, description, price, options, image } = product;

  return (
    <div id={id} className=''>
      <div>
        <img src={image} className='w-full h-auto' />
      </div>
      <div>{category}</div>
      <div>{name}</div>
      <span>{description}</span>
      <select>
        {options.map((v, idx) => (
          <option key={idx} value={v}>
            {v}
          </option>
        ))}
      </select>
      <div>{price}</div>
    </div>
  );
}

export default Product;
