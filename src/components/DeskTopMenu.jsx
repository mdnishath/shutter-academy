import useAuth from "../hooks/useAuth";
import ActiveLink from "./ActiveLink";
import ThemeSwitcher from "./ThemeSwitcher";
import Container from "./shared/Container";
import Image from "./shared/Image";
import { BiUser } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DeskTopMenu = ({ menuOptions, logo }) => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };
  return (
    <nav className="py-2 bg-white shadow-lg dark:bg-gray-800">
      <Container>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image src={logo} alt="Logo" />
          </div>
          <ul className="flex justify-center flex-grow gap-6">
            {menuOptions.map((item, index) => (
              <li key={index} className="font-semibold">
                <ActiveLink to={item?.path}>{item.name}</ActiveLink>
              </li>
            ))}
          </ul>
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
                  <div className="relative p-2 border-2 rounded-full border-primary">
                    <BiUser className="text-2xl text-primary" />
                  </div>
                  <FaAngleDown className="text-xl text-primary" />
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 font-semibold text-gray-900 rounded-full bg-primary"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default DeskTopMenu;
