import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer.push({
      event: "page_view",
      page: location.pathname,
    });
    console.log("Page View:", location.pathname);
  }, [location]);

  return null;
}

export default AnalyticsTracker;
