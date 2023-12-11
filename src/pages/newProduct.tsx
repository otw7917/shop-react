import { useState } from "react";
import { uploadImage } from "../services/imageUploader";
import { addProduct } from "../services/firebase";

function NewProduct() {
  // const product: Product = {
  //   id: "1",
  //   category: "man",
  //   options: ["2XL"],
  //   name: "new product",
  //   description: "hello this is new product",
  //   image: "this would be url",
  //   price: "250,000",
  // };
  const [image, setImage] = useState<File | null>(null);

  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const image = e.target.files;
    if (!image) {
      console.error("no image!");
      return;
    }
    setImage(image[0]);
    const dataURL = await uploadImage(image[0]);
    setImageURL(dataURL);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!imageURL) {
      alert("no images~!");
      return;
    }
    const newProduct = {
      name: "새제품2",
      url: imageURL,
    };

    addProduct(newProduct);
  };

  return (
    <section>
      <h1>제품 등록하기</h1>
      <div>
        <div className='border-2 border-dotted rounded-md m-2 h-52'>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt='preview'
              className='w-full h-full p-2'
            />
          )}
        </div>

        <form>
          <label htmlFor='image'>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={handleFileChange}
            ></input>
          </label>
          <button onClick={handleSubmit}>등록하기</button>
        </form>
      </div>
    </section>
  );
}

export default NewProduct;
