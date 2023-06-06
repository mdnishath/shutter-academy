import React, { useState, useEffect } from "react";

const useIsMobileScreen = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkIsMobileScreen = () => {
      const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
      setIsMobileScreen(isMobile);
    };

    checkIsMobileScreen(); // Initial check

    window.addEventListener("resize", checkIsMobileScreen);

    return () => {
      window.removeEventListener("resize", checkIsMobileScreen);
    };
  }, []);

  return isMobileScreen;
};

export default useIsMobileScreen;
