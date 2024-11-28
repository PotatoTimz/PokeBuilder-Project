import { useContext, useEffect, useState } from "react"; // Import React hooks
import { useNavigate, useParams } from "react-router-dom"; // Import navigation hooks for routing
import { UserContext } from "../../context/UserAuth"; // Import context for authenticated user
import { ExtensivePokemonData, Move } from "../../interfaces/PokemonInterfaces"; // Import data types
import {
  fetchLearnableMoves, // Function to fetch the learnable moves for a Pokémon
  addMovePokemon, // Function to add a move to a Pokémon's current moveset
  deleteMovePokemon, // Function to delete a move from a Pokémon's moveset
} from "../../utilities/fetchMoveInfo"; // Utility functions for managing moves
import { fetchPokemonById } from "../../utilities/fetchPokemonInfo"; // Function to fetch Pokémon details
import MoveListData from "../DisplayData/MoveListData"; // Component to display a list of moves

/*
  Edit Pokemon Moveset Component.
  Allows users to edit the moveset of their pokemon (determined by their parameters).
  Learnable moves and existing moves are displayed as a table. Buttons are beside them to either remove or 
  add the moves to the current pokemon. Once a move is added/removed from a pokemon, both tables will
  refresh, updating the moves to reflect the pokemon's current move list.
*/

function EditPokemonMoves() {
  const { axiosFetch } = useContext(UserContext); // Accessing authenticated API function from context
  const { id } = useParams(); // Extract the Pokémon ID from URL parameters
  const [pokemonData, setPokemonData] = useState<ExtensivePokemonData | null>(
    null
  ); // State to store current Pokémon data
  const [learnableMoveData, setLearnableMoveData] = useState<Move[]>([]); // State to store learnable moves for the Pokémon

  // State to track if the prerequisite API calls have been made and data is ready
  const [isLoading, setIsLoaded] = useState<boolean>(false);

  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to fetch the current moveset of the Pokémon
  async function getPokemonData() {
    const response = await fetchPokemonById(axiosFetch, id as string); // Fetch the Pokémon data by ID
    setPokemonData(response); // Set the fetched data into state
  }

  // Function to fetch the learnable moves of the Pokémon (moves the Pokémon can learn but doesn't have yet)
  async function getLearnableMoves() {
    const response = await fetchLearnableMoves(axiosFetch, id as string); // Fetch learnable moves
    setLearnableMoveData(response); // Set the learnable moves into state
  }

  // Effect hook to fetch Pokémon and learnable moves data when the component is mounted
  useEffect(() => {
    const initialFetch = async () => {
      await getPokemonData(); // Fetch Pokémon data
      await getLearnableMoves(); // Fetch learnable moves
      setIsLoaded(true); // Set loading state to false once data has been fetched
    };
    initialFetch(); // Invoke the async function to fetch data
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to add a move to the Pokémon's current moveset
  const learnMove = async (moveName: string) => {
    setIsLoaded(false); // Set loading state while API request is being made
    await addMovePokemon(axiosFetch, id as string, moveName); // Add the move to the Pokémon
    await getPokemonData(); // Refresh the Pokémon data
    await getLearnableMoves(); // Refresh the learnable moves list
    setIsLoaded(true); // Set loading state back to false after the data has been refreshed
  };

  // Function to remove a move from the Pokémon's current moveset
  const removeMove = async (moveName: string) => {
    setIsLoaded(false); // Set loading state while API request is being made
    await deleteMovePokemon(axiosFetch, id as string, moveName); // Remove the move from the Pokémon
    await getPokemonData(); // Refresh the Pokémon data
    await getLearnableMoves(); // Refresh the learnable moves list
    setIsLoaded(true); // Set loading state back to false after the data has been refreshed
  };

  // Render the form only if the prerequisite API calls are complete (isLoading is true)
  return isLoading ? (
    <>
      <div className="container-fluid">
        {/* Section displaying information about Pokémon and a button to proceed */}
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-8 col-md-10 col-sm-11 mx-4 bg-secondary rounded-pill">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10 col-sm-11 p-4">
                <div className="text-white fs-3 fw-medium text-center my-2">
                  Move Editor {/* Title */}
                </div>
                <div className="text-white fs-6 text-center my-2">
                  Good work creating your Pokemon! All that's left to do is to
                  add some moves on your pokemon. Once that is done you've
                  completed building your own pokemon!
                </div>
                <div className="text-white fs-6 text-center fw-medium mt-5">
                  All done? Let's take a look at what you just created!
                </div>
                <div className="text-center mt-3 mb-2">
                  {/* Button to proceed to Pokémon page */}
                  <button
                    className="btn btn-light px-5"
                    onClick={() => {
                      navigate("/pokemon/" + id); // Navigate to the page displaying the Pokémon
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section displaying current moves of the Pokémon */}
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-11 mx-4">
            <div className="row">
              <div className="fs-3 fw-bold mb-3">
                {pokemonData?.pokemon_name}'s Current Moves{" "}
                {/* Title for current moves */}
              </div>
              {/* Display the current moves of the Pokémon using the MoveListData component */}
              <MoveListData
                moveData={pokemonData?.pokemon_moves!} // Pass current moves to the MoveListData component
                mode="delete_pokemon" // Mode to indicate that moves can be removed
                removeMove={removeMove} // Function to remove a move
              />
            </div>
          </div>
        </div>

        {/* Section displaying learnable moves of the Pokémon */}
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-11 mx-4">
            <div className="row">
              <div className="fs-3 fw-bold mb-3">
                {pokemonData?.pokemon_name}'s Learnable Moves{" "}
                {/* Title for learnable moves */}
              </div>
              {/* Display the learnable moves of the Pokémon using the MoveListData component */}
              <MoveListData
                moveData={learnableMoveData} // Pass learnable moves to the MoveListData component
                mode="add_pokemon" // Mode to indicate that moves can be added
                learnMove={learnMove} // Function to add a move
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading Data...</div> // Show loading message until data is ready
  );
}

export default EditPokemonMoves;
