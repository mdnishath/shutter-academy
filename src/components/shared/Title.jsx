import React from "react";

const Title = ({ text }) => {
  return (
    <h3 className="text-3xl font-semibold text-gray-900 dark:text-textLight">
      {text}
    </h3>
  );
};

export default Title;
