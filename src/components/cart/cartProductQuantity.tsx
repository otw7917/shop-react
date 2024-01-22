import { HiMiniPlus, HiMiniMinus } from "react-icons/hi2";

function CartProductQuantity({
  id,
  quantity,
  handleQuantity,
}: {
  id: string;
  quantity: number;
  handleQuantity: (productId: string, buttonId: string) => void;
}) {
  const onClickQuantity = (e: React.MouseEvent) => {
    const buttonId = (e.currentTarget as HTMLButtonElement).id;
    // productId
    const buttonName = (e.currentTarget as HTMLButtonElement).name;

    handleQuantity(buttonId, buttonName);
  };

  return (
    <div className='border-red-200 border-2 flex justify-center gap-2 p-2'>
      <button
        id={id}
        name='decrease'
        className='bg-red-300 hover:brightness-105 rounded-md p-2'
        onClick={onClickQuantity}
      >
        <HiMiniMinus />
      </button>
      <label htmlFor='quantity' className='my-auto'>
        <input type='number' id='quantity' value={quantity} readOnly />
      </label>
      <button
        id={id}
        name='increase'
        className='bg-slate-300 hover:brightness-105 rounded-md p-2'
        onClick={onClickQuantity}
      >
        <HiMiniPlus />
      </button>
    </div>
  );
}

export default CartProductQuantity;
