// Import necessary types and utilities
import { ExtensivePokemonData, Type } from "../../interfaces/PokemonInterfaces"; // Import types for Pokemon data and types
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Utility function to capitalize the first letter of a string

// Define the props interface for the component
interface Props {
  pokemonInfo: ExtensivePokemonData; // Data representing a single Pokémon's information
}

/*
  Pokemon Info Card Component
  This component is used to display detailed information about a specific Pokémon. 
  It shows the Pokémon's name, image, type(s), creator, and Pokémon ID.
*/
function PokemonInfoCard(props: Props) {
  return (
    <div className="row justify-content-center">
      {" "}
      {/* Container for the card */}
      <div className="col-11 py-4">
        {/* Pokemon name and ID header */}
        <div className="row mb-4">
          <div className="d-flex flex-row justify-content-between bg-white px-3 pt-2">
            {/* Display Pokémon's name */}
            <div className="fs-2 fw-bold">
              {props.pokemonInfo?.pokemon_name}
            </div>
            {/* Display Pokémon's ID */}
            <div className="fs-2 fst-italic">
              #{props.pokemonInfo?.pokemon_id}
            </div>
          </div>
          {/* Creator information */}
          <div className="bg-white px-3">
            <a
              className="fs-6 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href={`/user/${props.pokemonInfo?.creator}`} // Link to the creator's profile
            >
              Created By: {props.pokemonInfo?.creator}
            </a>
          </div>
          {/* Pokémon type(s) display */}
          <div className="d-flex flex-row bg-white px-3 pt-2 pb-4">
            {props.pokemonInfo?.pokemon_types.map((type, index) => {
              const curr_type: Type = type as Type; // Cast to Type object
              return (
                <div
                  key={index}
                  className={`pokemonType bg-${curr_type.name} col`} // Dynamically set background color based on type
                >
                  {capitalizeFirstCharacter(curr_type.name)}{" "}
                  {/* Display the type, capitalized */}
                </div>
              );
            })}
          </div>
        </div>
        {/* Pokémon image display */}
        <div className="row">
          <div className="col bg-white">
            <img
              id="pokemonImage"
              src={props.pokemonInfo?.pokemon_image} // Display the Pokémon's image
              alt={props.pokemonInfo?.pokemon_name} // Alt text for accessibility
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfoCard;
