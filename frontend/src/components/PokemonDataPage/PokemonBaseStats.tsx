// Import necessary components from React Bootstrap for progress bars
import { ProgressBar } from "react-bootstrap";
// Import interfaces to type the Pokémon data
import {
  BaseStats, // The interface for the Pokémon's base stats (e.g., attack, defense, etc.)
  ExtensivePokemonData, // The interface for the full Pokémon data
} from "../../interfaces/PokemonInterfaces"; // Import paths to your project

interface Props {
  pokemonInfo: ExtensivePokemonData; // Define the expected prop, which is the full Pokémon data
}

/*
  Base Stat Component.
  This component displays a Pokémon's base stats (e.g., HP, Attack, Defense, etc.)
  using progress bars. The stats are visualized as horizontal bars that show the
  current stat value relative to the maximum possible value (255).
*/
function PokemonBaseStats(props: Props) {
  // Destructure the base stats from the passed in pokemonInfo prop
  const baseStats: BaseStats = props.pokemonInfo.base_stats;
  // Calculate the total stats by adding up each individual stat value
  const totalStats =
    baseStats.attack +
    baseStats.hp +
    baseStats.defense +
    baseStats.sp_attack +
    baseStats.sp_defense +
    baseStats.speed;

  return (
    <div className="row justify-content-center">
      {/* Outer container for styling */}
      <div className="col-11 pb-4 my-4 bg-white">
        {/* Title for the base stats section */}
        <div className="fs-3 text-center mt-2 fw-medium">Base Stats</div>

        {/* Display HP stat */}
        <div className="fs-5 my-4">
          HP:{` (${props.pokemonInfo?.base_stats.hp})`}{" "}
          {/* Display the HP value */}
          {/* ProgressBar component for visualizing the HP stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar (max Pokémon stat)
            now={props.pokemonInfo?.base_stats.hp} // Current HP value (dynamic)
            variant="success" // Color variant (green for HP)
          ></ProgressBar>
        </div>

        {/* Display Attack stat */}
        <div className="fs-5 my-4">
          Attack:{` (${props.pokemonInfo?.base_stats.attack})`}{" "}
          {/* Display the Attack value */}
          {/* ProgressBar component for visualizing the Attack stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar
            now={props.pokemonInfo?.base_stats.attack} // Current Attack value (dynamic)
            variant="danger" // Color variant (red for Attack)
          ></ProgressBar>
        </div>

        {/* Display Defense stat */}
        <div className="fs-5 my-4">
          Defense:{` (${props.pokemonInfo?.base_stats.defense})`}{" "}
          {/* Display the Defense value */}
          {/* ProgressBar component for visualizing the Defense stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar
            now={props.pokemonInfo?.base_stats.defense} // Current Defense value (dynamic)
            variant="warning" // Color variant (yellow for Defense)
          ></ProgressBar>
        </div>

        {/* Display Special Attack stat */}
        <div className="fs-5 my-4">
          Sp. Attack:{` (${props.pokemonInfo?.base_stats.sp_attack})`}{" "}
          {/* Display Special Attack value */}
          {/* ProgressBar component for visualizing the Special Attack stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar
            now={props.pokemonInfo?.base_stats.sp_attack} // Current Special Attack value (dynamic)
            variant="danger" // Color variant (red for Special Attack)
          ></ProgressBar>
        </div>

        {/* Display Special Defense stat */}
        <div className="fs-5 my-4">
          Sp. Defense:{` (${props.pokemonInfo?.base_stats.sp_defense})`}{" "}
          {/* Display Special Defense value */}
          {/* ProgressBar component for visualizing the Special Defense stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar
            now={props.pokemonInfo?.base_stats.sp_defense} // Current Special Defense value (dynamic)
            variant="warning" // Color variant (yellow for Special Defense)
          ></ProgressBar>
        </div>

        {/* Display Speed stat */}
        <div className="fs-5 my-4">
          Speed:{` (${props.pokemonInfo?.base_stats.speed})`}{" "}
          {/* Display the Speed value */}
          {/* ProgressBar component for visualizing the Speed stat */}
          <ProgressBar
            striped // Adds a striped effect to the progress bar
            min={0} // Minimum value of the progress bar
            max={255} // Maximum value of the progress bar
            now={props.pokemonInfo?.base_stats.speed} // Current Speed value (dynamic)
          ></ProgressBar>
        </div>

        {/* Display the total stats (sum of all individual stats) */}
        <div className="fs-4 fw-medium">Total:{` ${totalStats}`}</div>
      </div>
    </div>
  );
}

export default PokemonBaseStats;
