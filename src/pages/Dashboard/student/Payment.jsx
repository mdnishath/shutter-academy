import React from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import Container from "../../../components/shared/Container";
import Title from "../../../components/shared/Title";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/payment/CheckoutForm";
import useCart from "../../../hooks/useCart";

const Payment = () => {
  const stripePromise = loadStripe(
    import.meta.env.VITE_PAYMENT_GETWAY_PUBLIC_KEY
  );
  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();
  const [cart, cartLoading] = useCart();
  const foundObject = cart.find((obj) => obj._id === id);

  console.log(foundObject);
  //   const {
  //     data: paymentClass = {},
  //     isLoading,
  //     refetch,
  //   } = useQuery(["paymentClass"], async () => {
  //     const res = await axiosSecure.get(`/student/class/${id}`);
  //     return res.data;
  //   });
  //   const { price } = paymentClass;

  if (cartLoading) {
    return <GlobalLoader />;
  }
  return (
    <div>
      <Container>
        <div className="my-6 text-center">
          <Title text={"Pay Now"} />
          <p>Total payment: ${foundObject?.price}</p>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={Number(foundObject?.price)}
                cart={foundObject}
              />
            </Elements>
          </div>
        </div>

        <div></div>
      </Container>
    </div>
  );
};

export default Payment;
