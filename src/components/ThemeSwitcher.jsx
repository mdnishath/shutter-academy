import useTheme from "../hooks/useTheme";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <label className="mt-1 swap swap-rotate">
      <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
      <div className="text-2xl">{isDarkTheme ? <BsSun /> : <BsMoon />}</div>
    </label>
  );
};

export default ThemeSwitcher;
