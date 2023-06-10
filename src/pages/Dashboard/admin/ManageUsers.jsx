import React from "react";
import Table from "../../../components/shared/Table";
import useUsers from "../../../hooks/useUsers";
import GlobalLoader from "../../../components/loaders/GlobalLoader";
import Image from "../../../components/shared/Image";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
// import useAdmin from "../../../hooks/useAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const { user, loading, setLoading } = useAuth();
  // const [isroleLoading] = useAdmin();
  const labels = ["Name", "Email", "Role", "Actions"];
  const [axiosSecure] = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const response = await axiosSecure.patch(`/admin/${id}`, { role });

      const { modifiedCount } = response.data;
      if (modifiedCount > 0) {
        toast.success("Role updated");
        refetch();
      }
      return response;
    },
  });
  const { isLoading: updateLoading } = mutation;
  const handleUpdateRole = async ({ id, role }) => {
    console.log(role);
    try {
      await mutation.mutateAsync({ id, role });
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  // console.log(mutation);
  // console.log(isroleLoading);

  if (isLoading || isLoading || updateLoading) {
    return <GlobalLoader />;
  }

  return (
    <div className="mt-6">
      <Table labels={labels}>
        {users.map((item) => (
          <tr key={item._id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </td>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="w-12 h-12">
                    <Image
                      className="rounded-full"
                      src={item?.photo}
                      alt={item?.name}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item?.name}</div>
                </div>
              </div>
            </td>
            <td>
              {item.email}
              <br />
            </td>
            <td>{item.role}</td>
            <th>
              <button
                onClick={() =>
                  handleUpdateRole({ id: item._id, role: "admin" })
                }
                className={`px-6 py-1 mr-2 border-2 border-gray-700 rounded-full ${
                  item.role === "admin" && "bg-primary text-textDark"
                }`}
                disabled={item.role === "admin"}
              >
                Admin
              </button>
              <button
                onClick={() =>
                  handleUpdateRole({
                    id: item._id,
                    role: "instructor",
                  })
                }
                className={`px-6 py-1 mr-2 border-2 border-gray-700 rounded-full ${
                  item.role === "instructor" && "bg-primary text-textDark"
                }`}
                disabled={item.role === "instructor"}
              >
                Instructor
              </button>
              <button
                onClick={() =>
                  handleUpdateRole({ id: item._id, role: "student" })
                }
                className={`px-6 py-1 mr-2 border-2 border-gray-700 rounded-full ${
                  item.role === "student" && "bg-primary text-textDark"
                }`}
                disabled={item.role === "student"}
              >
                Student
              </button>
            </th>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ManageUsers;
