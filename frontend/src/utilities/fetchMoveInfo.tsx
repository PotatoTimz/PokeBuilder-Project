import { Axios } from "axios";
import { Move } from "../interfaces/PokemonInterfaces";

export async function fetchMoves(axiosInstance: Axios): Promise<any> {
  try {
    const response = await axiosInstance.get("/move");
    const data: Move[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMoveById(
  axiosInstance: Axios,
  pokemonId: string
): Promise<any> {
  try {
    const response = await axiosInstance.get("/move/" + pokemonId);
    const data: Move = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMoveByUser(
  axiosInstance: Axios,
  username: string
): Promise<any> {
  try {
    const response = await axiosInstance.get("/user/move/" + username);
    const data: Move[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLearnableMoves(
  axiosInstance: Axios,
  pokemonId: string
): Promise<any> {
  try {
    const response = await axiosInstance.get(
      "user/move/learnable/" + pokemonId
    );
    const data: Move[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addMovePokemon(
  axiosInstance: Axios,
  pokemonId: string,
  moveName: string
): Promise<any> {
  try {
    await axiosInstance.post("user/pokemon/" + pokemonId + "/move", {
      move: moveName,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMovePokemon(
  axiosInstance: Axios,
  pokemonId: string,
  moveName: string
): Promise<any> {
  try {
    await axiosInstance.delete("user/pokemon/" + pokemonId + "/move", {
      data: { move: moveName },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function createMove(
  axiosInstance: Axios,
  moveData: Move
): Promise<any> {
  try {
    const response = await axiosInstance.post("user/move", {
      name: moveData.move_name,
      power: moveData.move_power,
      description: moveData.move_description,
      accuracy: moveData.move_accuracy,
      pp: moveData.move_pp,
      type: moveData.type,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMove(
  axiosInstance: Axios,
  moveId: string,
  moveData: Move
): Promise<any> {
  try {
    const response = await axiosInstance.put("user/move/" + moveId, {
      data: {
        name: moveData.move_name,
        power: moveData.move_power,
        description: moveData.move_description,
        accuracy: moveData.move_accuracy,
        pp: moveData.move_pp,
        type: moveData.type,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMove(axiosInstance: Axios, moveId: string) {
  try {
    await axiosInstance.delete("/user/pokemon/" + moveId);
  } catch (error) {
    console.log(error);
  }
}
