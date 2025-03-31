import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems, deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { Button } from "@/components/ui/button";

function ShoppingCart() {
  const { cartItems, isLoading } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  const handleDelete = (productId) => {
    dispatch(deleteCartItem({ userId: user.id, productId }));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartQuantity({ userId: user.id, productId, quantity }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <Button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</Button>
              <Button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</Button>
              <Button onClick={() => handleDelete(item.productId)}>Remove</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
