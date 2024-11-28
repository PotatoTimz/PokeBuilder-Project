import { Move, Type } from "../../interfaces/PokemonInterfaces"; // Importing Move and Type interfaces for move data structure
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Utility function to capitalize the first character of a string
import { useNavigate } from "react-router-dom"; // Importing useNavigate to allow for programmatic navigation
import { useContext } from "react"; // Importing useContext to access context values (specifically for authentication here)
import { UserContext } from "../../context/UserAuth"; // Importing UserContext for user authentication information
import { deleteMove } from "../../utilities/fetchMoveInfo"; // Function to handle deleting a move

interface Props {
  moveData: Move[]; // The array of moves passed as a prop to be displayed
  mode: string; // The mode that determines the actions available in the table ("default", "add_pokemon", "delete_pokemon", "edit")
  learnMove?: (moveName: string) => {}; // Optional function to add a move to a Pokémon (only in "add_pokemon" mode)
  removeMove?: (moveName: string) => {}; // Optional function to remove a move from a Pokémon (only in "delete_pokemon" mode)
}

/*
  Move List Component

  This component renders a table of moves and their attributes.
  Depending on the mode, additional action buttons are shown.

  Modes:
  - Learn Mode ("add_pokemon"): Button to add a move to a Pokémon.
  - Edit Mode ("edit"): Buttons to edit or delete a move.
*/

function MoveListData(props: Props) {
  const { axiosFetch } = useContext(UserContext); // Get axiosFetch function from UserContext for making authenticated API requests
  const navigate = useNavigate(); // Get navigate function to programmatically navigate to different routes

  return (
    <table className="table" id="moveTable">
      <thead>
        <tr className="table-secondary">
          {/* Table headers for each column */}
          <th>#</th> {/* Move ID */}
          <th scope="col">Name</th> {/* Move name */}
          <th className="text-center" scope="col">
            Type
          </th>{" "}
          {/* Move type */}
          <th className="text-center" scope="col">
            Pow.
          </th>{" "}
          {/* Move power */}
          <th className="text-center" scope="col">
            Acc.
          </th>{" "}
          {/* Move accuracy */}
          <th className="text-center" scope="col">
            PP.
          </th>{" "}
          {/* Move PP (power points) */}
          <th scope="col">Description</th> {/* Move description */}
          {/* Additional settings column only shows if mode is not "default" */}
          {props.mode !== "default" ? (
            <th className="text-center" scope="col">
              <i className="bi bi-gear-fill"></i> {/* Settings icon */}
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {props.moveData ? (
          // Iterate over the list of moves and render a row for each
          props.moveData.map((move, i) => {
            const curr_type: Type = move.type as Type; // Casting move type to the Type type for correct styling
            return (
              <tr key={i} className="table-light">
                {/* Render each move's attributes in the table */}
                <td>{move.move_id}</td> {/* Display move ID */}
                <td>{move.move_name}</td> {/* Display move name */}
                <td id="pokemonType" className={`bg-${curr_type.name} px-3`}>
                  {/* Display move type with styling based on the type */}
                  {capitalizeFirstCharacter(curr_type.name)}{" "}
                  {/* Capitalize the first letter of the type name */}
                </td>
                <td className="text-center">{move.move_power}</td>{" "}
                {/* Display move power */}
                <td className="text-center">{move.move_accuracy}</td>{" "}
                {/* Display move accuracy */}
                <td className="text-center">{move.move_pp}</td>{" "}
                {/* Display move PP */}
                <td>{move.move_description}</td>{" "}
                {/* Display move description */}
                {/* Action buttons (only shown if mode is not "default") */}
                {props.mode !== "default" ? (
                  props.mode === "add_pokemon" ? (
                    // "add_pokemon" mode: Button to add move to a Pokémon
                    <td className="text-center">
                      <button
                        title="Add move to Pokemon"
                        className="button btn-success"
                        onClick={() => {
                          props.learnMove!(move.move_name); // Call learnMove function to add the move
                        }}
                      >
                        <i className="bi bi-plus-lg"></i> {/* Plus icon */}
                      </button>
                    </td>
                  ) : props.mode === "delete_pokemon" ? (
                    // "delete_pokemon" mode: Button to remove move from a Pokémon
                    <td className="text-center">
                      <button
                        title="Remove move from Pokemon"
                        className="button btn-danger"
                        onClick={() => {
                          props.removeMove!(move.move_name); // Call removeMove function to delete the move
                        }}
                      >
                        <i className="bi bi-trash3"></i> {/* Trash icon */}
                      </button>
                    </td>
                  ) : (
                    // "edit" mode: Buttons to edit or delete a move
                    <td className="text-center">
                      <button
                        className="button btn-success"
                        title="Edit Move"
                        onClick={() => {
                          navigate("/move/edit/" + move.move_id); // Navigate to the edit page for the move
                        }}
                      >
                        <i className="bi bi-pencil"></i> {/* Pencil icon */}
                      </button>
                      <button
                        className="button btn-danger"
                        title="Delete Move"
                        onClick={() => {
                          deleteMove(axiosFetch, move.move_id.toString()); // Call deleteMove function to delete the move
                          navigate(0); // Reload the page after deletion
                        }}
                      >
                        <i className="bi bi-trash3"></i> {/* Trash icon */}
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

export default MoveListData; // Exporting the component to use it elsewhere in the application
