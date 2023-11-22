import { useEffect, useState } from "react";
import {
  UserYouShouldKnow,
  auth,
  authStateChanged,
  logout,
  signInRedirect,
} from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState<UserYouShouldKnow | null>();
  const navigate = useNavigate();
  const onClick = async (e: React.MouseEvent) => {
    const providerValue = (e.currentTarget as HTMLButtonElement).value;

    signInRedirect(auth, providerValue);
  };

  const handleLogOut = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    const cb = async (user: UserYouShouldKnow | null) => {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        console.error("no user");
      }
    };
    authStateChanged(cb);
  }, [user]);

  return (
    <div className='h-screen w-full flex justify-center items-center '>
      <div className='flex flex-col gap-4'>
        <h1>Let's get started</h1>
        {!user ? (
          <>
            <button
              onClick={onClick}
              value='Google'
              className='bg-slate-300 h-12 rounded-md backdrop-blur-lg'
            >
              Google Login
            </button>
            <button
              onClick={onClick}
              value='Github'
              className='bg-slate-300 h-12 rounded-md backdrop-blur-lg'
            >
              Github Login
            </button>
          </>
        ) : (
          <button onClick={handleLogOut}>로그아웃</button>
        )}

        <button onClick={() => console.log(user)}>유저정보</button>
      </div>
    </div>
  );
}

export default Login;
