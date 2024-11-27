// Importing necessary hooks, context, and components
import { useContext, useEffect, useState } from "react"; // React hooks for state, effect, and context
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to fetch user authentication details
import {
  SimplePokemonData, // Interface for representing simple Pokemon data
  PokemonSearchQuery, // Interface for search query structure
} from "../../interfaces/PokemonInterfaces"; // Importing types for the Pokemon search and data
import { fetchAllPokemon } from "../../utilities/fetchPokemonInfo"; // Function to fetch Pokemon data based on search query
import PokemonListData from "../DisplayData/PokemonListData"; // Component to display fetched Pokemon data

function SearchPokemon() {
  // Accessing the axios instance from UserContext to make authenticated API requests
  const { axiosFetch } = useContext(UserContext);

  // useState hooks to manage local state of the component
  const [pokemonData, setPokemonData] = useState<SimplePokemonData[]>([]); // Holds the list of Pokémon fetched based on the search
  const [searchQuery, setSearchQuery] = useState<PokemonSearchQuery>({
    name: "", // Name of the Pokémon to search
    creator: "", // Creator of the Pokémon to search
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // State to track if data has finished loading

  // Function to handle form submission and trigger search
  const submitSearchQuery = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(searchQuery); // Log the current search query for debugging purposes
    const response = await fetchAllPokemon(
      axiosFetch,
      searchQuery.name,
      searchQuery.creator
    ); // Fetch the list of Pokémon based on the search query
    setPokemonData(response); // Set the fetched data into the state
  };

  // useEffect hook to fetch all Pokémon data once the component is mounted
  useEffect(() => {
    async function getAllPokemon() {
      // Fetch Pokémon data using the current search query
      const response = await fetchAllPokemon(
        axiosFetch,
        searchQuery.name,
        searchQuery.creator
      );
      console.log(response); // Log the response to the console for debugging
      setPokemonData(response); // Update state with fetched Pokémon data
    }
    getAllPokemon(); // Call the function to fetch Pokémon data
    setIsLoaded(true); // Set loading state to false as data fetching is complete
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Return the JSX that renders the component
  return isLoaded ? (
    // If data has been loaded, render the search form and the Pokémon list
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-5 col pt-5 pb-5">
            {/* Search form */}
            <form>
              {/* Input field for Pokémon name */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pokemon Name"
                  onChange={(e) => {
                    // Update the search query with the input value for name
                    setSearchQuery({ ...searchQuery, name: e.target.value });
                  }}
                />
              </div>
              {/* Input field for creator name */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Creator Name"
                  onChange={(e) => {
                    // Update the search query with the input value for creator
                    setSearchQuery({
                      ...searchQuery,
                      creator: e.target.value,
                    });
                  }}
                />
              </div>
              {/* Submit button for the search */}
              <div className="input-group mb-3">
                <button
                  className="form-control btn btn-danger"
                  onClick={submitSearchQuery}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Displaying the list of Pokémon data */}
        <div className="row justify-content-center">
          <div className="d-flex flex-row flex-wrap justify-content-center col col-lg-11">
            {/* Render the PokemonListData component to display the fetched Pokémon data */}
            <PokemonListData pokemonData={pokemonData} creator={false} />
          </div>
        </div>
      </div>
    </>
  ) : (
    // If data is still loading, show a loading message
    <div>Loading...</div>
  );
}

export default SearchPokemon; // Export the SearchPokemon component for use in other parts of the application
