// Importing Axios instance for making HTTP requests
import { Axios } from "axios";
// Importing the Move interface, which defines the structure for the move data
import { Move } from "../interfaces/PokemonInterfaces";

// Function to fetch all available moves
export async function fetchMoves(axiosInstance: Axios): Promise<any> {
  try {
    // Sending a GET request to fetch all moves
    const response = await axiosInstance.get("/move");
    // Parsing the response data as an array of Move objects
    const data: Move[] = await response.data;
    // Returning the fetched data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
}

// Function to fetch a specific move by its ID
export async function fetchMoveById(
  axiosInstance: Axios,
  pokemonId: string
): Promise<any> {
  try {
    // Sending a GET request to fetch a move by its ID
    const response = await axiosInstance.get("/move/" + pokemonId);
    // Parsing the response data as a single Move object
    const data: Move = await response.data;
    // Returning the fetched data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
}

// Function to fetch moves associated with a specific user (by username)
export async function fetchMoveByUser(
  axiosInstance: Axios,
  username: string
): Promise<any> {
  try {
    // Sending a GET request to fetch the moves by the username
    const response = await axiosInstance.get("/user/move/" + username);
    // Parsing the response data as an array of Move objects
    const data: Move[] = await response.data;
    // Returning the fetched data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
}

// Function to fetch learnable moves for a specific Pokemon by its ID
export async function fetchLearnableMoves(
  axiosInstance: Axios,
  pokemonId: string
): Promise<any> {
  try {
    // Sending a GET request to fetch learnable moves for the given Pokemon ID
    const response = await axiosInstance.get(
      "user/move/learnable/" + pokemonId
    );
    // Parsing the response data as an array of Move objects
    const data: Move[] = await response.data;
    // Returning the fetched data
    return data;
  } catch (error) {
    // Logging any errors that occur during the fetch operation
    console.log(error);
  }
}

// Function to add a move to a specific Pokemon
export async function addMovePokemon(
  axiosInstance: Axios,
  pokemonId: string,
  moveName: string
): Promise<any> {
  try {
    // Sending a POST request to add the move to the Pokemon
    await axiosInstance.post("user/pokemon/" + pokemonId + "/move", {
      move: moveName, // The move to be added
    });
  } catch (error) {
    // Logging any errors that occur during the add operation
    console.log(error);
  }
}

// Function to delete a move from a specific Pokemon
export async function deleteMovePokemon(
  axiosInstance: Axios,
  pokemonId: string,
  moveName: string
): Promise<any> {
  try {
    // Sending a DELETE request to remove the move from the Pokemon
    await axiosInstance.delete("user/pokemon/" + pokemonId + "/move", {
      data: { move: moveName }, // The move to be deleted
    });
  } catch (error) {
    // Logging any errors that occur during the delete operation
    console.log(error);
  }
}

// Function to create a new move
export async function createMove(
  axiosInstance: Axios,
  moveData: Move
): Promise<any> {
  try {
    // Sending a POST request to create a new move using the provided data
    const response = await axiosInstance.post("user/move", {
      name: moveData.move_name, // Move name
      power: moveData.move_power, // Power of the move
      description: moveData.move_description, // Description of the move
      accuracy: moveData.move_accuracy, // Accuracy of the move
      pp: moveData.move_pp, // Power points (PP) for the move
      type: moveData.type, // Type of the move
    });
    // Returning the response of the creation request
    return response;
  } catch (error) {
    // Logging any errors that occur during the creation operation
    console.log(error);
  }
}

// Function to update an existing move
export async function updateMove(
  axiosInstance: Axios,
  moveId: string,
  moveData: Move
): Promise<any> {
  try {
    // Logging the move data for debugging purposes
    console.log(moveData);
    // Sending a PUT request to update the existing move using the move ID
    const response = await axiosInstance.put("user/move/" + moveId, {
      name: moveData.move_name,
      power: moveData.move_power,
      description: moveData.move_description,
      accuracy: moveData.move_accuracy,
      pp: moveData.move_pp,
      type: moveData.type,
    });
    // Returning the response of the update request
    return response;
  } catch (error) {
    // Logging any errors that occur during the update operation
    console.log(error);
  }
}

// Function to delete a specific move by its ID
export async function deleteMove(axiosInstance: Axios, moveId: string) {
  try {
    // Sending a DELETE request to remove the move by its ID
    await axiosInstance.delete("/user/move/" + moveId);
  } catch (error) {
    // Logging any errors that occur during the delete operation
    console.log(error);
  }
}
