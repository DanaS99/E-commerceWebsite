import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../redux/features/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { getBaseUrl } from '../../../utils/baseURL';

const OrderSummary = () => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const products = useSelector((store) => store.cart.products);
  console.log(products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (store) => store.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //payment integration using stripe
  const makePayment = async (e) => {
    console.log(import.meta.env.VITE_STRIPE);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE);
    const body = {
      products: products,
      userId: user?.id,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(
      `${getBaseUrl()}/api/orders/create-checkout-session`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session  = await response.json();
    console.log('session',session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    console.log('result', result);
    if (result.error) {
      console.log('error',result.error);
    }
  };

  return (
    <div className='bg-primary-light mt-5 rounded text-base'>
      <div className='px-6 py-4 space-y-5'>
        <h2 className='text-2xl text-text-dark'>Order Summary</h2>
        <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax: ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className='font-bold'>GrandTotal: ${grandTotal.toFixed(2)}</h3>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'
          >
            <span className='mr-2'>Clear Cart</span>
            <i className='ri-delete-bin-7-line'></i>
          </button>
          <button
            onClick={makePayment}
            className='bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center'
          >
            <span className='mr-2'>Proceed Checkout</span>
            <i className='ri-id-card-line'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
