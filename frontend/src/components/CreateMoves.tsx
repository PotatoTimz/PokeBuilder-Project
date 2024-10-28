import { useContext, useEffect, useState } from "react";
import { Move, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchTypes } from "../utilities/fetchTypes";

function CreateMoves() {
  const { axiosFetch, isLoggedIn } = useContext(UserContext);
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
    if (!isLoggedIn()) {
      navigate("/");
    }
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
      <form>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) =>
            setMoveData({ ...moveData, move_name: e.target.value })
          }
        />
        <label>Description</label>
        <input
          type="text"
          onChange={(e) =>
            setMoveData({ ...moveData, move_description: e.target.value })
          }
        />
        <label>Power</label>
        <input
          type="number"
          onChange={(e) =>
            setMoveData({ ...moveData, move_power: parseInt(e.target.value) })
          }
        />
        <label>Accuracy</label>
        <input
          type="number"
          onChange={(e) =>
            setMoveData({
              ...moveData,
              move_accuracy: parseInt(e.target.value),
            })
          }
        />
        <label>PP</label>
        <input
          type="number"
          onChange={(e) =>
            setMoveData({ ...moveData, move_pp: parseInt(e.target.value) })
          }
        />
        <label>Type</label>
        <select
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

        <input type="submit" onClick={submitMove} />
      </form>
    </>
  ) : (
    <div>loading</div>
  );
}

export default CreateMoves;
