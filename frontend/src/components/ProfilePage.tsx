import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { SimplePokemonData } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";

function ProfilePage() {
  const { axiosFetch, username } = useContext(UserContext);
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
      <div className="container-fluid">
        <div id="userPage" className="row my-5 mx-2 justify-content-center">
          <div className="col-lg-10 col-sm-16">
            <div className="row bg-primary">
              <div className="col-lg-3 col-sm px-3 py-5 m-2 userPageSection">
                <div className="fs-4 fw-bold mb-4">{username}'s Profile</div>
                <div className="fs-5 fw-bold text-decoration-underline mb-2">
                  User Statistics:
                </div>
                <div className="fs-6 mb-1">Total Pokemon Created: </div>
                <div className="fs-6">Total Moves Created: </div>
              </div>
              <div className="col px-3 py-5 m-2 userPageSection">test</div>
            </div>
          </div>
        </div>
        {userPokemon?.map((pokemon, index) => {
          console.log(pokemon);
          return <div key={index}>{pokemon.pokemon_name}</div>;
        })}
      </div>
    </>
  );
}

export default ProfilePage;
