import { ExtensivePokemonData, Type } from "../../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../../utilities/helpers";

interface Props {
  pokemonInfo: ExtensivePokemonData;
}

/*
  Pokemon Info Card Component.
  Displays general info of a Pokemon. Including it's name, image, type, creator and id
*/
function PokemonInfoCard(props: Props) {
  return (
    <div className="row justify-content-center">
      <div className="col-11 py-4">
        <div className="row mb-4">
          <div className="d-flex flex-row justify-content-between bg-white px-3 pt-2">
            <div className="fs-2 fw-bold">
              {props.pokemonInfo?.pokemon_name}
            </div>
            <div className="fs-2 fst-italic">
              #{props.pokemonInfo?.pokemon_id}
            </div>
          </div>
          <div className="bg-white px-3">
            <a
              className="fs-6 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              href={`/user/${props.pokemonInfo?.creator}`}
            >
              Created By: {props.pokemonInfo?.creator}
            </a>
          </div>
          <div className="d-flex flex-row bg-white px-3 pt-2 pb-4">
            {props.pokemonInfo?.pokemon_types.map((type, index) => {
              const curr_type: Type = type as Type;
              return (
                <div
                  key={index}
                  className={`pokemonType bg-${curr_type.name} col`}
                >
                  {capitalizeFirstCharacter(curr_type.name)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="col bg-white">
            <img
              id="pokemonImage"
              src={props.pokemonInfo?.pokemon_image}
              alt={props.pokemonInfo?.pokemon_name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfoCard;
