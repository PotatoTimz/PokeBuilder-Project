import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import PokemonListData from "./PokemonListData";
import MoveListData from "./MoveListData";

function ProfilePage() {
  const { axiosFetch, username } = useContext(UserContext);
  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[]>([]);
  const [userMoves, setUserMoves] = useState<Move[]>([]);
  const [displayToggle, setDisplayToggle] = useState<boolean>(true);

  useEffect(() => {
    axiosFetch
      .get("/user/pokemon", {})
      .then((response) => {
        console.log(response);
        setUserPokemon(response.data);
      })
      .catch((err: AxiosError) => {});
    axiosFetch
      .get("user/move", {})
      .then((response) => {
        console.log(response);
        setUserMoves(response.data);
      })
      .catch((err: AxiosError) => {});
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div id="userPage" className="row my-5 mx-2 justify-content-center">
          <div className="col-lg-10 col-sm-16">
            <div className="row">
              <div className="col-lg-3 col-sm px-3 py-4 m-2 userPageSection bg-light">
                <div className="fs-4 fw-bold mb-4">{username}'s Profile</div>
                <div className="fs-5 fw-bold text-decoration-underline mb-2">
                  User Statistics:
                </div>
                <div className="fs-6 mb-1">Total Pokemon Created: </div>
                <div className="fs-6">Total Moves Created: </div>
              </div>
              <div className="col">
                <div className="row px-3 pt-4 m-2 userPageSection">
                  <div className="fs-4 fw-bold mb-4">
                    {username}'s Custom Pokemon:
                  </div>
                  <div className="d-flex flex-row flex-wrap justify-content-center">
                    <PokemonListData pokemonData={userPokemon} creator={true} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col px-5 py-4 m-2 userPageSection">
                <div className="fs-4 fw-bold mb-3">
                  {username}'s Custom Moves:
                </div>
                <MoveListData moveData={userMoves} />
              </div>
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
