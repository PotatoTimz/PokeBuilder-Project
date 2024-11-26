import { useContext, useEffect, useState } from "react"; // Importing necessary hooks from React
import { UserContext } from "../../context/UserAuth"; // Importing UserContext to access user-related functions (like axiosFetch)
import { SimplePokemonData } from "../../interfaces/PokemonInterfaces"; // Importing type for Pokemon data
import { fetchAllPokemon } from "../../utilities/fetchPokemonInfo"; // Importing the function to fetch all Pokémon data

function Home() {
  // Accessing the axiosFetch function from UserContext to handle API requests
  const { axiosFetch } = useContext(UserContext);

  // State to store the fetched Pokémon data
  const [pokemonData, setPokemonData] = useState<SimplePokemonData[]>([]); // Initially an empty array of Pokémon data
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // State to manage the loading status (true when data is loaded)

  // useEffect hook to fetch Pokémon data when the component is mounted
  useEffect(() => {
    // Async function to fetch all Pokémon data
    async function getAllPokemon() {
      const response = await fetchAllPokemon(axiosFetch, "", ""); // Fetching data from the API using axiosFetch
      console.log(response); // Logging the response to the console for debugging purposes
      setPokemonData(response); // Updating the state with the fetched Pokémon data
    }
    getAllPokemon(); // Calling the function to fetch the Pokémon data
    setIsLoaded(true); // Setting isLoaded to true once the fetch operation starts (to show loading state)
  }, []); // Empty dependency array means this effect runs only once when the component is mounted

  // Default Page content (conditional rendering based on loading status)
  return (
    <>
      {isLoaded ? ( // If isLoaded is true, display the main content
        <>
          <div className="container-fluid">
            <div className="row justify-content-md-center py-5 bg-danger px-6 text-center">
              <div className="d-flex flex-column col-6 justify-center">
                <p className="fs-3 text-white font-weight-bold">
                  Custom Pokemon Builder! {/* Title for the page */}
                </p>
                <div className="text-white fs-7 px-6">
                  <p>
                    Welcome to the PokeBuilder website! Here you can build your
                    own custom pokemon from scratch. Select your pokemon's type,
                    stats, moves and image. Display your pokemon's data in a
                    neat and precise manner for you and others to see. Look at
                    other user's creations and moves. Can you build the coolest
                    Pokemon?{" "}
                    {/* Description of what the user can do on the site */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // If data is still loading, show a loading message
        <div>Loading</div>
      )}
    </>
  );
}

export default Home; // Exporting the Home component to be used in other parts of the app
