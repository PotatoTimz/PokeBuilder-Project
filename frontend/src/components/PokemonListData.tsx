import { Type, SimplePokemonData } from "../interfaces/PokemonInterfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemonData: SimplePokemonData[];
  creator: boolean;
}

function PokemonListData(props: Props) {
  const navigate = useNavigate();

  return (
    <>
      {props.pokemonData.map((pokemon, i) => {
        return (
          <div
            key={i}
            id="pokemonCard"
            className="p-3 my-2 mx-4"
            onClick={() => {
              navigate(`/pokemon/${pokemon.pokemon_id}`);
            }}
          >
            <div className="d-flex px-2 my-2 flex-row justify-content-between align-items-center">
              <div id="pokemonName" className="fs-2 fw-bold">
                {pokemon.pokemon_name}
              </div>
              <div id="pokemonId" className="fs-5">
                #{pokemon.pokemon_id}
              </div>
            </div>
            <div className="d-flex px-2 flex-row" id="typeSection">
              {pokemon.pokemon_types.map((type, j) => {
                const curr_type: Type = type as Type;
                return (
                  <div
                    key={j}
                    id="pokemonType"
                    className={`p-2 fs-6 bg-${curr_type.name}`}
                  >
                    {curr_type.name}
                  </div>
                );
              })}
            </div>
            <div className="fs-6 px-2 mt-3" id="createdBy">
              Created By:{" "}
              <a
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                href="/user"
              >
                {pokemon.creator}
              </a>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <img
                id="pokemonImage"
                className="my-4"
                src={pokemon.pokemon_image}
                alt={pokemon.pokemon_name}
              />
            </div>
            {props.creator ? (
              <div className="d-flex flex-row justify-content-center">
                <i className="bi bi-pencil mx-2"></i>
                <i className="bi bi-trash mx-2"></i>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export default PokemonListData;
