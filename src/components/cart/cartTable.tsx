// import { useState } from "react";
import { CartProduct } from "../../types";
import CartProductQuantity from "./cartProductQuantity";
import CartProductSize from "./cartProductSize";

interface CartTableProps {
  product: CartProduct;
  handleQuantity: (productId: string, buttonId: string) => void;
  handleSelectedSize: (productId: string, newSelectedSize: string) => void;
  handleDelete: (productId: string) => void;
}

function CartTable({
  product,
  handleQuantity,
  handleSelectedSize,
  handleDelete,
}: CartTableProps) {
  const { id, url, name, selectedSize, quantity, sizes, price } = product;

  const onDelete = (e: React.MouseEvent) => {
    const productId = (e.target as HTMLButtonElement).id;
    handleDelete(productId);
  };

  return (
    <div className='flex items-center justify-between mx-10 mt-10 border-y-2 border-slate-400 p-2 '>
      <img
        src={url}
        alt='product images'
        className='w-48 h-48 object-contain'
      />
      <div>
        <span>{name}</span>
      </div>
      <CartProductSize
        id={id}
        sizes={sizes}
        selectedSize={selectedSize}
        handleSelectedSize={handleSelectedSize}
      />
      <div className='m-5'>
        <CartProductQuantity
          id={id}
          quantity={quantity}
          handleQuantity={handleQuantity}
        />
      </div>
      <div>
        <div>{price}</div>
        <div>$ {Number(price) * quantity}</div>
      </div>
      <button id={id} onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}

export default CartTable;
