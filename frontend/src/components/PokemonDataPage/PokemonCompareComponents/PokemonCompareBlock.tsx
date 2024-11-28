import { ExtensivePokemonData } from "../../../interfaces/PokemonInterfaces"; // Importing Pokemon data interface
import { capitalizeFirstCharacter } from "../../../utilities/helpers"; // Helper function to capitalize the first letter of a string
import StatCompare from "./StatCompare"; // Importing StatCompare component to display individual stat comparisons

// Interface for the component props
interface Props {
  pokemon: ExtensivePokemonData; // First Pokémon data
  otherPokemon: ExtensivePokemonData; // Second Pokémon data (for comparison)
  primary: boolean; // Determines if the current Pokémon is the primary one being compared
  reset: () => void; // Function to reset the comparison block (for closing or resetting the comparison)
}

function PokemonCompareBlock(props: Props) {
  return (
    // Container for the comparison block, styled as a column with a border
    <div id="compareBlock" className="col-lg-6 col-md-5 col-sm-6 border">
      {/* Close button or indicator depending on whether it's the primary Pokémon or not */}
      <div className="text-end pr-3">
        {/* If not primary Pokémon, display a close button; otherwise, show an icon for the primary Pokémon */}
        {!props.primary ? (
          <i className="bi bi-x text-danger fs-3" onClick={props.reset}></i>
        ) : (
          <i className="bi bi-person-fill text-primary fs-4"></i>
        )}
      </div>

      {/* Display Pokémon image */}
      <div className="row justify-content-center">
        <div className="col-6 text-center">
          {/* Show the image of the primary or secondary Pokémon depending on the primary flag */}
          <img
            id="pokemonImage"
            src={
              props.primary
                ? props.pokemon.pokemon_image // Primary Pokémon image
                : props.otherPokemon.pokemon_image // Secondary Pokémon image
            }
          />
        </div>
      </div>

      {/* Display Pokémon name */}
      <div className="fs-3 text-center fw-bold my-3">
        {props.primary
          ? props.pokemon.pokemon_name // Display primary Pokémon's name
          : capitalizeFirstCharacter(props.otherPokemon.pokemon_name)}{" "}
      </div>

      {/* Stat comparison section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-6">
          {/* Display individual stat comparisons using the StatCompare component */}

          <StatCompare
            statName="HP"
            stat1={
              props.primary
                ? props.pokemon.base_stats.hp
                : props.otherPokemon.base_stats.hp
            } // Primary Pokémon's HP
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.hp
                : props.pokemon.base_stats.hp
            } // Secondary Pokémon's HP, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />

          <StatCompare
            statName="Attack"
            stat1={
              props.primary
                ? props.pokemon.base_stats.attack
                : props.otherPokemon.base_stats.attack
            } // Primary Pokémon's Attack
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.attack
                : props.pokemon.base_stats.attack
            } // Secondary Pokémon's Attack, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />

          <StatCompare
            statName="Defense"
            stat1={
              props.primary
                ? props.pokemon.base_stats.defense
                : props.otherPokemon.base_stats.defense
            } // Primary Pokémon's Defense
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.defense
                : props.pokemon.base_stats.defense
            } // Secondary Pokémon's Defense, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />

          <StatCompare
            statName="Sp. Attack"
            stat1={
              props.primary
                ? props.pokemon.base_stats.sp_attack
                : props.otherPokemon.base_stats.sp_attack
            } // Primary Pokémon's Special Attack
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.sp_attack
                : props.pokemon.base_stats.sp_attack
            } // Secondary Pokémon's Special Attack, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />

          <StatCompare
            statName="Sp. Defense"
            stat1={
              props.primary
                ? props.pokemon.base_stats.sp_defense
                : props.otherPokemon.base_stats.sp_defense
            } // Primary Pokémon's Special Defense
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.sp_defense
                : props.pokemon.base_stats.sp_defense
            } // Secondary Pokémon's Special Defense, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />

          <StatCompare
            statName="Speed"
            stat1={
              props.primary
                ? props.pokemon.base_stats.speed
                : props.otherPokemon.base_stats.speed
            } // Primary Pokémon's Speed
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.speed
                : props.pokemon.base_stats.speed
            } // Secondary Pokémon's Speed, or 0 if not available
            comparable={props.otherPokemon === null ? false : true} // Enable comparison only if the secondary Pokémon exists
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCompareBlock;
