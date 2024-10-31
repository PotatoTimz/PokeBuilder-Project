import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { fetchMoves } from "../utilities/fetchMoves";

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
            <table className="table my-5" id="moveTable">
              <thead>
                <tr className="table-secondary">
                  <th scope="col">Name</th>
                  <th className="text-center" scope="col">
                    Type
                  </th>
                  <th className="text-center" scope="col">
                    Pow.
                  </th>
                  <th className="text-center" scope="col">
                    Acc.
                  </th>
                  <th className="text-center" scope="col">
                    PP.
                  </th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {moveData.map((move, i) => {
                  const curr_type: Type = move.type as Type;
                  return (
                    <tr key={i} className="table-light">
                      <td>{move.move_name}</td>
                      <td
                        id="pokemonType"
                        className={`bg-${curr_type.name} px-3`}
                      >
                        {curr_type.name}
                      </td>
                      <td className="text-center">{move.move_power}</td>
                      <td className="text-center">{move.move_accuracy}</td>
                      <td className="text-center">{move.move_pp}</td>
                      <td>{move.move_description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPokemon;
