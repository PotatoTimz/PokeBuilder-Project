import { Axios } from "axios";
import { SimplePokemonData } from "../interfaces/PokemonInterfaces";

export async function fetchAllPokemon(
  axiosInstance: Axios,
  name: string,
  creator: string
): Promise<SimplePokemonData[]> {
  try {
    const response = await axiosInstance.get("/pokemon", {
      params: { name: name, creator: creator },
    });
    const data: SimplePokemonData[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
