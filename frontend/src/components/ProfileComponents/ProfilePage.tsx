// Import necessary hooks, context, and components
import { useContext, useEffect, useState } from "react"; // React hooks for state and effect
import { Move, SimplePokemonData } from "../../interfaces/PokemonInterfaces"; // Interfaces for Pokémon and moves data
import { UserContext } from "../../context/UserAuth"; // Import the UserContext to access authentication info
import { fetchPokemonByUser } from "../../utilities/fetchPokemonInfo"; // Function to fetch user's Pokémon
import { fetchMoveByUser } from "../../utilities/fetchMoveInfo"; // Function to fetch user's moves
import { useParams } from "react-router-dom"; // useParams hook to access the profileName from the URL
import ProfileMessage from "./ProfileMessage"; // Component to display a profile message
import PokemonListData from "../DisplayData/PokemonListData"; // Component to display Pokémon data
import MoveListData from "../DisplayData/MoveListData"; // Component to display moves data

/*
  Profile Page Component
  
  Displays information about the account specified by the URL parameters (profileName). 
  Shows Pokémon and moves associated with the profile. Users can also view and manage their 
  Pokémon and moves if the profile belongs to the currently logged-in user.
*/
function ProfilePage() {
  // Extract the profileName from the URL using useParams
  const { profileName } = useParams();

  // Access the current user's authentication information from UserContext
  const { axiosFetch, username } = useContext(UserContext);

  // Check if the current profile belongs to the logged-in user
  let currentProfile: boolean = username === profileName ? true : false;

  // State hooks to manage the user's Pokémon, moves, loading state, and view toggle
  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[]>([]); // List of user's Pokémon
  const [userMoves, setUserMoves] = useState<Move[]>([]); // List of user's moves
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to track if data is loading
  const [displayState, setDisplayState] = useState<string>("Pokemon"); // State to toggle between displaying Pokémon or moves

  // useEffect hook to fetch user-related data when the component is mounted
  useEffect(() => {
    const fetchUserInfo = async () => {
      // Fetch the user's Pokémon data
      const response = await fetchPokemonByUser(axiosFetch, profileName!);
      console.log(response); // Log the response for debugging
      setUserPokemon(response); // Update the state with fetched Pokémon data

      // Fetch the user's moves data
      const response2 = await fetchMoveByUser(axiosFetch, profileName!);
      setUserMoves(response2); // Update the state with fetched moves data

      // Set the loading state to true after fetching data
      setIsLoading(true);
    };

    // Call the fetchUserInfo function to get data
    fetchUserInfo();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Render the profile page once data is loaded
  return isLoading ? (
    <>
      <div className="container-fluid">
        {/* Profile Header */}
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-11">
            <div className="text-center fs-3 fw-bold border-bottom">
              {profileName}'s Profile {/* Display the profile name */}
            </div>
          </div>
        </div>

        {/* Profile message section (only for the current logged-in user) */}
        <div className="row justify-content-center mt-5 mb-3">
          {currentProfile ? (
            <ProfileMessage
              pokemonCreated={userPokemon.length} // Show the number of Pokémon created
              movesCreated={userMoves.length} // Show the number of moves created
              profileName={profileName!} // Pass the profile name to ProfileMessage
            />
          ) : null}
        </div>

        {/* Toggle between viewing Pokémon or Moves */}
        <div className="row justify-content-center mb-2">
          <div className="col-lg-11 mx-4">
            <div className="row fs-3 text-center">
              <p className="border-bottom fw-medium">Toggle Creation Viewer</p>
            </div>
            <div className="d-flex flex-row justify-content-center">
              {/* Buttons to switch between Pokémon and Moves view */}
              <p
                className="text-primary fs-6 mx-5"
                onClick={() => {
                  setDisplayState("Pokemon"); // Show Pokémon when clicked
                }}
              >
                Pokemon
              </p>
              <p
                className="text-primary fs-6 mx-5"
                onClick={() => {
                  setDisplayState("Move"); // Show Moves when clicked
                }}
              >
                Moves
              </p>
            </div>
          </div>
        </div>

        {/* Display the selected content (either Pokémon or Moves) */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-11 mx-4">
            <div className="row fs-4 fw-bold">
              {profileName}'s {displayState}{" "}
              {/* Display either Pokémon or Moves */}
            </div>
          </div>
        </div>

        {/* Display the Pokémon or Moves list based on the current state */}
        <div className="row justify-content-center mb-5">
          <div className="d-flex flex-row flex-wrap justify-content-center col col-lg-10">
            {/* Conditionally render either PokémonListData or MoveListData */}
            {displayState === "Pokemon" ? (
              <PokemonListData
                pokemonData={userPokemon} // Pass Pokémon data to PokemonListData
                creator={currentProfile} // Pass creator flag to determine if user can edit
                axiosInstance={axiosFetch} // Pass the axios instance for API calls
              />
            ) : (
              <MoveListData moveData={userMoves} mode="edit" /> // Pass moves data to MoveListData for editing mode
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading User Data...</div> // Display loading message if data is still being fetched
  );
}

export default ProfilePage; // Export the ProfilePage component
