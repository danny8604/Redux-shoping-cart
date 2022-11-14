import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, total, price, quantity, id } = props.item;
  const incrementHandler = () => dispatch(cartActions.addToCart(props.item));
  const decrementHandler = () => dispatch(cartActions.removeItemFormCart(id));

  return (
    <Fragment>
      <li className={classes.item}>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>
            ${total.toFixed(2)}{" "}
            <span className={classes.itemprice}>
              (${price.toFixed(2)}/item)
            </span>
          </div>
        </header>
        <div className={classes.details}>
          <div className={classes.quantity}>
            x <span>{quantity}</span>
          </div>
          <div className={classes.actions}>
            <button onClick={decrementHandler}>-</button>
            <button onClick={incrementHandler}>+</button>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default CartItem;
