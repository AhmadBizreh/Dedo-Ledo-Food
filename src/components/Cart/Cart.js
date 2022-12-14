import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';



const Cart = (props) => {

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmiting, setDidSubmiting] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHanler = async (addressData) => {
    setIsSubmiting(true);
    await fetch('https://react-http-de91a-default-rtdb.firebaseio.com/Order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          address: addressData,
          cart: cartCtx.items,
        })
      }
    );
    setIsSubmiting(false);
    setDidSubmiting(true);
    cartCtx.clearCart();
  };


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  // const Checkouts = (
  //   <ul className={classes['cart-items']}>
  //     {cartCtx.items.map((item) => (
  //       <Checkout
  //         onSubmitOrder={submitOrderHanler}
  //         onCancel={props.onClose}
  //       // key={item.id}
  //       // name={item.name}
  //       // amount={item.amount}
  //       // price={item.price}
  //       />
  //     ))}
  //   </ul>
  // );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  
  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout
        onSubmitOrder={submitOrderHanler}
        onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </>);

  const modalContentIsSubmiting = (
    <p>Sending Order Data...</p>

  );
  const modalContentDidSubmiting = (
    <>
      <p>Your Food Is Being Prepared .SMILE. </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmiting && modalContent}
      {isSubmiting && modalContentIsSubmiting}
      {!isSubmiting && didSubmiting && modalContentDidSubmiting}
    </Modal>
  );
};

export default Cart;
