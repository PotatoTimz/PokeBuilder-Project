import { Axios } from "axios";
import {
  ExtensivePokemonData,
  TypeChart,
} from "../interfaces/PokemonInterfaces";

export async function fetchPokemonPokeAPI(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    const response = await axiosInstance.get("pokeapi/pokemon/" + id);
    const data: ExtensivePokemonData = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

export async function fetchTypeChartPokeApi(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    const response = await axiosInstance.get(
      "pokeapi/pokemon/" + id + "/typechart"
    );
    const data: TypeChart = await response.data;
    return data;
  } catch (error) {
    console.log(error);
    return "error";
  }
}
