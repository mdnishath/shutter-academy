import React from "react";

const Image = ({ src, alt = "Logo", className }) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
    />
  );
};

export default Image;
