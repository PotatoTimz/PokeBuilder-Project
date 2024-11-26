// Import necessary hooks, context, and components
import { useContext, useEffect, useState } from "react"; // React hooks for state, effect, and context management
import { UserContext } from "../../context/UserAuth"; // Import the UserContext to access the authenticated axios instance
import { Move } from "../../interfaces/PokemonInterfaces"; // Import the Move interface to type the move data
import { fetchMoves } from "../../utilities/fetchMoveInfo"; // Function to fetch the list of moves
import MoveListData from "../DisplayData/MoveListData"; // Component to display the fetched move data

function SearchMove() {
  // Destructure the axios instance from UserContext to make authenticated API requests
  const { axiosFetch } = useContext(UserContext);

  // useState hooks to manage local state of the component
  const [moveData, setMoveData] = useState<Move[]>([]); // Holds the list of moves fetched from the API
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // State to track whether the data has finished loading

  // useEffect hook to fetch the list of moves once the component is mounted
  useEffect(() => {
    // Function to fetch moves from the API
    async function getAllMoves() {
      const response = await fetchMoves(axiosFetch); // Call the fetchMoves function with the axios instance
      console.log(response); // Log the response to the console for debugging
      setMoveData(response); // Update the state with the fetched move data
    }

    // Call the function to fetch moves
    getAllMoves();

    // After fetching data, set the isLoaded state to true
    setIsLoaded(true);
  }, []); // Empty dependency array ensures the effect only runs once when the component is mounted

  return (
    <>
      <div className="container-fluid">
        {/* Header section displaying the title */}
        <div className="row my-5 border-bottom">
          <div className="fs-1 fw-bold text-center">Moves</div>
        </div>

        {/* Display the list of moves */}
        <div className="row justify-content-center">
          <div className="col-8">
            {/* Pass the moveData to the MoveListData component for rendering the move list */}
            <MoveListData moveData={moveData} mode="default" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchMove; // Export the SearchMove component for use in other parts of the application
