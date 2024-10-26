import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { SimplePokemonData } from "../interfaces/pokemon_data_interface";
import { UserContext } from "../context/userAuth";

function UserPage() {
  const { axiosFetch } = useContext(UserContext);
  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[] | null>(
    null
  );

  useEffect(() => {
    axiosFetch
      .get("http://127.0.0.1:5000/user/pokemon", {})
      .then((response) => {
        console.log(response);
        setUserPokemon(response.data);
      })
      .catch((err: AxiosError) => {});
  }, []);

  return (
    <>
      <div>user page</div>
      {userPokemon?.map((pokemon, index) => {
        console.log(pokemon);
        return <div key={index}>{pokemon.pokemon_name}</div>;
      })}
    </>
  );
}

export default UserPage;
