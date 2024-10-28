import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExtensivePokemonData, Move } from "../interfaces/PokemonInterfaces";
import { fetchPokemon } from "../utilities/fetchPokemonById";
import { UserContext } from "../context/UserAuth";
import { Axios, AxiosError } from "axios";
import { fetchMoves } from "../utilities/fetchMoves";

function AddMovePokemon() {
  const { axiosFetch } = useContext(UserContext);
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<ExtensivePokemonData | null>(
    null
  );
  const [moveData, setMoveData] = useState<Move[] | null>(null);

  async function getPokemonData() {
    const response = await fetchPokemon(axiosFetch, id as string);
    setPokemonData(response);
  }
  async function getMoveData() {
    const response = await fetchMoves(axiosFetch);
    setMoveData(response);
  }

  useEffect(() => {
    getPokemonData();
    getMoveData();
  }, []);

  const submitMove = async (moveName: string) => {
    axiosFetch
      .post("/user/pokemon/" + id + "/move", {
        move: moveName,
      })
      .then((response) => {
        getPokemonData();
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div>Manage Pokemon Moves</div>
      <div>Current Moves</div>
      <div>
        {pokemonData?.pokemon_moves.map((move, index) => {
          return <div key={index}>{move.move_name}</div>;
        })}
      </div>
      <div>All Moves</div>
      <div>
        {moveData?.map((move, index) => {
          return (
            <div key={index}>
              <div>{move.move_name}</div>
              <button
                onClick={(e) => {
                  submitMove(move.move_name);
                }}
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddMovePokemon;
