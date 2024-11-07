import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";
import { Move } from "../../interfaces/PokemonInterfaces";
import { fetchMoves } from "../../utilities/fetchMoveInfo";
import MoveListData from "../DisplayData/MoveListData";

function SearchPokemon() {
  const { axiosFetch } = useContext(UserContext);
  const [moveData, setMoveData] = useState<Move[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllPokemon() {
      const response = await fetchMoves(axiosFetch);
      console.log(response);
      setMoveData(response);
    }
    getAllPokemon();
    setIsLoaded(true);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-8">
            <MoveListData moveData={moveData} mode="default" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPokemon;
