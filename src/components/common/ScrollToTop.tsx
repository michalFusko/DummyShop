import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isShopPage = /^\/shop\/[^\/]+\/\d+$/.test(pathname);
    if (isShopPage) return;
    // skips scroll in /shop paths, shop has its own scroll

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
