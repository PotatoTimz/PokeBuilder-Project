import { useContext, useEffect, useState } from "react";
import {
  PokemonSearchQuery,
  SimplePokemonData,
  Type,
} from "../interfaces/PokemonInterfaces";
import { fetchAllPokemon } from "../utilities/fetchAllPokemon";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";

function SearchPokemon() {
  const { axiosFetch } = useContext(UserContext);
  const [pokemonData, setPokemonData] = useState<SimplePokemonData[]>([]);
  const [searchQuery, setSearchQuery] = useState<PokemonSearchQuery>({
    name: "",
    creator: "",
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitSearchQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchQuery);
    const response = await fetchAllPokemon(
      axiosFetch,
      searchQuery.name,
      searchQuery.creator
    );
    setPokemonData(response);
  };

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetchAllPokemon(
        axiosFetch,
        searchQuery.name,
        searchQuery.creator
      );
      console.log(response);
      setPokemonData(response);
    }
    getAllPokemon();
    setIsLoaded(true);
  }, []);
  return isLoaded ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5">
          <div className="col-6">
            <form>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pokemon Name"
                  onChange={(e) => {
                    setSearchQuery({ ...searchQuery, name: e.target.value });
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Creator Name"
                  onChange={(e) => {
                    setSearchQuery({
                      ...searchQuery,
                      creator: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <button
                  className="form-control btn btn-secondary"
                  onClick={submitSearchQuery}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="d-flex flex-row flex-wrap justify-content-center">
            {pokemonData.map((pokemon, i) => {
              return (
                <div
                  key={i}
                  id="pokemonCard"
                  className="p-3 m-5"
                  onClick={() => {
                    navigate(`/pokemon/${pokemon.pokemon_id}`);
                  }}
                >
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div id="pokemonName" className="fs-2 fw-bold">
                      {pokemon.pokemon_name}
                    </div>
                    <div id="pokemonId" className="fs-5">
                      #{pokemon.pokemon_id}
                    </div>
                  </div>
                  <div className="d-flex flex-row" id="typeSection">
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
                  <div className="fs-6 mt-3" id="createdBy">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default SearchPokemon;
