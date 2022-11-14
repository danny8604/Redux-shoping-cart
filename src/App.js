import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./components/store/ui";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.show.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.show.notification);
  console.log(notification);

  useEffect(() => {
    const sendCartData = async () => {
      try {
        dispatch(
          uiActions.showNotification({
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
          })
        );
        const response = await fetch(
          "https://react-htpp-161da-default-rtdb.firebaseio.com/cart.jsn",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );

        if (!response.ok) {
          throw new Error("sending failed!! 👻👻👻");
        }

        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfull",
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData();
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
