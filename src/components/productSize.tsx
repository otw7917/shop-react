const SIZES = ["xl", "lg", "md", "sm", "xs"];

function ProductSize() {
  return (
    <div className='border-2 rounded-md flex justify-center gap-2 p-2'>
      {SIZES.map((size) => (
        <label className='flex gap-1 border-2 p-2 rounded-md'>
          <input type='checkbox' name='sizes' id='sizes' value={size}></input>
          {size}
        </label>
      ))}
    </div>
  );
}
export default ProductSize;
