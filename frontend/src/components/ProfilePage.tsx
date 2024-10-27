import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { SimplePokemonData } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";

function ProfilePage() {
  const { axiosFetch } = useContext(UserContext);
  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[] | null>(
    null
  );

  useEffect(() => {
    axiosFetch
      .get("/user/pokemon", {})
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

export default ProfilePage;
