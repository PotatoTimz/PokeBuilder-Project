import { ExtensivePokemonData } from "../../../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../../../utilities/helpers";
import StatCompare from "./StatCompare";

interface Props {
  pokemon: ExtensivePokemonData;
  otherPokemon: ExtensivePokemonData;
  primary: boolean;
  reset: () => void;
}

function PokemonCompareBlock(props: Props) {
  return (
    <div id="compareBlock" className="col-lg-6 col-md-5 col-sm-6 border">
      <div className="text-end pr-3">
        {!props.primary ? (
          <i className="bi bi-x text-danger fs-3" onClick={props.reset}></i>
        ) : (
          <i className="bi bi-person-fill text-primary fs-4"></i>
        )}
      </div>
      <div className="row justify-content-center">
        <div className="col-6 text-center">
          <img
            id="pokemonImage"
            src={
              props.primary
                ? props.pokemon.pokemon_image
                : props.otherPokemon.pokemon_image
            }
          />
        </div>
      </div>
      <div className="fs-3 text-center fw-bold my-3">
        {props.primary
          ? props.pokemon.pokemon_name
          : capitalizeFirstCharacter(props.otherPokemon.pokemon_name)}
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-6">
          <StatCompare
            statName="HP"
            stat1={
              props.primary
                ? props.pokemon.base_stats.hp
                : props.otherPokemon.base_stats.hp
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.hp
                : props.pokemon.base_stats.hp
            }
            comparable={props.otherPokemon === null ? false : true}
          />

          <StatCompare
            statName="Attack"
            stat1={
              props.primary
                ? props.pokemon.base_stats.attack
                : props.otherPokemon.base_stats.attack
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.attack
                : props.pokemon.base_stats.attack
            }
            comparable={props.otherPokemon === null ? false : true}
          />

          <StatCompare
            statName="Defense"
            stat1={
              props.primary
                ? props.pokemon.base_stats.defense
                : props.otherPokemon.base_stats.defense
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.defense
                : props.pokemon.base_stats.defense
            }
            comparable={props.otherPokemon === null ? false : true}
          />
          <StatCompare
            statName="Sp. Attack"
            stat1={
              props.primary
                ? props.pokemon.base_stats.sp_attack
                : props.otherPokemon.base_stats.sp_attack
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.sp_attack
                : props.pokemon.base_stats.sp_attack
            }
            comparable={props.otherPokemon === null ? false : true}
          />

          <StatCompare
            statName="Sp. Defense"
            stat1={
              props.primary
                ? props.pokemon.base_stats.sp_defense
                : props.otherPokemon.base_stats.sp_defense
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.sp_defense
                : props.pokemon.base_stats.sp_defense
            }
            comparable={props.otherPokemon === null ? false : true}
          />

          <StatCompare
            statName="Speed"
            stat1={
              props.primary
                ? props.pokemon.base_stats.speed
                : props.otherPokemon.base_stats.speed
            }
            stat2={
              props.otherPokemon === null
                ? 0
                : props.primary
                ? props.otherPokemon.base_stats.speed
                : props.pokemon.base_stats.speed
            }
            comparable={props.otherPokemon === null ? false : true}
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCompareBlock;
