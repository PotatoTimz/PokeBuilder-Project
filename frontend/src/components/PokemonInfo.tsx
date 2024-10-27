import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtensivePokemonData } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { AxiosError } from "axios";

function PokemonInfo() {
  const { id } = useParams();
  const { axiosFetch } = useContext(UserContext);
  const [pokemonInfo, setPokemonInfo] = useState<ExtensivePokemonData | null>(
    null
  );
  const [fetchedData, setFetchedData] = useState<boolean>(false);

  useEffect(() => {
    axiosFetch
      .get(`/pokemon/${id}`)
      .then((response) => {
        console.log(response);
        setFetchedData(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>Pokemon Info</div>
    </>
  );
}

export default PokemonInfo;
