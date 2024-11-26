// Importing Axios instance for making HTTP requests
import { Axios } from "axios";
// Importing the interfaces that define the structure of Pokemon data
import {
  ExtensivePokemonData, // Interface for detailed Pokemon data
  SimplePokemonData, // Interface for simplified Pokemon data (likely with less detail)
} from "../interfaces/PokemonInterfaces";

// Function to fetch a Pokemon by its ID
export async function fetchPokemonById(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    // Sending a GET request to fetch detailed Pokemon data by its ID
    const response = await axiosInstance.get("/pokemon/" + id);
    // Parsing the response data as ExtensivePokemonData
    const data: ExtensivePokemonData = await response.data;
    // Returning the fetched detailed data
    return data;
  } catch (error) {
    // If an error occurs, return a string "error"
    return "error";
  }
}

// Function to fetch all Pokemon, with optional filters by name and creator
export async function fetchAllPokemon(
  axiosInstance: Axios,
  name: string,
  creator: string
): Promise<SimplePokemonData[]> {
  try {
    // Sending a GET request to fetch all Pokemon, with query parameters for filtering by name and creator
    const response = await axiosInstance.get("/pokemon", {
      params: { name: name, creator: creator },
    });
    // Parsing the response data as an array of SimplePokemonData
    const data: SimplePokemonData[] = await response.data;
    // Returning the fetched list of Pokemon
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
  // Returning an empty array in case of an error
  return [];
}

// Function to fetch Pokemon created by a specific user, based on the username
export async function fetchPokemonByUser(
  axiosInstance: Axios,
  username: string
): Promise<SimplePokemonData[]> {
  try {
    // Sending a GET request to fetch all Pokemon by a specific user
    const response = await axiosInstance.get("/user/pokemon/" + username);
    // Parsing the response data as an array of SimplePokemonData
    const data: SimplePokemonData[] = await response.data;
    // Returning the list of Pokemon created by the user
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
  // Returning an empty array in case of an error
  return [];
}

// Function to create a new Pokemon using detailed data
export async function createPokemon(
  axiosInstance: Axios,
  pokemonData: ExtensivePokemonData
): Promise<any> {
  try {
    // Sending a POST request to create a new Pokemon using the provided data
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
    // Returning the response from the create operation
    return response;
  } catch (error) {
    // Logging any errors that occur during the create operation
    console.log(error);
  }
}

// Function to update an existing Pokemon using its ID and new data
export async function updatePokemon(
  axiosInstance: Axios,
  pokemonData: ExtensivePokemonData,
  pokemonId: string
): Promise<any> {
  try {
    // Sending a PUT request to update the specified Pokemon using its ID and the provided new data
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
    // Returning the response from the update operation
    return response;
  } catch (error) {
    // Logging any errors that occur during the update operation
    console.log(error);
  }
}

// Function to delete a Pokemon by its ID
export async function deletePokemon(axiosInstance: Axios, pokemonId: string) {
  try {
    // Sending a DELETE request to remove the specified Pokemon by its ID
    await axiosInstance.delete("/user/pokemon/" + pokemonId);
  } catch (error) {
    // Logging any errors that occur during the delete operation
    console.log(error);
    // Returning the error object in case of failure
    return error;
  }
}
