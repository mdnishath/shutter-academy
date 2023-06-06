import React from "react";

const Image = ({ src, alt = "Logo" }) => {
  return <img src={src} alt={alt} />;
};

export default Image;
