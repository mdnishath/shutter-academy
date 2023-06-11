import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import Table from "../../../components/shared/Table";
import Image from "../../../components/shared/Image";
import { BsCurrencyDollar } from "react-icons/bs";
import FeedBackModal from "../../../components/Dashboard/admin/FeedBackModal";
import { toast } from "react-hot-toast";

const ManageClassess = () => {
  const [axiosSecure] = useAxiosSecure();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [itemProps, setItemProps] = useState();
  const labels = [
    "Name",
    "Instructor",
    "Email",
    "Seats",
    "Price",
    "Status",
    "Actions",
  ];
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/admin/classes");
    return res.data;
  });

  const handleFeedback = (item) => {
    setItemProps(item);
    setShow(!show);
  };
  const handleClose = () => setShow(!show);
  const mutation = useMutation({
    mutationFn: async ({ id, stutas }) => {
      const response = await axiosSecure.patch(`/admin/class/status/${id}`, {
        stutas,
      });

      const { modifiedCount } = response.data;
      if (modifiedCount > 0) {
        toast.success("Stutas changed");
        queryClient.invalidateQueries("classes");
      }
      return response;
    },
  });
  const { isLoading: updateLoading } = mutation;
  //handle course stutas
  const handleStutas = async ({ item, stutas }) => {
    console.log(item, stutas);
    try {
      await mutation.mutateAsync({ id: item?._id, stutas });
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  if (isLoading || updateLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="mt-6">
      {itemProps && show && (
        <FeedBackModal item={itemProps} handleClose={handleClose} />
      )}
      <Table labels={labels}>
        {classes.map((item) => (
          <tr className="h-[100px] text-base" key={item._id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td className="px-4 text-sm font-medium whitespace-nowrap">
              <div className="flex items-center space-x-3">
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
            <td>
              {item?.instructor}
              <br />
            </td>
            <td>{item?.email}</td>
            <td>{item?.seats}</td>
            <td className="flex items-center h-[100px]">
              <BsCurrencyDollar className="text-primary" />
              <p>{item?.price}</p>
            </td>
            <td className="h-[100px]">
              <span>{item?.stutas}</span>
            </td>
            <th className="flex items-center gap-2 h-[100px]">
              <button
                onClick={() => handleStutas({ item, stutas: "approved" })}
                className={`bg-transparent border  rounded-full btn-xs text-textDark dark:text-textLight ${
                  item.stutas === "approved"
                    ? "border-primary"
                    : "border-gray-500"
                }`}
                disabled={item.stutas === "approved" || item.stutas === "deny"}
              >
                Approved
              </button>
              <button
                className={`bg-transparent border  rounded-full btn-xs text-textDark dark:text-textLight ${
                  item.stutas === "pending"
                    ? "border-primary"
                    : "border-gray-500"
                }`}
                disabled={item.stutas === "pending"}
                onClick={() => handleStutas({ item, stutas: "pending" })}
              >
                Pending
              </button>
              <button
                onClick={() => handleStutas({ item, stutas: "deny" })}
                className={`bg-transparent border  rounded-full btn-xs text-textDark dark:text-textLight ${
                  item.stutas === "deny" ? "border-primary" : "border-gray-500"
                }`}
                disabled={item.stutas === "approved" || item.stutas === "deny"}
              >
                Deny
              </button>
              <button
                onClick={() => handleFeedback(item)}
                className={` border border-gray-500 rounded-full btn-xs  ${
                  item?.feedback ? "bg-primary text-textDark" : "bg-transparent"
                }`}
              >
                Feedback
              </button>
            </th>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ManageClassess;
