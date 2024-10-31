import { useContext, useEffect, useState } from "react";
import { Move, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchTypes } from "../utilities/fetchTypes";

function CreateMoves() {
  const { axiosFetch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<Type[]>([]);
  const [moveData, setMoveData] = useState<Move>({
    move_id: 0,
    move_accuracy: 0,
    move_description: "",
    move_name: "",
    move_power: 0,
    move_pp: 0,
    type: "normal",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllTypes() {
      const response = await fetchTypes(axiosFetch);
      setTypes(response);
    }
    getAllTypes();
    setIsLoading(true);
  }, []);

  const submitMove = async (e: React.FormEvent) => {
    e.preventDefault();
    axiosFetch
      .post("user/move", {
        name: moveData.move_name,
        power: moveData.move_power,
        description: moveData.move_description,
        accuracy: moveData.move_accuracy,
        pp: moveData.move_pp,
        type: moveData.type,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  return isLoading ? (
    <>
      <div className="container-fluid">
        <div className="row fs-3 justify-content-center ">
          <div className="col-lg-6">
            <div className="text-center fw-bold mt-3">Create Your Move!</div>
          </div>
        </div>
        <div className="row justify-content-center mt-1 mb-5">
          <div className="col-lg-6">
            <form>
              <div className="form-group my-3">
                <label>Name</label>
                <input
                  type="text"
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
                        {type.name}
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
      </div>
    </>
  ) : (
    <div>loading</div>
  );
}

export default CreateMoves;
