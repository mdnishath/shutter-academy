import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch,
    isLoading: cartLoading,
    data: cart = [],
  } = useQuery({
    queryKey: ["cart"],
    enabled: user != null && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/cart`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [cart, cartLoading, refetch];
};

export default useCart;
