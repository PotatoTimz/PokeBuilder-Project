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
