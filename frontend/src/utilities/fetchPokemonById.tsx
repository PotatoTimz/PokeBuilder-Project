import { Axios } from "axios";
import { ExtensivePokemonData } from "../interfaces/PokemonInterfaces";

export async function fetchPokemon(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    const response = await axiosInstance.get("/pokemon/" + id);
    const data: ExtensivePokemonData = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
