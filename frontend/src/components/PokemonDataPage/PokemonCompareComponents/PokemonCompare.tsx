import { useEffect, useState } from "react";
import { ExtensivePokemonData } from "../../../interfaces/PokemonInterfaces";
import PokemonCompareBlock from "./PokemonCompareBlock";
import { fetchPokeAPI } from "../../../utilities/fetchPokeAPI";
import { Axios } from "axios";
import { fetchPokemonById } from "../../../utilities/fetchPokemonInfo";

interface Props {
  axiosInstance: Axios;
  pokemon: ExtensivePokemonData;
}

function PokemonCompare(props: Props) {
  const [compareMode, setCompareMode] = useState<string>("custom");
  const [otherPokemon, setOtherPokemon] = useState<ExtensivePokemonData | null>(
    null
  );
  const [pokemonQuery, setPokemonQuery] = useState<string>("");
  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);

  const getOfficialPokemon = async () => {
    setDoneLoading(false);
    setSearchError(false);
    const response = await fetchPokeAPI(props.axiosInstance, pokemonQuery);
    if (response == "error") {
      setSearchError(true);
    } else {
      await setOtherPokemon(response);
      await setDoneLoading(true);
    }
  };

  const getCustomPokemon = async () => {
    setDoneLoading(false);
    setSearchError(false);
    const response = await fetchPokemonById(props.axiosInstance, pokemonQuery);
    if (response == "error") {
      setSearchError(true);
    } else {
      await setOtherPokemon(response);
      await setDoneLoading(true);
    }
  };

  const resetCompare = () => {
    setOtherPokemon(null);
  };

  return (
    <>
      <div className="row justify-content-center bg-secondary mb-5">
        <div className="col-lg-8 col-md-9 col-12 py-1">
          <div className="text-center text-white fs-2 fw-bold">
            Compare Pokemon
          </div>
          <div className="text-center text-white fs-5 mt-3 fw-medium">
            Want to compare stat lines with other pokemon? What stats are
            higher? Which are lower? Lets take a look! You can compare{" "}
            {props.pokemon?.pokemon_name} pokemon with other custom pokemon on
            the site or official pokemon!
          </div>
          <div className="d-flex flex-row justify-content-center my-5 ">
            <button
              className={`btn btn-light mx-5 fw-medium ${
                compareMode !== "official" ? "disabled" : ""
              }`}
              onClick={(e) => setCompareMode("custom")}
            >
              PokeBuilder
            </button>
            <button
              className={`btn btn-light mx-5 fw-medium ${
                compareMode === "official" ? "disabled" : ""
              }`}
              onClick={(e) => setCompareMode("official")}
            >
              Offical Pokemon
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">
          <div className="row justify-content-center">
            <PokemonCompareBlock
              pokemon={props.pokemon}
              otherPokemon={otherPokemon!}
              primary={true}
              reset={resetCompare}
            />
            {otherPokemon === null ? (
              compareMode === "official" ? (
                <div className="col-lg-6 col-md-5 col-sm-6">
                  <div className="fs-5 fw-bold text-center mb-3">
                    Official Pokemon
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <input
                        placeholder="Pokemon ID or Name"
                        className="form-control"
                        onChange={(e) => setPokemonQuery(e.target.value)}
                      />
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-danger"
                        onClick={getOfficialPokemon}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {searchError ? (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center text-danger">
                          You have not entered a valid name/id. Please try again
                          with a valid input.
                        </div>
                      ) : (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center">
                          Please enter the name or number of an official
                          pokemon. We'll get its data and than compare them to{" "}
                          {props.pokemon.pokemon_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-lg-6 col-md-5 col-sm-6">
                  <div className="fs-5 fw-bold text-center mb-3">
                    PokeBuilder Pokemon
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <input
                        placeholder="Pokemon ID"
                        className="form-control"
                        onChange={(e) => setPokemonQuery(e.target.value)}
                      />
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-danger"
                        onClick={getCustomPokemon}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {searchError ? (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center text-danger">
                          You have not entered a valid name/id. Please try again
                          with a valid input.
                        </div>
                      ) : (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center">
                          Please enter the id number of an PokeBuilder pokemon.
                          We'll get its data and than compare them to{" "}
                          {props.pokemon.pokemon_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ) : doneLoading ? (
              <PokemonCompareBlock
                pokemon={props.pokemon}
                otherPokemon={otherPokemon!}
                primary={false}
                reset={resetCompare}
              />
            ) : (
              <div>Loading Pokemon Data...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonCompare;
