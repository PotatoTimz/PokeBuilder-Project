import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtensivePokemonData } from "../../interfaces/PokemonInterfaces";
import { UserContext } from "../../context/UserAuth";
import { fetchPokemonById } from "../../utilities/fetchPokemonInfo";
import PokemonInfoCard from "./PokemonInfoCard";
import PokemonBaseStats from "./PokemonBaseStats";
import MoveListData from "../MoveListData";

function PokemonInfo() {
  const { id } = useParams();
  const { axiosFetch } = useContext(UserContext);
  const [pokemonInfo, setPokemonInfo] = useState<ExtensivePokemonData>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getPokemonData() {
      const response = await fetchPokemonById(axiosFetch, id as string);
      setPokemonInfo(response);
      setIsLoaded(true);
      console.log(response);
    }
    getPokemonData();
  }, []);

  return isLoaded ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center my-5">
          <div className="col-lg-3 col-sm-11 mx-3" id="pokemonInfoCard">
            <PokemonInfoCard pokemonInfo={pokemonInfo!} />
          </div>
          <div className="col-lg-5 col-sm-11 mx-3" id="pokemonInfoCard">
            <PokemonBaseStats pokemonInfo={pokemonInfo!} />
          </div>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-10">
            <div className="fs-4 mb-3">{pokemonInfo?.pokemon_name}'s Moves</div>
            <MoveListData
              moveData={pokemonInfo?.pokemon_moves!}
              mode="default"
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default PokemonInfo;
