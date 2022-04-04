import { useEffect, useRef, FC } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC = ({ children }) => {
  const prevLocation = useRef<string>();
  const location = useLocation();

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevLocation.current = location.pathname;
    }
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
