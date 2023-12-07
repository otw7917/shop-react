import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiPencilSquare, HiStar } from "react-icons/hi2";

import User from "./user";
import { useAuthContext } from "../contexts/authContext";

function Header() {
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='h-20 mx-5 md:mx-20 flex justify-between items-center gap-4 '>
      <Link to='/'>
        <HiStar className='h-full text-4xl' />
      </Link>

      <div className='flex items-center gap-8'>
        {user && (
          <Link to='/cart'>
            <HiOutlineShoppingCart className='h-full text-4xl' />
          </Link>
        )}

        {user && user.isAdmin && (
          <Link to='/product/new'>
            <HiPencilSquare className='h-full text-4xl' />
          </Link>
        )}

        {!user ? (
          <button
            className='bg-primary px-4 py-2 rounded-md text-xl'
            onClick={handleLoginPage}
          >
            로그인
          </button>
        ) : (
          <div className='flex gap-4'>
            <User user={user} />
            <button
              className='bg-primary px-4 py-2 rounded-md text-sm md:text-xl'
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
