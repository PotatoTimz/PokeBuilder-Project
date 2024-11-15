import { Move, Type } from "../../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserAuth";
import { deleteMove } from "../../utilities/fetchMoveInfo";

interface Props {
  moveData: Move[];
  mode: string;
  learnMove?: (moveName: string) => {};
  removeMove?: (moveName: string) => {};
}

/*
  Mist List Component
  Displays a table of all moves given (sent as a list). An extra column
  is added if the table is on editing/updating mode.

  Learn Mode:
  Button displayed to add or remove move from Pokemon.

  Edit Mode:
  Button displayed to update or delete move from an Account.
*/
function MoveListData(props: Props) {
  const { axiosFetch } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <table className="table" id="moveTable">
      <thead>
        <tr className="table-secondary">
          <th>#</th>
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
          {/* Settings row only displays if table is put to editing mode */}
          {props.mode != "default" ? (
            <th className="text-center" scope="col">
              <i className="bi bi-gear-fill"></i>
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {props.moveData ? (
          props.moveData.map((move, i) => {
            const curr_type: Type = move.type as Type;
            return (
              <tr key={i} className="table-light">
                <td>{move.move_id}</td>
                <td>{move.move_name}</td>
                <td id="pokemonType" className={`bg-${curr_type.name} px-3`}>
                  {capitalizeFirstCharacter(curr_type.name)}
                </td>
                <td className="text-center">{move.move_power}</td>
                <td className="text-center">{move.move_accuracy}</td>
                <td className="text-center">{move.move_pp}</td>
                <td>{move.move_description}</td>
                {/* "default" = no column
                    "add_pokemon" = add move to a pokemon
                    "delete_pokemon" = delete move from a pokemon
                    "edit" = update or delet emove
                */}
                {props.mode != "default" ? (
                  props.mode == "add_pokemon" ? (
                    <td className="text-center">
                      <button
                        title="Add move to Pokemon"
                        className="button btn-success"
                        onClick={(e) => {
                          props.learnMove!(move.move_name);
                        }}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </td>
                  ) : props.mode == "delete_pokemon" ? (
                    <td className="text-center">
                      <button
                        title="Remove move from Pokemon"
                        className="button btn-danger"
                        onClick={(e) => {
                          props.removeMove!(move.move_name);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  ) : (
                    <td className="text-center">
                      <button
                        className="button btn-success"
                        title="Edit Move"
                        onClick={(e) => {
                          navigate("/move/edit/" + move.move_id);
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="button btn-danger"
                        title="Delete Move"
                        onClick={(e) => {
                          deleteMove(axiosFetch, move.move_id.toString());
                          navigate(0);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  )
                ) : null}
              </tr>
            );
          })
        ) : (
          <div>No Data</div>
        )}
      </tbody>
    </table>
  );
}

export default MoveListData;
