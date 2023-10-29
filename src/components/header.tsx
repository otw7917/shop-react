import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiStar } from "react-icons/hi2";

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/2 flex justify-between'>
        <Link to='/'>
          <HiStar className='h-full' />
        </Link>
        <Link to='/products'>상세페이지</Link>
        <Link to='/cart'>
          <HiOutlineShoppingCart className='h-full' />
        </Link>
        <button onClick={handleLogin}> 로그인 하기</button>
      </div>
    </div>
  );
}

export default Header;
