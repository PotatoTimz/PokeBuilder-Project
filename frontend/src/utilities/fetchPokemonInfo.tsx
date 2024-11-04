import { Axios } from "axios";
import {
  ExtensivePokemonData,
  SimplePokemonData,
} from "../interfaces/PokemonInterfaces";

export async function fetchPokemonById(
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

export async function fetchPokemonByUser(
  axiosInstance: Axios,
  username: string
): Promise<SimplePokemonData[]> {
  try {
    const response = await axiosInstance.get("/user/pokemon/" + username);
    const data: SimplePokemonData[] = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
}
