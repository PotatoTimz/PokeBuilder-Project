import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData } from "../../interfaces/PokemonInterfaces";
import { UserContext } from "../../context/UserAuth";
import { fetchPokemonByUser } from "../../utilities/fetchPokemonInfo";
import { fetchMoveByUser } from "../../utilities/fetchMoveInfo";
import { useParams } from "react-router-dom";
import ProfileMessage from "./ProfileMessage";
import PokemonListData from "../DisplayData/PokemonListData";
import MoveListData from "../DisplayData/MoveListData";

/*
  Profile Page Component

  Page to display information about the account (determined by URL Parameters). Displays 
  moves and pokemon that are associated with the currently displayed account. 
  Additionally allows users to edit / delete their Pokemon and moves.
*/
function ProfilePage() {
  const { profileName } = useParams();
  const { axiosFetch, username } = useContext(UserContext);

  // Check if we are on the currently logged in profile
  let currentProfile: boolean = username == profileName ? true : false;

  const [userPokemon, setUserPokemon] = useState<SimplePokemonData[]>([]);
  const [userMoves, setUserMoves] = useState<Move[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayState, setDisplayState] = useState<string>("Pokemon");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetchPokemonByUser(axiosFetch, profileName!);
      console.log(response);
      setUserPokemon(response);
      const response2 = await fetchMoveByUser(axiosFetch, profileName!);
      setUserMoves(response2);
      setIsLoading(true);
    };
    fetchUserInfo();
  }, []);

  return isLoading ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-11">
            <div className="text-center fs-3 fw-bold border-bottom">
              {profileName}'s Profile
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5 mb-3">
          {currentProfile ? (
            <ProfileMessage
              pokemonCreated={userPokemon.length}
              movesCreated={userMoves.length}
              profileName={profileName!}
            />
          ) : null}
        </div>
        <div className="row justify-content-center mb-2">
          <div className="col-lg-11 mx-4">
            <div className="row fs-3 text-center">
              <p className="border-bottom fw-medium">Toggle Creation Viewer</p>
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
              {profileName}'s {displayState}
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="d-flex flex-row flex-wrap justify-content-center col col-lg-10">
            {displayState == "Pokemon" ? (
              <PokemonListData
                pokemonData={userPokemon}
                creator={currentProfile}
                axiosInstance={axiosFetch}
              />
            ) : (
              <MoveListData moveData={userMoves} mode="edit" />
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
