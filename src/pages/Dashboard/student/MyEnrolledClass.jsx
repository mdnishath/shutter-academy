import React from "react";

import Table from "../../../components/shared/Table";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import useAuth from "../../../hooks/useAuth";
import { BsCurrencyDollar } from "react-icons/bs";
import Image from "../../../components/shared/Image";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyEnrolledClass = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const labels = ["Name", "Price", "Date"];
  const { data: enrolled = [], isLoading } = useQuery(
    ["enrolled"],
    async () => {
      const res = await axiosSecure.get("/student/enrolled");
      return res.data;
    }
  );

  if (isLoading || loading) {
    return <GlobalLoader />;
  }
  return (
    <div className="mt-6">
      <Table labels={labels}>
        {enrolled.map((item) => (
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
              <Link
                className={` border  rounded-full btn-xs text-textDark px-4 border-primary bg-primary`}
                to={`#`}
              >
                View Class
              </Link>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};
export default MyEnrolledClass;
