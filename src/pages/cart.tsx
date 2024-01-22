import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/authContext";
import { getCart } from "../services/firebase";
import CartTable from "../components/cart/cartTable";
import { CartProducts } from "../types";
import { useEffect, useState } from "react";

function Cart() {
  const { uid } = useAuthContext();
  const [cartProducts, setCartProducts] = useState<CartProducts | null>(null);
  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: [`carts/${uid}`],
    queryFn: () => getCart(uid),
  });

  useEffect(() => {
    if (!products) return;
    console.log("cart useEffect");
    setCartProducts(products);
  }, [products]);

  if (isLoading || !cartProducts) {
    return <span>Loaindg yo man~</span>;
  }
  if (isError) {
    return <span>"error" : {error.message}</span>;
  }

  const handleQuantity = (productId: string, buttonId: string) => {
    if (buttonId === "decrease") {
      setCartProducts((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity:
              prev[productId].quantity === 1 ? 1 : prev[productId].quantity - 1,
          },
        };
      });
    } else if (buttonId === "increase") {
      setCartProducts((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: prev[productId].quantity + 1,
          },
        };
      });
    }
  };

  const handleSelectedSize = (productId: string, newSelectedSize: string) => {
    setCartProducts((prev) => {
      return {
        ...prev,
        [productId]: {
          ...prev![productId],
          selectedSize: newSelectedSize,
        },
      };
    });
  };

  const handleDelete = (productId: string) => {
    setCartProducts((prev) => {
      if (!prev) return prev;
      const shouldUpdated = { ...prev };
      delete shouldUpdated[productId];
      return shouldUpdated;
    });
  };

  return (
    <section>
      <h1>장바구니</h1>
      <ul>
        {Object.values(cartProducts).map((product, id) => {
          return (
            <li key={id}>
              <CartTable
                product={product}
                handleQuantity={handleQuantity}
                handleSelectedSize={handleSelectedSize}
                handleDelete={handleDelete}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Cart;
