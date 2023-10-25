import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/sss");
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='w-1/2 flex justify-between'>
        <Link to='/'>home</Link>
        <Link to='/products'>상세페이지</Link>
        <button onClick={handleLogin}> 로그인 하기</button>
      </div>
    </div>
  );
}

export default Header;
