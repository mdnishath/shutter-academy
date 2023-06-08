import React from "react";
import Image from "../shared/Image";
import useAuth from "../../hooks/useAuth";
import ThemeSwitcher from "../ThemeSwitcher";
import ActiveLink from "../ActiveLink";
import { BiUser } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-end px-4 bg-white dark:bg-gray-800 shadow-xl h-[70px]">
      {/* Profile picture */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-6">
          <div>
            <ThemeSwitcher />
          </div>
          {!user ? (
            <div>
              <ul className="flex justify-center flex-grow gap-6">
                <li className="font-semibold">
                  <ActiveLink to={"/login"}>Login</ActiveLink>
                </li>
                <li className="font-semibold">
                  <ActiveLink to={"/signup"}>Signup</ActiveLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <figure>
                  <Image
                    className="w-[50px] h-[50px] rounded-full border-2 border-primary"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                </figure>
              ) : (
                <div className="relative p-2 border-2 rounded-full border-primary">
                  <BiUser className="text-2xl text-primary" />
                </div>
              )}

              <div className="relative group">
                <div className="bg-transparent dropdown dropdown-end">
                  <label tabIndex={0} className="m-1 cursor-pointer">
                    <FaAngleDown className="text-xl text-primary" />
                  </label>
                  <div className="flex flex-col gap-2 p-2 bg-white shadow-lg dark:bg-gray-700 dropdown-content menu rounded-box w-52">
                    {/* <Link className="px-3 py-2" to="/dashboard">
                      Dashboard
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="px-6 py-2 font-semibold text-gray-900 rounded-full bg-primary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
