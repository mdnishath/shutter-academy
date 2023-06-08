import React from "react";
import Image from "./Image";

const Table = ({ labels, children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {labels.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {/* row 1 */}
          {children.map((item) => (
            <tr key={item._id}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="w-12 h-12 mask mask-squircle">
                      <Image src={item?.photo} alt={item?.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item?.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {item.email}
                <br />
              </td>
              <td>{item.role}</td>
              <th>
                <button className="px-3 py-1 mr-2 rounded-md bg-primary text-textDark">
                  Admin
                </button>
                <button className="px-3 py-1 mr-2 bg-blue-500 rounded-md text-textDark">
                  Instructor
                </button>
                <button className="px-3 py-1 bg-orange-500 rounded-md text-textDark">
                  Student
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
