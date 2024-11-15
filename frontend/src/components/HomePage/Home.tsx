import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserAuth";
import { SimplePokemonData } from "../../interfaces/PokemonInterfaces";
import { fetchAllPokemon } from "../../utilities/fetchPokemonInfo";

function Home() {
  const { axiosFetch } = useContext(UserContext);

  const [pokemonData, setPokemonData] = useState<SimplePokemonData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetchAllPokemon(axiosFetch, "", "");
      console.log(response);
      setPokemonData(response);
    }
    getAllPokemon();
    setIsLoaded(true);
  }, []);

  // Default Page
  return (
    <>
      {isLoaded ? (
        <>
          <div className="container-fluid">
            <div className="row justify-content-md-center py-5 bg-danger px-6 text-center">
              <div className="d-flex flex-column col-6 justify-center">
                <p className="fs-3 text-white font-weight-bold">
                  Custom Pokemon Builder!
                </p>
                <div className="text-white fs-7 px-6">
                  <p>
                    Welcome to the PokeBuilder website! Here you can build your
                    own custom pokemon from scratch. Select your pokemon's type,
                    stats, moves and image. Display your pokemon's data in a
                    neet and percise manner for you and other to see. Look at
                    other user's creations and moves. Can you build the coolest
                    Pokemon?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default Home;
