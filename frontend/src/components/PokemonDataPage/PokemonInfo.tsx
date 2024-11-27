// Import necessary hooks, components, and utilities
import { useContext, useEffect, useState } from "react"; // React hooks
import { useParams } from "react-router-dom"; // To extract URL parameters (in this case, the Pokémon ID)
import { ExtensivePokemonData } from "../../interfaces/PokemonInterfaces"; // Type definition for Pokémon data
import { UserContext } from "../../context/UserAuth"; // Context for user authentication (to access axios instance)
import { fetchPokemonById } from "../../utilities/fetchPokemonInfo"; // Function to fetch Pokémon data by its ID
import PokemonInfoCard from "./PokemonInfoCard"; // Component to display general Pokémon info
import PokemonBaseStats from "./PokemonBaseStats"; // Component to display Pokémon's base stats
import MoveListData from "../DisplayData/MoveListData"; // Component to display the list of Pokémon's moves
import PokemonCompare from "./PokemonCompareComponents/PokemonCompare"; // Component for comparing Pokémon stats
import PokemonTypeChart from "./PokemonTypeChart"; // Component to display Pokémon's type effectiveness chart

/*
  Pokemon Info Component.
  This component is responsible for displaying detailed information about a specific Pokémon.
  It uses the Pokémon ID from the URL parameters to fetch and display data including:
  - General information (name, type, image, etc.)
  - Base stats (HP, attack, defense, etc.)
  - Moveset
  - Type effectiveness chart (showing Pokémon's strengths and weaknesses)
  - Comparison tool to compare stats with other Pokémon.
*/
function PokemonInfo() {
  const { id } = useParams(); // Extract the Pokémon ID from the URL parameters
  const { axiosFetch } = useContext(UserContext); // Get the axios instance from the UserContext for making API requests
  const [pokemonInfo, setPokemonInfo] = useState<ExtensivePokemonData>(); // State to hold the Pokémon data
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // State to track loading status

  // Fetch the Pokémon data when the component mounts
  useEffect(() => {
    async function getPokemonData() {
      const response = await fetchPokemonById(axiosFetch, id as string); // Fetch Pokémon data by ID
      setPokemonInfo(response); // Set the fetched data to the state
      setIsLoaded(true); // Mark the data as loaded
      console.log(response); // Log the response for debugging
    }
    getPokemonData(); // Call the function to fetch data
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return isLoaded ? ( // If data is loaded, render the Pokémon info
    <>
      <div className="container-fluid">
        {/* Display Pokémon's general info and base stats */}
        <div className="row justify-content-center my-5">
          {/* Pokémon Info Card */}
          <div className="col-lg-3 col-sm-11 mx-5" id="pokemonInfoCard">
            <PokemonInfoCard pokemonInfo={pokemonInfo!} />
          </div>
          {/* Pokémon Base Stats */}
          <div className="col-lg-5 col-sm-11 mx-5" id="pokemonInfoCard">
            <PokemonBaseStats pokemonInfo={pokemonInfo!} />
          </div>
        </div>

        {/* Display Pokémon's moveset */}
        <div className="row justify-content-center my-5">
          <div className="col-10">
            <div className="fs-4 mb-3">{pokemonInfo?.pokemon_name}'s Moves</div>
            <MoveListData
              moveData={pokemonInfo?.pokemon_moves!} // Pass Pokémon's moves as data
              mode="default" // Default display mode for moves
            />
          </div>
        </div>

        {/* Display Pokémon's type effectiveness chart */}
        <PokemonTypeChart id={id as string} axiosFetch={axiosFetch} />

        {/* Display Pokémon's comparison tool (for comparing stats with other Pokémon) */}
        <PokemonCompare pokemon={pokemonInfo!} axiosInstance={axiosFetch} />
      </div>
    </>
  ) : (
    // If the data is not yet loaded, display loading text
    <div>Loading...</div>
  );
}

export default PokemonInfo;
