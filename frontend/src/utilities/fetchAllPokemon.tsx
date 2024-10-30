import { Axios } from "axios";
import { SimplePokemonData } from "../interfaces/PokemonInterfaces";

export async function fetchAllPokemon(
  axiosInstance: Axios
): Promise<SimplePokemonData[]> {
  try {
    const response = await axiosInstance.get("/pokemon");
    const data: SimplePokemonData[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
