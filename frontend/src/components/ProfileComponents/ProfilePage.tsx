import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData } from "../../interfaces/PokemonInterfaces";
import { UserContext } from "../../context/UserAuth";
import { fetchPokemonByUser } from "../../utilities/fetchPokemonInfo";
import { fetchMoveByUser } from "../../utilities/fetchMoveInfo";
import { useNavigate, useParams } from "react-router-dom";
import ProfileMessage from "./ProfileMessage";
import PokemonListData from "../PokemonListData";
import MoveListData from "../MoveListData";

function ProfilePage() {
  const { userId } = useParams();
  const { axiosFetch, username } = useContext(UserContext);

  // Check if we are on the currently logged in profile
  let currentProfile: boolean;
  if (username == userId) {
    currentProfile = true;
  } else {
    currentProfile = false;
  }

  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[]>([]);
  const [userMoves, setUserMoves] = useState<Move[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayState, setDisplayState] = useState<string>("Pokemon");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetchPokemonByUser(axiosFetch, userId!);
      console.log(response);
      setUserPokemon(response);
      const response2 = await fetchMoveByUser(axiosFetch, userId!);
      setUserMoves(response2);
      setIsLoading(true);
    };
    fetchUserInfo();
  }, []);

  return isLoading ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5 mb-3">
          {currentProfile ? (
            <ProfileMessage
              pokemonCreated={userPokemon.length}
              movesCreated={userMoves.length}
              profileName={userId!}
            />
          ) : null}
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-lg-11 mx-4">
            <div className="row fs-3 text-center">
              <p className="border-bottom">Toggle Creation Viewer</p>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <p
                className="text-primary fs-6 mx-5"
                onClick={() => {
                  setDisplayState("Pokemon");
                }}
              >
                Pokemon
              </p>
              <p
                className="text-primary fs-6 mx-5"
                onClick={() => {
                  setDisplayState("Move");
                }}
              >
                Moves
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-lg-11 mx-4">
            <div className="row fs-4 fw-bold">
              {userId}'s {displayState}
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="d-flex flex-row flex-wrap justify-content-center col col-lg-10">
            {displayState == "Pokemon" ? (
              <PokemonListData
                pokemonData={userPokemon}
                creator={currentProfile}
              />
            ) : (
              <MoveListData moveData={userMoves} />
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading User Data...</div>
  );
}

export default ProfilePage;
