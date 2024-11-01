import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtensivePokemonData, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { fetchPokemon } from "../utilities/fetchPokemonById";

function PokemonInfo() {
  const { id } = useParams();
  const { axiosFetch } = useContext(UserContext);
  const [pokemonInfo, setPokemonInfo] = useState<ExtensivePokemonData | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getPokemonData() {
      const response = await fetchPokemon(axiosFetch, id as string);
      setPokemonInfo(response);
      console.log(response);
    }
    getPokemonData();
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center my-4">
          <div className="col-15">
            <div className="row justify-content-center">
              <div className="col-lg-4 d-flex flex-row justify-content-between bg-light">
                <div className="fs-2 fw-bold">{pokemonInfo?.pokemon_name}</div>
                <div className="fs-2">#{pokemonInfo?.pokemon_id}</div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 bg-light">
                <div className="fs-6 fw-bold">
                  Creator: {pokemonInfo?.creator}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center border-dark border">
                <img className="p-3" src={pokemonInfo?.pokemon_image} />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center d-flex flex-row">
                {pokemonInfo?.pokemon_types.map((type, index) => {
                  const curr_type: Type = type as Type;
                  return <div key={index}>{curr_type.name}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default PokemonInfo;
