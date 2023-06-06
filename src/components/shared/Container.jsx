import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-screen-xl px-2 mx-auto sm:px-2 md:px-3 lg:px-0">
      {children}
    </div>
  );
};

export default Container;
