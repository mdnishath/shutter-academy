import React from "react";
import Title from "../../components/shared/Title";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Title text={`Welcome, ${user?.displayName}!`} />
    </div>
  );
};

export default Dashboard;
