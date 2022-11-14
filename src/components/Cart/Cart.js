import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItem = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItem.length > 0 ? (
          cartItem.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                total: item.totalPrice,
                price: item.price,
                quantity: item.quantity,
              }}
            />
          ))
        ) : (
          <p>Pick some good!</p>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
