import { useContext, useEffect, useState } from "react";
import { ExtensivePokemonData, Type } from "../../interfaces/PokemonInterfaces"; // Import relevant types
import { UserContext } from "../../context/UserAuth"; // Import context for user authentication
import { useNavigate, useParams } from "react-router-dom"; // React Router hooks for navigation and parameters
import { fetchTypes } from "../../utilities/fetchTypes"; // Utility function to fetch Pokémon types
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Helper function to capitalize the first character of a string
import {
  createPokemon,
  fetchPokemonById,
  updatePokemon,
} from "../../utilities/fetchPokemonInfo"; // Utility functions for creating, fetching, and updating Pokémon

interface Props {
  updateMode: boolean; // A prop to determine if the form is in create or update mode
}

/*
  Create / Update Pokemon Component.
  Component mode (update/create) changed depending on the page URL 
  
  Create Component:
  - Form to create Pokémon using the PokeBuilder API.

  Update Component:
  - Form to update Pokémon with pre-existing data, allowing users to modify the details of a Pokémon.
*/
function CreatePokemon(props: Props) {
  // Parameters needed for form functionality
  const { id } = useParams(); // Get the Pokémon ID from the URL if in update mode
  const { axiosFetch, username } = useContext(UserContext); // Access authenticated user data from context
  const [types, setTypes] = useState<Type[]>([]); // State to hold Pokémon types fetched from the API
  const [pokemonData, setPokemonData] = useState<ExtensivePokemonData>({
    // State to store Pokémon data for the form
    base_stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      sp_attack: 0,
      sp_defense: 0,
      speed: 0,
    },
    creator: "",
    pokemon_id: 0,
    pokemon_image: "",
    pokemon_name: "",
    pokemon_types: ["normal", ""],
    pokemon_moves: [],
  });

  // State to check if the required API calls have been made
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook to handle page redirections

  // On component load, fetch types and data based on update/create mode
  useEffect(() => {
    async function getAllTypes() {
      const response = await fetchTypes(axiosFetch); // Fetch all available Pokémon types
      setTypes(response); // Set the fetched types in the state
    }

    async function getPokemonData() {
      const response = await fetchPokemonById(axiosFetch, id as string); // Fetch Pokémon data by ID for updating
      if (username !== response.creator) {
        navigate("/"); // Redirect if the current user is not the creator of the Pokémon
      }
      setPokemonData({
        ...response,
        pokemon_types: [
          response.pokemon_types[0].name,
          response.pokemon_types && response.pokemon_types[1]
            ? response.pokemon_types[1].name
            : "",
        ], // Ensure Pokémon types are properly formatted
      });
    }

    getAllTypes(); // Fetch Pokémon types
    if (props.updateMode) {
      getPokemonData(); // Fetch existing Pokémon data if in update mode
    }
    setIsLoading(true); // Set loading to true after initiating fetch requests
  }, []); // Empty dependency array, so this runs only once when the component mounts

  // Function to handle form submission (either create or update Pokémon)
  const submitPokemon = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if in update or create mode and call the respective API function
    if (!props.updateMode) {
      const response = await createPokemon(axiosFetch, pokemonData); // Create new Pokémon
      navigate("/pokemon/create/" + response.data.id); // Redirect to the newly created Pokémon page
    } else {
      await updatePokemon(axiosFetch, pokemonData, id as string); // Update existing Pokémon data
      navigate(("/pokemon/" + id) as string); // Redirect to the updated Pokémon's page
    }
  };

  // Render form only after the necessary API calls have been made (i.e., isLoading is true)
  return isLoading ? (
    <>
      <div
        className="container-fluid bg-white bg-gradient"
        id={"buildPokemonPage"} // Apply specific styles to the page
      >
        <div className="row justify-content-center mt-1 py-5">
          <div className="col-lg-6 bg-light shadow-sm card px-5 py-3">
            {/* Header text for form */}
            <div className="text-center fw-bold fs-1 mt-3">
              {props.updateMode
                ? "Update Your Pokemon!" // Display message if updating Pokémon
                : "Create Your Pokemon!"}{" "}
              // Display message if creating new Pokémon
            </div>
            <form>
              {/* Pokémon Name Input */}
              <div className="form-group my-3">
                <div className="fw-bold mb-2 fs-5">General Info</div>
                <label>Name</label>
                <input
                  type="text"
                  maxLength={12} // Restrict maximum length for Pokémon name
                  minLength={3} // Ensure minimum length for Pokémon name
                  className="form-control"
                  value={pokemonData.pokemon_name}
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      pokemon_name: e.target.value, // Update name in the state
                    })
                  }
                />
              </div>

              {/* Pokémon Image Display */}
              <div className="row justify-content-center">
                <div className="col text-center">
                  <img
                    src={pokemonData.pokemon_image}
                    alt={"No Image Found"} // Fallback text if the image is not available
                    id={"pokemonImage"} // Apply specific styles for the image
                  />
                </div>
              </div>

              {/* Pokémon Image URL Input */}
              <div className="form-group my-3">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={pokemonData.pokemon_image}
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      pokemon_image: e.target.value, // Update image URL in the state
                    })
                  }
                />
              </div>

              {/* Type Section: Pokémon Type 1 */}
              <div className="fw-bold mb-2 fs-5">Type</div>
              <div className="row">
                <div className="col">
                  <div className="form-group my-3">
                    <label>Type 1</label>
                    <select
                      className="form-control"
                      value={pokemonData.pokemon_types[0] as string}
                      onChange={(e) => {
                        setPokemonData({
                          ...pokemonData,
                          pokemon_types: [
                            e.target.value, // Update Type 1 in the state
                            pokemonData.pokemon_types[1] as string,
                          ],
                        });
                      }}
                    >
                      {/* Map through available types to create options */}
                      {types.map((type, index) => {
                        return (
                          <option value={`${type.name}`} key={index}>
                            {capitalizeFirstCharacter(type.name)}{" "}
                            {/* Capitalize the first character of the type name */}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Type Section: Pokémon Type 2 */}
                <div className="col">
                  <div className="form-group my-3">
                    <label>Type 2</label>
                    <select
                      className="form-control"
                      value={pokemonData.pokemon_types[1] as string}
                      onChange={(e) => {
                        setPokemonData({
                          ...pokemonData,
                          pokemon_types: [
                            pokemonData.pokemon_types[0] as string,
                            e.target.value, // Update Type 2 in the state
                          ],
                        });
                      }}
                    >
                      <option value={``}>No Second Type</option>{" "}
                      {/* Option for no second type */}
                      {types.map((type, index) => {
                        return (
                          <option value={`${type.name}`} key={index}>
                            {capitalizeFirstCharacter(type.name)}{" "}
                            {/* Capitalize the first character of the type name */}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Base Stats Section: HP, Attack, Defense, etc. */}
              <div className="fw-bold fs-5">Base Stats</div>
              {/* Repeat for each base stat (HP, Attack, Defense, Special Attack, Special Defense, Speed) */}
              {[
                "hp",
                "attack",
                "defense",
                "sp_attack",
                "sp_defense",
                "speed",
              ].map((stat) => (
                <div className="form-group my-3" key={stat}>
                  <label>{capitalizeFirstCharacter(stat)}</label>
                  <input
                    type="number"
                    className="form-control"
                    value={
                      pokemonData.base_stats[
                        stat as keyof typeof pokemonData.base_stats
                      ]
                    }
                    max={255}
                    min={10}
                    onChange={(e) =>
                      setPokemonData({
                        ...pokemonData,
                        base_stats: {
                          ...pokemonData.base_stats,
                          [stat]: parseInt(e.target.value), // Dynamically update the specific base stat
                        },
                      })
                    }
                  />
                </div>
              ))}

              {/* Submit Button */}
              <div className="form-group">
                <input
                  className="form-control btn btn-primary"
                  type="submit"
                  onClick={submitPokemon}
                  value={props.updateMode ? "Update" : "Create"} // Set button text based on mode
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>loading</div> // Display loading text while data is being fetched
  );
}

export default CreatePokemon;
