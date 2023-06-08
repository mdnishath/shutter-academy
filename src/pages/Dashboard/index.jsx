import React from "react";
import Title from "../../components/shared/Title";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useAuth();
  const [role] = useAdmin();
  return (
    <div>
      <Title text={`Welcome, ${user?.displayName}! (${role})`} />
    </div>
  );
};

export default Dashboard;
