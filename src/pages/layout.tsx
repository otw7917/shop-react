import { Outlet } from "react-router-dom";
import Header from "../components/header";

function Layout() {
  return (
    <>
      <Header />
      <main className='max-w-5xl mx-auto'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
