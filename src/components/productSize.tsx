const SIZES = ["xl", "lg", "md", "sm", "xs"];

function ProductSize({ selectedSize }: { selectedSize: string[] }) {
  return (
    <div className='border-2 rounded-md flex justify-center gap-2 p-2'>
      {SIZES.map((size) => (
        <label className='flex gap-1 border-2 p-2 rounded-md'>
          <input
            type='checkbox'
            name='sizes'
            id='sizes'
            value={size}
            checked={selectedSize.includes(size)}
          ></input>
          {size}
        </label>
      ))}
    </div>
  );
}
export default ProductSize;
