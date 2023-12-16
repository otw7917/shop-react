import { useState } from "react";
import { uploadImage } from "../services/imageUploader";
import { addProduct } from "../services/firebase";
import { Product } from "../types";
import ProductSize from "../components/productSize";

const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='image border-2 p-2 rounded-md'>{children}</div>;
};

function NewProduct() {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [product, setProduct] = useState<Product>({
    id: "",
    category: "",
    sizes: [],
    name: "",
    description: "",
    url: "",
    price: ",",
  });
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!image) {
      alert("no images uploaded yet");
      return;
    }
    if (!product) {
      alert("no prodcut");
      return;
    }
    setIsLoading(true);
    try {
      const dataURL = await uploadImage(image);
      addProduct(product, dataURL) //
        .then(() => {
          setSuccess("성공했어요!");
          setTimeout(() => setSuccess(null), 3500);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    if (name === "file") {
      const { files } = e.target as HTMLInputElement;
      const images = files;
      if (!images) {
        console.error("no image!");
        return;
      }
      setImage(images[0]);
    } else if (name === "sizes") {
      setProduct((prev) => {
        const sizes = prev.sizes;
        if (sizes.includes(value)) {
          return { ...prev, sizes: sizes.filter((p) => p !== value) };
        } else {
          return { ...prev, sizes: [...sizes, value] };
        }
      });
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section className='mx-10 md:mx-5'>
      <h1>제품 등록하기</h1>
      <div
        className={
          success ? "bg-sky-300 w-full py-2 text-center font-bold" : "hidden"
        }
      >
        🔥 데이터 저장 성공
      </div>

      <div className='grid md:grid-cols-2 gap-2'>
        <div className='border-2 border-dotted rounded-md my-2 h-52'>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='preview'
              className='w-full h-full p-2'
            />
          )}
        </div>
        <form onChange={handleChange} className='relative grid gap-2 my-2'>
          <InputContainer>
            <label htmlFor='image'>
              <input
                name='file'
                type='file'
                id='image'
                accept='image/*'
                className='w-full'
              ></input>
            </label>
          </InputContainer>
          <InputContainer>
            <label htmlFor='name'>
              제품명
              <input type='text' id='name' name='name' className='w-full' />
            </label>
          </InputContainer>
          <InputContainer>
            <label htmlFor='category'>
              카테고리
              <select
                name='category'
                id='category'
                className='w-full border-2 rounded-md'
              >
                <option value='woman'>woman</option>
                <option value='man'>man</option>
                <option value='baby'>baby</option>
              </select>
            </label>
          </InputContainer>
          <ProductSize />
          <InputContainer>
            <label htmlFor='description' className='w-full'>
              설명
              <input
                type='text'
                name='description'
                id='description'
                className='w-full border-2 mt-1'
              ></input>
            </label>
          </InputContainer>
          <InputContainer>
            <label htmlFor='price'>
              가격
              <input
                type='number'
                name='price'
                id='price'
                className='w-full'
              ></input>
            </label>
          </InputContainer>
          <button
            onClick={handleSubmit}
            className='p-2 bg-accent text-white rounded-md hover:brightness-125'
          >
            {isLoading ? "기달기달" : "제품 등록하기"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewProduct;
