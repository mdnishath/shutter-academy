import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
