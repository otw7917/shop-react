import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Layout from "./pages/layout";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Detail />} />
      </Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
  );
}

export default App;
