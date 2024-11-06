import { ExtensivePokemonData } from "../../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../../utilities/helpers";

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
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1">HP: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.hp >
                      props.otherPokemon.base_stats.hp
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.hp <
                      props.otherPokemon.base_stats.hp
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.hp >
                      props.otherPokemon.base_stats.hp
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.hp <
                      props.otherPokemon.base_stats.hp
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.hp
                : props.otherPokemon.base_stats.hp}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.hp >
                  props.otherPokemon.base_stats.hp ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.hp <
                  props.otherPokemon.base_stats.hp ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.hp >
                  props.otherPokemon.base_stats.hp ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.hp <
                  props.otherPokemon.base_stats.hp ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1">Attack: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.attack >
                      props.otherPokemon.base_stats.attack
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.attack <
                      props.otherPokemon.base_stats.attack
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.attack >
                      props.otherPokemon.base_stats.attack
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.attack <
                      props.otherPokemon.base_stats.attack
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.attack
                : props.otherPokemon.base_stats.attack}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.attack >
                  props.otherPokemon.base_stats.attack ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.attack <
                  props.otherPokemon.base_stats.attack ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.attack >
                  props.otherPokemon.base_stats.attack ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.attack <
                  props.otherPokemon.base_stats.attack ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1">Defense: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.defense >
                      props.otherPokemon.base_stats.defense
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.defense <
                      props.otherPokemon.base_stats.defense
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.defense >
                      props.otherPokemon.base_stats.defense
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.defense <
                      props.otherPokemon.base_stats.defense
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.defense
                : props.otherPokemon.base_stats.defense}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.defense >
                  props.otherPokemon.base_stats.defense ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.defense <
                  props.otherPokemon.base_stats.defense ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.defense >
                  props.otherPokemon.base_stats.defense ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.defense <
                  props.otherPokemon.base_stats.defense ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1 text-center">Sp. Attack: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.sp_attack >
                      props.otherPokemon.base_stats.sp_attack
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.sp_attack <
                      props.otherPokemon.base_stats.sp_attack
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.sp_attack >
                      props.otherPokemon.base_stats.sp_attack
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.sp_attack <
                      props.otherPokemon.base_stats.sp_attack
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.sp_attack
                : props.otherPokemon.base_stats.sp_attack}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.sp_attack >
                  props.otherPokemon.base_stats.sp_attack ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.sp_attack <
                  props.otherPokemon.base_stats.sp_attack ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.sp_attack >
                  props.otherPokemon.base_stats.sp_attack ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.sp_attack <
                  props.otherPokemon.base_stats.sp_attack ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1">Sp. Defense: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.sp_defense >
                      props.otherPokemon.base_stats.sp_defense
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.sp_defense <
                      props.otherPokemon.base_stats.sp_defense
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.sp_defense >
                      props.otherPokemon.base_stats.sp_defense
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.sp_defense <
                      props.otherPokemon.base_stats.sp_defense
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.sp_defense
                : props.otherPokemon.base_stats.sp_defense}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.sp_defense >
                  props.otherPokemon.base_stats.sp_defense ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.sp_defense <
                  props.otherPokemon.base_stats.sp_defense ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.sp_defense >
                  props.otherPokemon.base_stats.sp_defense ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.sp_defense <
                  props.otherPokemon.base_stats.sp_defense ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <div className="fs-5 my-1">Speed: </div>
            <div
              className={`fs-5 my-1 overflow-auto ${
                props.otherPokemon === null
                  ? ""
                  : props.primary &&
                    props.pokemon.base_stats.speed >
                      props.otherPokemon.base_stats.speed
                  ? "text-success"
                  : props.primary &&
                    props.pokemon.base_stats.speed <
                      props.otherPokemon.base_stats.speed
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.speed >
                      props.otherPokemon.base_stats.speed
                  ? "text-danger"
                  : !props.primary &&
                    props.pokemon.base_stats.speed <
                      props.otherPokemon.base_stats.speed
                  ? "text-success"
                  : ""
              }`}
            >
              {props.primary
                ? props.pokemon.base_stats.speed
                : props.otherPokemon.base_stats.speed}
              {props.otherPokemon === null ? (
                ""
              ) : props.primary &&
                props.pokemon.base_stats.speed >
                  props.otherPokemon.base_stats.speed ? (
                <i className="bi bi-arrow-up"></i>
              ) : props.primary &&
                props.pokemon.base_stats.speed <
                  props.otherPokemon.base_stats.speed ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.speed >
                  props.otherPokemon.base_stats.speed ? (
                <i className="bi bi-arrow-down"></i>
              ) : !props.primary &&
                props.pokemon.base_stats.speed <
                  props.otherPokemon.base_stats.speed ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-dash"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCompareBlock;
