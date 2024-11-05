import { useContext, useEffect, useState } from "react";
import { Move, SimplePokemonData, Type } from "../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../utilities/helpers";

interface Props {
  moveData: Move[];
  mode: string;
  learnMove?: (moveName: string) => {};
  removeMove?: (moveName: string) => {};
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
                <td>{move.move_name}</td>
                <td id="pokemonType" className={`bg-${curr_type.name} px-3`}>
                  {capitalizeFirstCharacter(curr_type.name)}
                </td>
                <td className="text-center">{move.move_power}</td>
                <td className="text-center">{move.move_accuracy}</td>
                <td className="text-center">{move.move_pp}</td>
                <td>{move.move_description}</td>
                {props.mode != "default" ? (
                  props.mode == "add" ? (
                    <td className="text-center">
                      <button
                        className="button btn-success"
                        onClick={(e) => {
                          props.learnMove!(move.move_name);
                        }}
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </td>
                  ) : (
                    <td className="text-center">
                      <button
                        className="button btn-danger"
                        onClick={(e) => {
                          props.removeMove!(move.move_name);
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
