// Importing necessary React hooks and functions
import { useEffect } from "react"; // useEffect is used to run side effects in function components
import { useNavigate } from "react-router-dom"; // useNavigate hook is used to programmatically navigate between routes

/*
  PageNotFound component.
  When a route that doesn't exist is entered, this component is displayed and will 
  automatically redirect the user back to the homepage after 1 second.
*/

function PageNotFound() {
  // The useNavigate hook returns a function that allows us to navigate programmatically
  const navigate = useNavigate();

  // useEffect hook will execute the logic inside it when the component is mounted
  useEffect(() => {
    // Log a message to the console when the component is mounted, indicating that the page was not found
    console.log("Page not found... Renavigating");

    // setTimeout is used to delay the navigation back to the home page by 1000ms (1 second)
    setTimeout(() => {
      navigate("/", {}); // Navigating to the homepage ('/') after the timeout
    }, 1000); // Wait for 1 second before redirecting
  }, []); // Empty dependency array means this effect will run once, when the component is mounted

  // The component renders a message informing the user that the page was not found
  return <h1>Error Page URL Not Found</h1>;
}

export default PageNotFound; // Exporting the component for use in other parts of the application
