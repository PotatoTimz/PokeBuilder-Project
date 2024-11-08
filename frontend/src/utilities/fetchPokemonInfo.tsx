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
    return "error";
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

export async function createPokemon(
  axiosInstance: Axios,
  pokemonData: ExtensivePokemonData
): Promise<any> {
  try {
    const response = await axiosInstance.post("/user/pokemon", {
      name: pokemonData.pokemon_name,
      types: pokemonData.pokemon_types,
      image: pokemonData.pokemon_image,
      hp: pokemonData.base_stats.hp,
      attack: pokemonData.base_stats.attack,
      defense: pokemonData.base_stats.defense,
      sp_attack: pokemonData.base_stats.sp_attack,
      sp_defense: pokemonData.base_stats.sp_defense,
      speed: pokemonData.base_stats.speed,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePokemon(
  axiosInstance: Axios,
  pokemonData: ExtensivePokemonData,
  pokemonId: string
): Promise<any> {
  try {
    const response = await axiosInstance.put("/user/pokemon/" + pokemonId, {
      name: pokemonData.pokemon_name,
      types: pokemonData.pokemon_types,
      image: pokemonData.pokemon_image,
      hp: pokemonData.base_stats.hp,
      attack: pokemonData.base_stats.attack,
      defense: pokemonData.base_stats.defense,
      sp_attack: pokemonData.base_stats.sp_attack,
      sp_defense: pokemonData.base_stats.sp_defense,
      speed: pokemonData.base_stats.speed,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePokemon(axiosInstance: Axios, pokemonId: string) {
  try {
    await axiosInstance.delete("/user/pokemon/" + pokemonId);
  } catch (error) {
    console.log(error);
    return error;
  }
}
