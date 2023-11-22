import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiStar } from "react-icons/hi2";
import { useEffect, useState } from "react";
import {
  UserYouShouldKnow,
  authStateChanged,
  logout,
} from "../services/firebase";

function Header() {
  const [user, setUser] = useState<UserYouShouldKnow | null>();

  useEffect(() => {
    authStateChanged(setUser);
  }, [user]);

  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout().then(setUser);
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
        {!user ? (
          <button onClick={handleLoginPage}> 로그인 페이지</button>
        ) : (
          <button onClick={handleLogout}> 로그아웃</button>
        )}
      </div>
    </div>
  );
}

export default Header;
