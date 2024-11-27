import { Type, SimplePokemonData } from "../../interfaces/PokemonInterfaces"; // Importing types for Pokémon data and types
import { useNavigate } from "react-router-dom"; // Importing useNavigate for routing programmatically
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Importing helper function to capitalize the first character of a string
import { Axios } from "axios"; // Importing Axios type for type-checking API requests
import { deletePokemon } from "../../utilities/fetchPokemonInfo"; // Importing function to delete a Pokémon

interface Props {
  pokemonData: SimplePokemonData[]; // Array of Pokémon data passed as props
  creator: boolean; // Flag to determine if the user is the creator (for edit buttons)
  axiosInstance?: Axios; // Optional Axios instance to handle API requests (if provided)
}

/*
  Pokemon List Component

  Displays data based on the list of Pokémon sent. 
  
  Edit Mode:
  Displays 3 buttons allowing the user to update, delete, and manage moves
*/

function PokemonListData(props: Props) {
  const navigate = useNavigate(); // Initializing navigate function to programmatically navigate between routes

  return (
    <>
      {props.pokemonData.map((pokemon, i) => {
        return (
          <div
            key={i} // Unique key for each Pokémon card (important for efficient rendering)
            id="pokemonCard" // ID for the Pokémon card container
            className="p-3 my-2 mx-4" // Styling for padding and margins
            onClick={(e) => {
              // On clicking the Pokémon card, navigate to the detailed page
              e.stopPropagation(); // Prevent the click from propagating to parent elements
              navigate(`/pokemon/${pokemon.pokemon_id}`); // Navigate to the Pokémon detail page
            }}
          >
            {/* Display Pokémon name and ID */}
            <div className="d-flex px-2 my-2 flex-row justify-content-between align-items-center">
              <div id="pokemonName" className="fs-2 fw-bold">
                {pokemon.pokemon_name} {/* Pokémon name */}
              </div>
              <div id="pokemonId" className="fs-5">
                #{pokemon.pokemon_id} {/* Pokémon ID */}
              </div>
            </div>
            {/* Display Pokémon types */}
            <div className="d-flex px-2 flex-row" id="typeSection">
              {pokemon.pokemon_types.map((type, j) => {
                const curr_type: Type = type as Type; // Type-casting the type
                return (
                  <div
                    key={j} // Unique key for each type displayed
                    id="pokemonType"
                    className={`p-2 fs-6 bg-${curr_type.name}`} // Styling based on type
                  >
                    {capitalizeFirstCharacter(curr_type.name)}{" "}
                    {/* Display the type with the first letter capitalized */}
                  </div>
                );
              })}
            </div>
            {/* Display creator's name and link to their profile */}
            <div className="fs-6 px-2 mt-3" id="createdBy">
              Created By:{" "}
              <a
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                onClick={(e) => {
                  // Prevent card click from propagating
                  e.stopPropagation();
                }}
                href={`/user/${pokemon.creator}`} // Link to creator's profile page
              >
                {pokemon.creator} {/* Creator's username */}
              </a>
            </div>
            {/* Display Pokémon image */}
            <div className="d-flex flex-row justify-content-center">
              <img
                id="pokemonImage"
                className="my-4"
                src={pokemon.pokemon_image} // Pokémon image URL
                alt={pokemon.pokemon_name} // Pokémon name as alt text
              />
            </div>
            {/* If creator is true, show edit buttons for managing the Pokémon */}
            {props.creator ? (
              <div className="d-flex flex-row justify-content-center">
                {/* Button to edit Pokémon */}
                <button
                  type="button"
                  title="Edit Pokemon"
                  className="btn btn-primary mx-4"
                  onClick={(e) => {
                    // On click, navigate to the edit page
                    e.stopPropagation(); // Prevent click from bubbling up
                    navigate("/pokemon/edit/" + pokemon.pokemon_id); // Navigate to Pokémon edit page
                  }}
                >
                  <i className="bi bi-pencil"></i> {/* Edit icon */}
                </button>

                {/* Button to edit Pokémon moveset */}
                <button
                  type="button"
                  title="Edit Moveset"
                  className="btn btn-success mx-4"
                  onClick={(e) => {
                    // On click, navigate to the move editor page
                    e.stopPropagation(); // Prevent click from bubbling up
                    navigate("/pokemon/create/" + pokemon.pokemon_id); // Navigate to Pokémon move editor page
                  }}
                >
                  <i className="bi bi-journal"></i> {/* Move icon */}
                </button>

                {/* Button to delete the Pokémon */}
                <button
                  type="button"
                  className="btn btn-danger mx-4"
                  title="Delete Pokemon"
                  onClick={(e) => {
                    // On click, delete the Pokémon and refresh the page
                    e.stopPropagation(); // Prevent click from bubbling up
                    deletePokemon(
                      // Calling deletePokemon utility function to delete the Pokémon
                      props.axiosInstance!, // Passing the Axios instance
                      pokemon.pokemon_id.toString() // Passing Pokémon ID as a string
                    );
                    navigate(0); // Refresh the page
                  }}
                >
                  <i className="bi bi-trash"></i> {/* Trash icon */}
                </button>
              </div>
            ) : null}{" "}
            {/* If creator is false, do not display edit buttons */}
          </div>
        );
      })}
    </>
  );
}

export default PokemonListData; // Exporting the PokemonListData component for use in other parts of the application
