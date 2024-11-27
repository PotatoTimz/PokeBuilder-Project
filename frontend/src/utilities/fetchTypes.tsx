// Importing Axios instance for making HTTP requests
import { Axios } from "axios";
// Importing the interface for the Type data structure
import { Type } from "../interfaces/PokemonInterfaces";

// Function to fetch all types (such as Pokémon types: Fire, Water, Grass, etc.)
export async function fetchTypes(axiosInstance: Axios): Promise<any> {
  try {
    // Sending a GET request to fetch all the available Pokémon types from the server
    const response = await axiosInstance.get("/type");
    // Parsing the response data as an array of Type objects (based on the Type interface)
    const data: Type[] = await response.data;
    // Returning the fetched array of types
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
}
