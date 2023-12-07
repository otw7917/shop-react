import { useAuthContext } from "../contexts/authContext";
import { auth } from "../services/firebase";
import { Navigate } from "react-router-dom";

function Login() {
  console.log("login component");

  const { user, signInRedirect } = useAuthContext();

  const onClick = async (e: React.MouseEvent) => {
    const providerValue = (e.currentTarget as HTMLButtonElement).value;

    signInRedirect(auth, providerValue);
  };

  if (user) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='h-screen w-full flex justify-center items-center '>
      <div className='flex flex-col gap-4'>
        <h1>Let's get started</h1>

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
      </div>
    </div>
  );
}

export default Login;
