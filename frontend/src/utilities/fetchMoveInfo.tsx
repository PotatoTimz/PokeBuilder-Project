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
