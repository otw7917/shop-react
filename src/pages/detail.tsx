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
          <select name='size_option' id='options' className='w-full p-1'>
            {sizes.map((size) => (
              <option>{size}</option>
            ))}
          </select>
        </fieldset>
        <div className='flex gap-2 px-10'>
          <Button>장바구니 추가</Button>
          <Button>바로 결제</Button>
        </div>
      </div>
    </div>
  );
}

const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className='p-4 w-full bg-accent rounded-md text-slate-100 hover:brightness-125'>
      {children}
    </button>
  );
};
export default Detail;
