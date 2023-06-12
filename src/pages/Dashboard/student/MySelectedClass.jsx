import React from "react";
import useCart from "../../../hooks/useCart";
import Table from "../../../components/shared/Table";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import useAuth from "../../../hooks/useAuth";
import { BsCurrencyDollar } from "react-icons/bs";
import Image from "../../../components/shared/Image";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const MySelectedClass = () => {
  const { loading } = useAuth();
  const queryClient = useQueryClient();
  const [cart, cartLoading] = useCart();
  const [axiosSecure] = useAxiosSecure();
  console.log(cart);
  const labels = ["Name", "Price", "Actions"];

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/cart/${id}`);
    if (res.data.deletedCount) {
      toast.success("Deleted successfull");
      queryClient.invalidateQueries("cart");
    }
  };

  if (loading || cartLoading) {
    return <GlobalLoader />;
  }
  return (
    <div className="mt-6">
      <Table labels={labels}>
        {cart.map((item) => (
          <tr className="h-[100px] text-base" key={item._id}>
            <td className="px-4 py-4 text-sm font-medium ">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td className="px-4 text-sm font-medium">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-[150px] h-[80px]">
                    <Image className="" src={item?.image} alt={item?.name} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item?.title}</div>
                </div>
              </div>
            </td>

            <td className="">
              <div className="flex items-center flex-none gap-2">
                <BsCurrencyDollar className="text-primary" />
                <p>{item?.price}</p>
              </div>
            </td>

            <td className="flex items-center gap-2 h-[100px]">
              <button
                onClick={() => handleDelete(item._id)}
                className={` border  rounded-full btn-xs text-textDark dark:text-textLight bg-transparent`}
              >
                Delete
              </button>
              <Link
                className={` border  rounded-full btn-xs text-textDark px-4 border-primary bg-primary`}
                to={`/dashboard/payment/${item._id}`}
              >
                Pay
              </Link>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
export default MySelectedClass;
