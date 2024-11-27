import { Axios } from "axios"; // Import Axios for API requests
import { useState } from "react"; // Import useState hook from React for managing component state
import { fetchMovePokeApi } from "../../utilities/fetchPokeAPI"; // Import the function to fetch move data from PokeAPI
import { Move } from "../../interfaces/PokemonInterfaces"; // Import the Move type definition for TypeScript

// Interface to define the expected props for this component
interface Props {
  axiosFetch: Axios; // Axios instance for making API requests
  searchResult: (moveData: Move) => void; // Callback function to handle the move data returned from the API
}

/*
  Search Official Move Component
  This component allows users to search for official Pokémon moves by querying the PokeAPI.
  It fills in the form with the retrieved move data if the move exists.
  If the move doesn't exist, an error message is displayed.
*/

function SearchOfficialMove(props: Props) {
  // Local state for tracking the search input query and error status
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for storing the user's search input (move name)
  const [error, setError] = useState<boolean>(false); // State for tracking if there was an error during the search

  // Function to search for a Pokémon move using the PokeAPI
  const searchMove = async (moveName: string) => {
    // Fetch move data from PokeAPI using the passed axios instance
    const response = await fetchMovePokeApi(props.axiosFetch, moveName);
    console.log(response); // Log the response for debugging purposes

    // If the response is "error", set the error state to true
    if (response == "error") {
      setError(true); // Indicate that the move was not found
    } else {
      // If the move exists, pass the move data to the parent component via the searchResult callback
      props.searchResult(response);
      setError(false); // Reset error state if the move is found
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        {/* Title section */}
        <div className="row">
          <div className="text-white text-center fs-2 my-3 fw-medium">
            Search Official Moves {/* Header for the search section */}
          </div>
        </div>
        {/* Description section */}
        <div className="row">
          <div className="text-white text-center fs-5">
            Want to start with some official moves? Search for a move already in
            the game and start your new move with it as a template!{" "}
            {/* Instructions */}
          </div>
        </div>
        {/* Search bar section */}
        <div className="row mt-5">
          <div className="input-group mb-3">
            {/* Input field for entering the move name */}
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setSearchQuery(e.target.value); // Update search query as user types
              }}
              placeholder="Enter the name of an official Pokemon move"
            />
            {/* Search button that triggers the searchMove function when clicked */}
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={
                  () => searchMove(searchQuery.toLowerCase().replace(" ", "-")) // Search with the formatted move name
                }
              >
                Search {/* Button text */}
              </button>
            </div>
          </div>
        </div>
        {/* Error message displayed if the move doesn't exist in the API */}
        {error ? (
          <div className="row">
            <div className="text-white text-center fs-6 fw-light">
              The move you entered doesn't seem to exist. Please check over the
              inputed move for any errors. {/* Error message */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchOfficialMove; // Export the component to be used elsewhere
