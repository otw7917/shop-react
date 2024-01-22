import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { addCart, getProductDetail } from "../services/firebase";
import { useAuthContext } from "../contexts/authContext";
import { useState } from "react";

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

  const [selectedSize, setSelectedSize] = useState<string | undefined>("");
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const select = event.target.value;
    setSelectedSize(select);
  };

  const { uid } = useAuthContext();

  const handleCartAdd = async () => {
    if (!uid) {
      alert("user정보가 없습니다.");
      return;
    }
    if (selectedSize === "") {
      alert("사이즈 정보가 없습니다.");
      return;
    }

    const selectedProduct = product && { ...product, selectedSize };
    setIsCartLoading(true);
    try {
      await addCart(uid, selectedProduct!);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCartLoading(false);
    }
  };

  if (isLoading) return <>Loading</>;
  if (isError) {
    return <>Error messages : {error.message}</>;
  }
  const { url, name, price, description, sizes, category } = product!;

  return (
    <div className='grid md:grid-cols-2 w-full h-full px-6 lg:px-10 gap-4'>
      <img
        src={url}
        className='max-h-96 w-full rounded-md drop-shadow-lg object-contain bg-slate-200'
      ></img>

      <div className='px-4 drop-shadow-lg bg-slate-200 rounded-md flex flex-col h-full justify-evenly'>
        <div className='flex flex-col items-start gap-y-2'>
          <span className=' bg-amber-400 p-2 rounded-md text-sm'>
            {category}
          </span>
          <h1>{name}</h1>
          <div>{description}</div>
          <div>₩{price}</div>
        </div>
        <fieldset>
          사이즈
          <select
            name='size_option'
            id='options'
            className='w-full p-1'
            onChange={handleSizeChange}
            value={selectedSize}
          >
            {selectedSize === "" && (
              <option value='' disabled>
                사이즈를 선택해주세요!!
              </option>
            )}
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </fieldset>
        <div className='flex gap-2 px-10'>
          <Button name={"addCart"} handleCartAdd={handleCartAdd}>
            {isCartLoading ? "기다려주세요" : "장바구니 추가"}
          </Button>
          <Button name={"goCart"}>바로 결제</Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({
  name,
  children,
  handleCartAdd,
}: {
  children: React.ReactNode;
  name: string;
  handleCartAdd?: () => void;
}) => {
  const navigate = useNavigate();

  const onClickCartButton = (e: React.MouseEvent) => {
    const buttonName = (e.currentTarget as HTMLButtonElement).name;
    switch (buttonName) {
      case "goCart":
        navigate("/cart");
        break;
      case "addCart":
        handleCartAdd!();
        break;
    }
  };

  return (
    <button
      name={name}
      className='p-4 w-full bg-accent rounded-md text-slate-100 hover:brightness-125'
      onClick={onClickCartButton}
    >
      {children}
    </button>
  );
};
export default Detail;
