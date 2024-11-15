import { ProgressBar } from "react-bootstrap";
import {
  BaseStats,
  ExtensivePokemonData,
} from "../../interfaces/PokemonInterfaces";

interface Props {
  pokemonInfo: ExtensivePokemonData;
}

/*
  Base Stat Components.
  Display Pokemon's base stats using progress bars
*/
function PokemonBaseStats(props: Props) {
  const baseStats: BaseStats = props.pokemonInfo.base_stats;
  const totalStats =
    baseStats.attack +
    baseStats.hp +
    baseStats.defense +
    baseStats.sp_attack +
    baseStats.sp_defense +
    baseStats.speed;

  return (
    <div className="row justify-content-center">
      <div className="col-11 pb-4 my-4 bg-white">
        <div className="fs-3 text-center mt-2 fw-medium">Base Stats</div>
        <div className="fs-5 my-4">
          HP:{` (${props.pokemonInfo?.base_stats.hp})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.hp}
            variant="success"
          ></ProgressBar>
        </div>
        <div className="fs-5 my-4">
          Attack:{` (${props.pokemonInfo?.base_stats.attack})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.attack}
            variant="danger"
          ></ProgressBar>
        </div>
        <div className="fs-5 my-4">
          Defense:{` (${props.pokemonInfo?.base_stats.defense})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.defense}
            variant="warning"
          ></ProgressBar>
        </div>
        <div className="fs-5 my-4">
          Sp. Attack:{` (${props.pokemonInfo?.base_stats.sp_attack})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.sp_attack}
            variant="danger"
          ></ProgressBar>
        </div>
        <div className="fs-5 my-4">
          Sp. Defense:{` (${props.pokemonInfo?.base_stats.sp_defense})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.sp_defense}
            variant="warning"
          ></ProgressBar>
        </div>
        <div className="fs-5 my-4">
          Speed:{` (${props.pokemonInfo?.base_stats.speed})`}
          <ProgressBar
            striped
            min={0}
            max={255}
            now={props.pokemonInfo?.base_stats.speed}
          ></ProgressBar>
        </div>

        <div className="fs-4 fw-medium">Total:{` ${totalStats}`}</div>
      </div>
    </div>
  );
}

export default PokemonBaseStats;
