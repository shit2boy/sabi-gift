import React from "react";
// import logo from "./logo.svg";
import {
  usePaystackPayment,
  PaystackButton,
  PaystackConsumer,
} from "react-paystack";
// import "./App.css";

const config = {
  reference: new Date().getTime(),
  email: "writeshittu@gmail.com",
  amount: 20000,
  publicKey: "pk_test_33c5ce31f9965f58cba4db83ce4aae86548f3eaf",
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment();
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

function Pay() {
  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: () => null,
    onClose: () => null,
  };

  return (
    <div className="App">
      <PaystackHookExample />
      <PaystackButton {...componentProps} />
      <PaystackConsumer {...componentProps}>
        {({ initializePayment }) => (
          <button onClick={() => initializePayment()}>
            Paystack Consumer Implementation
          </button>
        )}
      </PaystackConsumer>
    </div>
  );
}
export default Pay;
