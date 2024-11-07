import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";
import { ExtensivePokemonData, Move } from "../../interfaces/PokemonInterfaces";
import {
  fetchLearnableMoves,
  addMovePokemon,
  deleteMovePokemon,
} from "../../utilities/fetchMoveInfo";
import { fetchPokemonById } from "../../utilities/fetchPokemonInfo";
import MoveListData from "../DisplayData/MoveListData";

function EditPokemonMoves() {
  const { axiosFetch } = useContext(UserContext);
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<ExtensivePokemonData | null>(
    null
  );
  const [learnableMoveData, setLearnableMoveData] = useState<Move[]>([]);
  const [isLoading, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  async function getPokemonData() {
    const response = await fetchPokemonById(axiosFetch, id as string);
    setPokemonData(response);
  }
  async function getLearnableMoves() {
    const response = await fetchLearnableMoves(axiosFetch, id as string);
    setLearnableMoveData(response);
  }

  useEffect(() => {
    const initialFetch = async () => {
      await getPokemonData();
      await getLearnableMoves();
      setIsLoaded(true);
    };
    initialFetch();
  }, []);

  const learnMove = async (moveName: string) => {
    setIsLoaded(false);
    await addMovePokemon(axiosFetch, id as string, moveName);
    await getPokemonData();
    await getLearnableMoves();
    await setIsLoaded(true);
  };

  const removeMove = async (moveName: string) => {
    setIsLoaded(false);
    await deleteMovePokemon(axiosFetch, id as string, moveName);
    await getPokemonData();
    await getLearnableMoves();
    await setIsLoaded(true);
  };

  return isLoading ? (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-8 col-md-10 col-sm-11 mx-4 bg-secondary rounded-pill">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10 col-sm-11 p-4">
                <div className="text-white fs-3 fw-medium text-center my-2">
                  Move Editor
                </div>
                <div className="text-white fs-6 text-center my-2">
                  Good work creating your Pokemon! All that's left to do is to
                  add some moves on your pokemon. Once that is done you've
                  completed building your own pokemon!
                </div>
                <div className="text-white fs-6 text-center fw-medium mt-5">
                  All done? Let's take a look at what you just created!
                </div>
                <div className="text-center mt-3 mb-2">
                  <button
                    className="btn btn-light px-5"
                    onClick={(e) => {
                      navigate("/pokemon/" + id);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-11 mx-4">
            <div className="row">
              <div className="fs-3 fw-bold mb-3">
                {pokemonData?.pokemon_name}'s Current Moves
              </div>
              <MoveListData
                moveData={pokemonData?.pokemon_moves!}
                mode="delete_pokemon"
                removeMove={removeMove}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5 mb-3">
          <div className="col-lg-11 mx-4">
            <div className="row">
              <div className="fs-3 fw-bold mb-3">
                {pokemonData?.pokemon_name}'s Learnable Moves
              </div>
              <MoveListData
                moveData={learnableMoveData}
                mode="add_pokemon"
                learnMove={learnMove}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading Data...</div>
  );
}

export default EditPokemonMoves;
