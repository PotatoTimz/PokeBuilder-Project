import { useContext, useEffect, useState } from "react";
import {
  PokemonSearchQuery,
  SimplePokemonData,
  Type,
} from "../interfaces/PokemonInterfaces";
import { fetchAllPokemon } from "../utilities/fetchAllPokemon";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import PokemonListData from "./PokemonListData";

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
            <PokemonListData pokemonData={pokemonData} creator={false} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default SearchPokemon;
