import { useEffect, useState } from "react"; // Importing React hooks
import { ExtensivePokemonData } from "../../../interfaces/PokemonInterfaces"; // Importing the interface for Pokémon data
import PokemonCompareBlock from "./PokemonCompareBlock"; // Importing the component that displays the Pokémon comparison block
import { fetchPokemonPokeAPI } from "../../../utilities/fetchPokeAPI"; // Function to fetch data from PokeAPI
import { Axios } from "axios"; // Axios for making HTTP requests
import { fetchPokemonById } from "../../../utilities/fetchPokemonInfo"; // Function to fetch custom Pokémon data by ID

// Define the types of props this component expects
interface Props {
  axiosInstance: Axios; // Axios instance for making API requests
  pokemon: ExtensivePokemonData; // The main Pokémon data to compare with another Pokémon
}

function PokemonCompare(props: Props) {
  // State variables to manage the comparison mode, the other Pokémon, and loading states
  const [compareMode, setCompareMode] = useState<string>("custom"); // Default mode is 'custom' (for PokeBuilder)
  const [otherPokemon, setOtherPokemon] = useState<ExtensivePokemonData | null>(
    null
  ); // The Pokémon to compare with
  const [pokemonQuery, setPokemonQuery] = useState<string>(""); // The query string (name or ID of Pokémon)
  const [doneLoading, setDoneLoading] = useState<boolean>(false); // Flag to track loading state
  const [searchError, setSearchError] = useState<boolean>(false); // Flag for search errors (invalid name or ID)

  // Function to fetch official Pokémon data from PokeAPI using the query string
  const getOfficialPokemon = async () => {
    setDoneLoading(false);
    setSearchError(false);
    const response = await fetchPokemonPokeAPI(
      props.axiosInstance,
      pokemonQuery
    ); // Fetch data from PokeAPI
    if (response == "error") {
      setSearchError(true); // If an error occurs, set searchError to true
    } else {
      await setOtherPokemon(response); // Set the fetched Pokémon as the other Pokémon to compare
      await setDoneLoading(true); // Mark the loading as complete
    }
  };

  // Function to fetch custom Pokémon data using the query string (ID)
  const getCustomPokemon = async () => {
    setDoneLoading(false);
    setSearchError(false);
    const response = await fetchPokemonById(props.axiosInstance, pokemonQuery); // Fetch custom Pokémon data
    if (response == "error") {
      setSearchError(true); // If an error occurs, set searchError to true
    } else {
      await setOtherPokemon(response); // Set the custom Pokémon as the other Pokémon to compare
      await setDoneLoading(true); // Mark the loading as complete
    }
  };

  // Reset the comparison by clearing the other Pokémon
  const resetCompare = () => {
    setOtherPokemon(null);
  };

  return (
    <>
      {/* Header section with some styling */}
      <div className="row justify-content-center bg-danger mb-5">
        <div className="col-lg-8 col-md-9 col-12 py-1">
          <div className="text-center text-white fs-2 fw-light">
            Compare Pokemon
          </div>
          <div className="text-center text-white fs-5 mt-3 fw-light">
            Want to compare stat lines with other pokemon? What stats are
            higher? Which are lower? Let's take a look! You can compare{" "}
            {props.pokemon?.pokemon_name} with other custom Pokémon on the site
            or official Pokémon!
          </div>

          {/* Buttons to toggle between 'custom' and 'official' Pokémon comparison */}
          <div className="d-flex flex-row justify-content-center my-3">
            <button
              className={`btn btn-light mx-5 fw-medium ${
                compareMode !== "official" ? "disabled" : ""
              }`}
              onClick={(e) => setCompareMode("custom")} // Switch to 'custom' mode
            >
              PokeBuilder
            </button>
            <button
              className={`btn btn-light mx-5 fw-medium ${
                compareMode === "official" ? "disabled" : ""
              }`}
              onClick={(e) => setCompareMode("official")} // Switch to 'official' mode
            >
              Official Pokemon
            </button>
          </div>
        </div>
      </div>

      {/* Main content for Pokémon comparison */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8">
          <div className="row justify-content-center">
            {/* Render the primary Pokémon's comparison block */}
            <PokemonCompareBlock
              pokemon={props.pokemon}
              otherPokemon={otherPokemon!}
              primary={true}
              reset={resetCompare}
            />

            {/* Handle the case when no second Pokémon is selected */}
            {otherPokemon === null ? (
              compareMode === "official" ? (
                <div className="col-lg-6 col-md-5 col-sm-6">
                  <div className="fs-5 fw-bold text-center mb-3">
                    Official Pokemon
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-8">
                      {/* Input field for searching official Pokémon by name or ID */}
                      <input
                        placeholder="Pokemon ID or Name"
                        className="form-control"
                        onChange={(e) => setPokemonQuery(e.target.value)} // Update the query string
                      />
                    </div>
                    <div className="col-2">
                      {/* Button to trigger the official Pokémon search */}
                      <button
                        className="btn btn-danger"
                        onClick={getOfficialPokemon} // Trigger the search
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Display error or instructions */}
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {searchError ? (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center text-danger">
                          You have not entered a valid name/id. Please try again
                          with a valid input.
                        </div>
                      ) : (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center">
                          Please enter the name or number of an official
                          Pokémon. We'll get its data and then compare them to{" "}
                          {props.pokemon.pokemon_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Render search form for 'custom' Pokémon (PokeBuilder)
                <div className="col-lg-6 col-md-5 col-sm-6">
                  <div className="fs-5 fw-bold text-center mb-3">
                    PokeBuilder Pokemon
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-8">
                      <input
                        placeholder="Pokemon ID"
                        className="form-control"
                        onChange={(e) => setPokemonQuery(e.target.value)} // Update the query string
                      />
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-danger"
                        onClick={getCustomPokemon} // Trigger the custom Pokémon search
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Display error or instructions */}
                  <div className="row justify-content-center">
                    <div className="col-10">
                      {searchError ? (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center text-danger">
                          You have not entered a valid name/id. Please try again
                          with a valid input.
                        </div>
                      ) : (
                        <div className="fs-6 fw-light fst-italic mt-2 text-center">
                          Please enter the ID number of a PokeBuilder Pokémon.
                          We'll get its data and then compare them to{" "}
                          {props.pokemon.pokemon_name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ) : doneLoading ? (
              // Render the secondary Pokémon's comparison block once data is loaded
              <PokemonCompareBlock
                pokemon={props.pokemon}
                otherPokemon={otherPokemon!}
                primary={false}
                reset={resetCompare}
              />
            ) : (
              // Show loading message while data is being fetched
              <div>Loading Pokemon Data...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonCompare;
