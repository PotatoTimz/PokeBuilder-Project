import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { fetchMoves } from "../utilities/fetchMoveInfo";
import { capitalizeFirstCharacter } from "../utilities/helpers";

interface Props {
  moveData: Move[];
}

function MoveListData(props: Props) {
  return (
    <table className="table" id="moveTable">
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
        {props.moveData ? (
          props.moveData.map((move, i) => {
            const curr_type: Type = move.type as Type;
            return (
              <tr key={i} className="table-light">
                <td>{move.move_name}</td>
                <td id="pokemonType" className={`bg-${curr_type.name} px-3`}>
                  {capitalizeFirstCharacter(curr_type.name)}
                </td>
                <td className="text-center">{move.move_power}</td>
                <td className="text-center">{move.move_accuracy}</td>
                <td className="text-center">{move.move_pp}</td>
                <td>{move.move_description}</td>
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
