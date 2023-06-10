import React from "react";
import Title from "../../components/shared/Title";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div>
      <Title text={`Welcome, ${user?.displayName}! (${role})`} />
    </div>
  );
};

export default Dashboard;
