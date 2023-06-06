import { useContext } from "react";
import { ThemeProvider } from "../contexts/ThemeProvider";

const useTheme = () => {
  const theme = useContext(ThemeProvider);
  return theme;
};

export default useTheme;
