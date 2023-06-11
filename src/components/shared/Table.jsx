import React from "react";
import Image from "./Image";

const Table = ({ labels, children }) => {
  return (
    <div className="w-10/12 h-full mx-auto overflow-x-auto rounded-md shadow-xl dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {labels.map((item, index) => (
              <th
                scope="col"
                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                key={index}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="items-center bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
