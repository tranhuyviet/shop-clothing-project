import React from "react";
import "./stripe-button.styles.scss";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_8TL7Q4lpKKOBkIBGz6ZTXazg";

  const onToKen = token => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Shop Clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToKen}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
