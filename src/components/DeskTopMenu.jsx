import ActiveLink from "./ActiveLink";
import ThemeSwitcher from "./ThemeSwitcher";
import Container from "./shared/Container";
import Image from "./shared/Image";
import { BiUser } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";

const DeskTopMenu = ({ menuOptions, logo }) => {
  const user = false;
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
              <div className="flex items-center gap-3">
                <div className="relative p-2 border-2 rounded-full border-primary">
                  <BiUser className="text-2xl text-primary" />
                </div>
                <FaAngleDown className="text-xl text-primary" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default DeskTopMenu;
