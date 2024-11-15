import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*
 Page not found component.
 When route that doesn't exist is entered page will automatically return to the home page.
*/
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
