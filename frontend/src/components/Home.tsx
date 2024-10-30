import { useContext, useEffect, useState } from "react";
import { SimplePokemonData } from "../interfaces/PokemonInterfaces";
import { fetchAllPokemon } from "../utilities/fetchAllPokemon";
import { UserContext } from "../context/userAuth";

function Home() {
  const { axiosFetch } = useContext(UserContext);

  const [pokemonData, setPokemonData] = useState<SimplePokemonData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetchAllPokemon(axiosFetch);
      console.log(response);
      setPokemonData(response);
    }
    getAllPokemon();
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <>
          <div>Home Page</div>
          {pokemonData.map((pokemon, index) => {
            return <div key={index}>{pokemon.pokemon_name}</div>;
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Home;
