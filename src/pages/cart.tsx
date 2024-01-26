import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/authContext";
import { getCart, updateCart } from "../services/firebase";
import CartTable from "../components/cart/cartTable";
import { CartProducts } from "../types";
import { useEffect, useState } from "react";

function Cart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const [cartProducts, setCartProducts] = useState<CartProducts | null>(null);

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["carts", uid],
    queryFn: () => getCart(uid),
  });

  const mutation = useMutation({
    mutationFn: () => updateCart(uid, cartProducts!),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["carts", uid] });
    },

    onError: (error) => {
      console.error("cart mutation Error", error);
    },
  });

  useEffect(() => {
    if (!products) return;
    setCartProducts(products);
  }, [products]);

  if (!products || !cartProducts) {
    return <>장바구니가 비어있어요</>;
  }

  if (isLoading || mutation.isPending) {
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
    mutation.mutate();
  };

  const handlePay = () => {
    updateCart(uid, cartProducts);
    alert("handle Pay");
  };

  return (
    <section>
      <h1>장바구니</h1>
      <div className='flex flex-col gap-2 items-center'>
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
        {cartProducts && (
          <button
            onClick={handlePay}
            className='p-4 rounded-md bg-primary hover:bg-accent'
          >
            Cart Pay
          </button>
        )}
      </div>
    </section>
  );
}

export default Cart;
