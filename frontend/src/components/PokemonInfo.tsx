import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtensivePokemonData } from "../interfaces/PokemonInterfaces";
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
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="row">
              <p className="text-center fs-1 fw-bold my-2">
                {pokemonInfo?.pokemon_name}
              </p>
            </div>
            <div className="row">
              <img src={pokemonInfo?.pokemon_image} />
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
