import React from "react";
import ActiveLink from "../../ActiveLink";

const Item = ({ item }) => {
  const { path, name, icon: Icon } = item || {};
  return (
    <ActiveLink to={path}>
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-2xl" />}
        <p>{name}</p>
      </div>
    </ActiveLink>
  );
};

export default Item;
