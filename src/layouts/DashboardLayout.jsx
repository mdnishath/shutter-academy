import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Dashboard/Topbar";
import Sidbar from "../components/Dashboard/Sidbar";

const DashboardLayout = () => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidbar />
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Top bar */}
        <Topbar />

        {/* Main content area */}
        <div className="flex-1 p-4 md:pl-[250px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
