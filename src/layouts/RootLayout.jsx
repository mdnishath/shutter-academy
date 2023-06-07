import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import GlobalLoader from "../components/loaders/GlobalLoader";

const RootLayout = () => {
  // const { loading } = useAuth();
  // if (loading) {
  //   return <GlobalLoader />;
  // }
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
