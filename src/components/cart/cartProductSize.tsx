interface CartProductSizeProps {
  id: string;
  sizes: string[];
  selectedSize: string;
  handleSelectedSize: (productId: string, newSelectedSize: string) => void;
}

function CartProductSize({
  id,
  sizes,
  selectedSize,
  handleSelectedSize,
}: CartProductSizeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedSize = e.currentTarget.value;
    const productId = e.currentTarget.id;
    handleSelectedSize(productId, newSelectedSize);
  };

  return (
    <div>
      <select value={selectedSize} id={id} onChange={handleChange}>
        {sizes.map((size) => (
          <option>{size}</option>
        ))}
      </select>
    </div>
  );
}

export default CartProductSize;
