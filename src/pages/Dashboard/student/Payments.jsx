import React from "react";

import Table from "../../../components/shared/Table";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import useAuth from "../../../hooks/useAuth";
import { BsCurrencyDollar } from "react-icons/bs";
import Image from "../../../components/shared/Image";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCreditCard } from "react-icons/ai";

const Payments = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const labels = ["Class", "Payment Type", "Trx ID", "Date"];
  const { data: payments = [], isLoading } = useQuery(
    ["payments"],
    async () => {
      const res = await axiosSecure.get("/student/payment/history");
      return res.data;
    }
  );

  if (isLoading || loading) {
    return <GlobalLoader />;
  }
  console.log(payments);
  return (
    <div className="mt-6">
      <Table labels={labels}>
        {payments.map((item) => (
          <tr className="h-[100px] text-base" key={item._id}>
            <td className="px-4 py-4 text-sm font-medium ">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td className="px-4 text-sm font-medium">
              <div className="flex items-center gap-4">
                {/* <div className="avatar">
                  <div className="w-[150px] h-[80px]">
                    <Image className="" src={item?.image} alt={item?.name} />
                  </div>
                </div> */}
                <div>
                  <div className="font-bold">{item?.className}</div>
                </div>
              </div>
            </td>

            <td className="">
              <div className="flex items-center flex-none gap-2">
                <AiOutlineCreditCard className="text-primary" />
                <p>Card</p>
              </div>
            </td>
            <td className="">
              <div className="flex items-center flex-none gap-2">
                <p>{item?.transactionId}</p>
              </div>
            </td>

            <td className="flex items-center gap-2 h-[100px]">
              <p>{item?.date}</p>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
export default Payments;
