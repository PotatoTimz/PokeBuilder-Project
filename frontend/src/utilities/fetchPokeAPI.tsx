// Importing Axios instance for making HTTP requests
import { Axios } from "axios";
// Importing the interfaces that define the structure of Pokemon data, move data, and type chart
import {
  ExtensivePokemonData,
  Move,
  TypeChart,
} from "../interfaces/PokemonInterfaces";

// Function to fetch detailed Pokemon data from the PokeAPI by Pokemon ID
export async function fetchPokemonPokeAPI(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    // Sending a GET request to fetch detailed Pokemon data for the given ID
    const response = await axiosInstance.get("pokeapi/pokemon/" + id);
    // Parsing the response data as ExtensivePokemonData type
    const data: ExtensivePokemonData = await response.data;
    // Returning the parsed data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
    // Returning a string "error" to indicate failure
    return "error";
  }
}

// Function to fetch the type chart of a Pokemon from the PokeAPI by Pokemon ID
export async function fetchTypeChartPokeApi(
  axiosInstance: Axios,
  id: string
): Promise<any> {
  try {
    // Sending a GET request to fetch the type chart for the given Pokemon ID
    const response = await axiosInstance.get(
      "pokeapi/pokemon/" + id + "/typechart"
    );
    // Parsing the response data as TypeChart type
    const data: TypeChart = await response.data;
    // Returning the parsed type chart data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
    // Returning a string "error" to indicate failure
    return "error";
  }
}

// Function to fetch data of a specific move from the PokeAPI by move name
export async function fetchMovePokeApi(
  axiosInstance: Axios,
  moveName: string
): Promise<any> {
  try {
    // Sending a GET request to fetch data for the given move name
    const response = await axiosInstance.get("pokeapi/move/" + moveName);
    // Parsing the response data as Move type
    const data: Move = await response.data;
    // Returning the parsed move data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
    // Returning a string "error" to indicate failure
    return "error";
  }
}
