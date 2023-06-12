import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import ActiveLink from "./ActiveLink";
import ThemeSwitcher from "./ThemeSwitcher";
import Container from "./shared/Container";
import Image from "./shared/Image";
import { BiUser } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GlobalLoader from "./loaders/GlobalLoader";
import { HiMenuAlt2 } from "react-icons/hi";
import useTheme from "../hooks/useTheme";

const MobileMenu = ({ menuOptions, logo }) => {
  const navigate = useNavigate();
  const { user, logOut, setLoading } = useAuth();
  const [cart, cartLoading] = useCart();
  const { open, setOpen } = useTheme();
  console.log(open);
  console.log(cart);
  const handleLogout = async () => {
    await logOut();
    setLoading(false);
    navigate("/login");
  };

  return (
    <nav className="py-2 z-[150] bg-white shadow-lg dark:bg-gray-800">
      <Container>
        <div className="flex items-center justify-between">
          <Link to={"/"} className="flex-shrink-0">
            <Image className="w-[200px]" src={logo} alt="Logo" />
          </Link>

          <div className="flex items-center gap-8">
            <Link to={"/dashboard/my-selted-classes"} className="relative">
              <AiOutlineShoppingCart className="text-xl" />
              <span className="absolute -top-3 -right-3 text-primary">
                {cart?.length}
              </span>
            </Link>
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <HiMenuAlt2
                onClick={() => setOpen(!open)}
                className="text-2xl cursor-pointer text-primary"
              />
            </div>
          </div>

          {open && (
            <div className="fixed  z-[180] top-0 right-0 w-8/12 h-full bg-gray-800 shadow-lg">
              <div className="p-5">
                <div className="flex gap-5 text-primary">
                  <AiOutlineArrowLeft
                    onClick={() => setOpen(!open)}
                    className="text-2xl cursor-pointer"
                  />
                  <h3 className="font-semibold mb-7 ">MENU</h3>
                </div>
                <ul className="flex flex-col justify-center flex-grow gap-4 text-white">
                  {menuOptions.map((item, index) => (
                    <li key={index} className="font-semibold">
                      <ActiveLink to={item?.path}>{item.name}</ActiveLink>
                    </li>
                  ))}
                </ul>
                <div className="flex-shrink-0 text-white ">
                  <div className="flex items-center gap-4">
                    {!user ? (
                      <div className="mt-3">
                        <ul className="flex flex-col gap-4">
                          <li className="font-semibold">
                            <ActiveLink to={"/login"}>Login</ActiveLink>
                          </li>
                          <li className="font-semibold">
                            <ActiveLink to={"/signup"}>Signup</ActiveLink>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
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

                        <div className="relative group z-[151]">
                          <div className="bg-transparent dropdown dropdown-end">
                            <label tabIndex={0} className="m-1 cursor-pointer">
                              <FaAngleDown className="text-xl text-primary" />
                            </label>
                            <div className="flex flex-col gap-2 p-2 bg-white shadow-lg dark:bg-gray-700 dropdown-content menu rounded-box w-52">
                              <Link className="px-3 py-2" to="/dashboard">
                                Dashboard
                              </Link>
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
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default MobileMenu;
