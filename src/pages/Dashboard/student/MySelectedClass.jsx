import React from "react";
import useCart from "../../../hooks/useCart";
import Table from "../../../components/shared/Table";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import useAuth from "../../../hooks/useAuth";
import { BsCurrencyDollar } from "react-icons/bs";
import Image from "../../../components/shared/Image";

const MySelectedClass = () => {
  const { loading } = useAuth();
  const [cart, cartLoading] = useCart();
  console.log(cart);
  const labels = ["Name", "Price", "Actions"];

  const handleDelete = (item) => {
    console.log(item);
  };
  const handlePay = (item) => {
    console.log(item);
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
                onClick={() => handleDelete(item)}
                className={` border  rounded-full btn-xs text-textDark dark:text-textLight bg-transparent`}
              >
                Approved
              </button>
              <button
                className={` border  rounded-full btn-xs text-textDark px-4 border-primary bg-primary`}
                onClick={() => handlePay(item)}
              >
                Pay
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
export default MySelectedClass;
