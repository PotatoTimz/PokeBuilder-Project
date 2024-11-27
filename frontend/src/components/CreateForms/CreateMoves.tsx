import { useContext, useEffect, useState } from "react"; // React hooks for state and effect management
import { Move, Type } from "../../interfaces/PokemonInterfaces"; // Importing Move and Type interfaces for move data structure
import { UserContext } from "../../context/UserAuth"; // Importing UserContext for user authentication and authorization
import { useNavigate, useParams } from "react-router-dom"; // React Router hooks for navigation and accessing URL parameters
import { fetchTypes } from "../../utilities/fetchTypes"; // Function to fetch available Pokémon types from an API
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Helper function to capitalize the first character of a string
import {
  createMove,
  fetchMoveById,
  updateMove,
} from "../../utilities/fetchMoveInfo"; // API functions to create, fetch, and update moves
import SearchOfficialMove from "./SearchOfficialMove"; // A component to search for official Pokémon moves via the PokeAPI

interface Props {
  updateMode: boolean; // Boolean prop to determine if the component is in update mode (if true, it's for updating an existing move)
}

/*
  Create / Update Move Component.
  This component dynamically switches between creating a new move and updating an existing move,
  based on the provided URL parameters and the `updateMode` prop.

  Create Mode:
  - The form allows users to create a new move by filling out a set of fields such as name, description, power, accuracy, PP, and type.
  - Users can also search for an official Pokémon move and pull data from the PokeAPI to fill in the form.

  Update Mode:
  - The form is pre-populated with data from an existing move. Users can modify the data and submit changes to update the move.
*/

function CreateMoves(props: Props) {
  // Retrieve the move ID from the URL parameters for update mode
  const { id } = useParams();

  // Access authentication data and fetch function from context
  const { axiosFetch, username } = useContext(UserContext);

  // State hooks for move data, available types, loading state, and move data management
  const [types, setTypes] = useState<Type[]>([]); // List of Pokémon move types
  const [moveData, setMoveData] = useState<Move>({
    move_id: 0,
    move_accuracy: 1,
    move_description: "",
    move_name: "",
    move_power: 0,
    move_pp: 1,
    type: "normal",
  });

  // State to track loading state for prerequisite API calls
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hook to navigate programmatically (e.g., redirecting after a move is created or updated)
  const navigate = useNavigate();

  // Side effect to fetch types and move data if in update mode
  useEffect(() => {
    async function getAllTypes() {
      const response = await fetchTypes(axiosFetch); // Fetch all available move types from the API
      setTypes(response);
    }

    // If in update mode, fetch the current move's data by ID and check if the user is the creator
    async function getMoveData() {
      const response = await fetchMoveById(axiosFetch, id as string);
      setMoveData({ ...response, type: response.type.type_name });

      // If the logged-in user is not the creator of the move, redirect to home page
      if (username !== response.move_creator) {
        navigate("/"); // Redirect to the home page
      }
    }

    getAllTypes(); // Fetch all types on component load
    if (props.updateMode) {
      getMoveData(); // Fetch existing move data for update mode
    }

    setIsLoading(true); // Set loading state to true while API calls are in progress
  }, []);

  // Function to handle form submission for either creating or updating a move
  const submitMove = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (props.updateMode) {
      // If in update mode, call the updateMove function with the move data
      await updateMove(axiosFetch, id as string, moveData);
      navigate("/move"); // Redirect to the move list page after updating
    } else {
      // If in create mode, log the move data and create a new move
      console.log(moveData); // Log the move data (for debugging purposes)
      await createMove(axiosFetch, moveData);
      navigate("/move"); // Redirect to the move list page after creating the new move
    }
  };

  // Function to handle searching for an official move from the PokeAPI and filling in the form with the result
  const searchResult = async (moveData: Move) => {
    setMoveData({
      ...moveData,
      move_name: capitalizeFirstCharacter(moveData.move_name), // Capitalize the first character of the move name
      move_power: moveData.move_power == null ? 0 : moveData.move_power, // Ensure that move power is not null
    });
  };

  // Render the form only after the required API calls are completed (when isLoading is true)
  return isLoading ? (
    <>
      <div className="container-fluid bg-gradient py-5">
        <div className="row justify-content-center mt-1 py-5">
          <div className="col-lg-6 bg-light shadow-sm card px-5 py-3">
            <div className="text-center fw-bold fs-1 mt-3">
              Create Your Move!
            </div>

            {/* Move creation or update form */}
            <form>
              {/* Move name input */}
              <div className="form-group my-3">
                <label>Name</label>
                <input
                  value={moveData.move_name}
                  type="text"
                  maxLength={20}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({ ...moveData, move_name: e.target.value })
                  }
                />
              </div>

              {/* Move description input */}
              <div className="form-group my-3">
                <label>Description</label>
                <input
                  type="text"
                  value={moveData.move_description}
                  maxLength={200}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_description: e.target.value,
                    })
                  }
                />
              </div>

              {/* Move power input */}
              <div className="form-group my-3">
                <label>Power</label>
                <input
                  type="number"
                  value={moveData.move_power}
                  max={200}
                  min={0}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_power: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Move accuracy input */}
              <div className="form-group my-3">
                <label>Accuracy</label>
                <input
                  type="number"
                  value={moveData.move_accuracy}
                  max={100}
                  min={1}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_accuracy: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Move PP input */}
              <div className="form-group my-3">
                <label>PP</label>
                <input
                  type="number"
                  value={moveData.move_pp}
                  max={50}
                  min={1}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_pp: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              {/* Move type selection */}
              <div className="form-group my-3">
                <label>Type</label>
                <select
                  className="form-control"
                  value={moveData.type as string}
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      type: e.target.value,
                    })
                  }
                >
                  {/* Populate the select input with available types */}
                  {types.map((type, index) => {
                    return (
                      <option value={`${type.name}`} key={index}>
                        {capitalizeFirstCharacter(type.name)}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Submit button for the form */}
              <div className="form-group my-3">
                <input
                  className="form-control btn btn-primary"
                  type="submit"
                  onClick={submitMove}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Section for searching and pulling official move data */}
        <div className="row justify-content-center">
          <div className="col-lg-6 bg-danger shadow-sm card px-5 py-3">
            <SearchOfficialMove
              searchResult={searchResult} // Function to handle the search result
              axiosFetch={axiosFetch} // Axios function for making requests
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>loading</div> // Display loading message until data is loaded
  );
}

export default CreateMoves; // Export the component to be used in other parts of the application
