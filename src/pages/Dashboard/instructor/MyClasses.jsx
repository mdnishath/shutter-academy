import React, { useState } from "react";
import Table from "../../../components/shared/Table";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import Image from "../../../components/shared/Image";
import UpdateModal from "../../../components/Dashboard/instructor/UpdateModal";

const MyClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [show, setShow] = useState(false);
  const [itemProps, setItemProps] = useState();
  const labels = [
    "Title",
    "Enrolled Students",
    "Stutas",
    "Feedback",
    "Actions",
  ];
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/instructor");
    return res.data;
  });

  //handle Modal
  const handleModal = (item) => {
    setItemProps(item);
    setShow(!show);
  };
  const handleClose = () => setShow(!show);
  if (isLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="mt-6">
      {itemProps && show && (
        <UpdateModal item={itemProps} handleClose={handleClose} />
      )}
      <Table labels={labels}>
        {classes.map((item) => (
          <tr key={item._id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-[150px] h-20">
                    <Image className="" src={item?.image} alt={item?.name} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item?.title}</div>
                </div>
              </div>
            </td>
            <td>
              {item?.enrolled}
              <br />
            </td>
            <td>{item.stutas}</td>
            <td>
              {item?.stutas === "pending" ? "no feedback" : item?.feedback}
            </td>
            <th>
              <button
                onClick={() => handleModal(item)}
                className={`px-6 py-1 mr-2 border-2 border-gray-700 rounded-full bg-primary text-textDark
                }`}
              >
                Update
              </button>
            </th>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default MyClasses;
