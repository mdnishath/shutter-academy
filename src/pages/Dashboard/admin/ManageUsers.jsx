import React from "react";
import Table from "../../../components/shared/Table";
import useUsers from "../../../hooks/useUsers";
import GlobalLoader from "../../../components/loaders/GlobalLoader";

const ManageUsers = () => {
  const [users, isUsersLoading] = useUsers();
  if (isUsersLoading) {
    return <GlobalLoader />;
  }
  console.log(users);
  const labels = ["Name", "Email", "Role", "Actions"];
  return (
    <div>
      <Table labels={labels}>{users}</Table>
    </div>
  );
};

export default ManageUsers;
