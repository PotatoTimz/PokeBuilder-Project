import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Page not found... Renavigating");
    setTimeout(() => {
      navigate("/", {});
    }, 1000);
  }, []);

  return <h1>Error Page URL Not Found</h1>;
}

export default PageNotFound;
