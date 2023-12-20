import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Cart from "./pages/cart";
import NewProduct from "./pages/newProduct";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoute from "./pages/protectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<Detail />} />
            <Route
              path='/cart'
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path='/product/new'
              element={
                <ProtectedRoute requireAdmin>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
