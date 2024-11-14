import { useContext, useEffect, useState } from "react";
import { Move, Type } from "../../interfaces/PokemonInterfaces";
import { UserContext } from "../../context/UserAuth";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTypes } from "../../utilities/fetchTypes";
import { capitalizeFirstCharacter } from "../../utilities/helpers";
import {
  createMove,
  fetchMoveById,
  updateMove,
} from "../../utilities/fetchMoveInfo";
import SearchOfficialMove from "./SearchOfficialMove";
import { fetchMovePokeApi } from "../../utilities/fetchPokeAPI";

interface Props {
  updateMode: boolean;
}

function CreateMoves(props: Props) {
  const { id, username } = useParams();
  const { axiosFetch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<Type[]>([]);
  const [moveData, setMoveData] = useState<Move>({
    move_id: 0,
    move_accuracy: 1,
    move_description: "",
    move_name: "",
    move_power: 0,
    move_pp: 1,
    type: "normal",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllTypes() {
      const response = await fetchTypes(axiosFetch);
      setTypes(response);
    }
    async function getMoveData() {
      const response = await fetchMoveById(axiosFetch, id as string);
      setMoveData({ ...response, type: response.type.type_name });

      if (username != response.move_creator) {
        navigate("/");
      }
    }

    getAllTypes();
    if (props.updateMode) {
      getMoveData();
    }
    setIsLoading(true);
  }, []);

  const submitMove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.updateMode) {
      await updateMove(axiosFetch, id as string, moveData);
      navigate("/move");
    } else {
      console.log(moveData);
      await createMove(axiosFetch, moveData);
      navigate("/move");
    }
  };

  const searchResult = async (moveData: Move) => {
    setMoveData({
      ...moveData,
      move_name: capitalizeFirstCharacter(moveData.move_name),
      move_power: moveData.move_power == null ? 0 : moveData.move_power,
    });
  };

  return isLoading ? (
    <>
      <div className="container-fluid bg-gradient py-5">
        <div className="row justify-content-center mt-1 py-5">
          <div className="col-lg-6 bg-light shadow-sm card px-5 py-3">
            <div className="text-center fw-bold fs-1 mt-3">
              Create Your Move!
            </div>

            <form>
              <div className="form-group my-3">
                <label>Name</label>
                <input
                  value={moveData.move_name}
                  type="text"
                  maxLength={20}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({ ...moveData, move_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Description</label>
                <input
                  type="text"
                  value={moveData.move_description}
                  maxLength={200}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Power</label>
                <input
                  type="number"
                  value={moveData.move_power}
                  max={200}
                  min={0}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_power: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Accuracy</label>
                <input
                  type="number"
                  value={moveData.move_accuracy}
                  max={100}
                  min={1}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_accuracy: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>PP</label>
                <input
                  type="number"
                  value={moveData.move_pp}
                  max={50}
                  min={1}
                  className="form-control"
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      move_pp: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Type</label>
                <select
                  className="form-control"
                  value={moveData.type as string}
                  onChange={(e) =>
                    setMoveData({
                      ...moveData,
                      type: e.target.value,
                    })
                  }
                >
                  {types.map((type, index) => {
                    return (
                      <option value={`${type.name}`} key={index}>
                        {capitalizeFirstCharacter(type.name)}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group my-3">
                <input
                  className="form-control btn btn-primary"
                  type="submit"
                  onClick={submitMove}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6 bg-danger shadow-sm card px-5 py-3">
            <SearchOfficialMove
              searchResult={searchResult}
              axiosFetch={axiosFetch}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>loading</div>
  );
}

export default CreateMoves;
