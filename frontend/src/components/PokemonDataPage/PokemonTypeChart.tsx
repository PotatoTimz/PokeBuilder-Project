// Import necessary hooks, utilities, and types
import { useEffect, useState } from "react"; // React hooks for side-effects and state management
import { fetchTypeChartPokeApi } from "../../utilities/fetchPokeAPI"; // Fetching data from PokeAPI
import { Axios } from "axios"; // Axios for making HTTP requests
import { TypeChart } from "../../interfaces/PokemonInterfaces"; // Type definition for the type chart data
import { capitalizeFirstCharacter } from "../../utilities/helpers"; // Utility function to capitalize the first character of a string

// Define the props interface for the component
interface Props {
  id: string; // The ID of the Pokémon for which the type chart will be fetched
  axiosFetch: Axios; // The Axios instance used for making HTTP requests
}

/*
  Type Chart Component
  Displays a Pokémon's type chart based on data retrieved from the PokeAPI.
  It shows the effectiveness of each type against the Pokémon's types.
*/
function PokemonTypeChart(props: Props) {
  // State to hold the type chart data fetched from the API
  const [typeChart, setTypeChart] = useState<TypeChart>({ type_chart: {} });

  // State to track if the data has finished loading
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  // Extract the keys of the type chart for easy iteration
  const keys = Object.keys(typeChart.type_chart);

  // useEffect to fetch the type chart data from PokeAPI once the component mounts
  useEffect(() => {
    async function getTypeChart() {
      // Fetch the type chart data for the given Pokémon ID
      const response = await fetchTypeChartPokeApi(props.axiosFetch, props.id);

      // Update the state with the fetched type chart data
      setTypeChart(response);
      setDoneLoading(true); // Mark the loading as complete
      console.log(response); // Log the response for debugging
    }

    // Call the function to fetch the type chart
    getTypeChart();
  }, []); // Empty dependency array means this runs once after the initial render

  // Render the type chart once the data is loaded
  return doneLoading ? (
    <div className="row justify-content-center">
      <div className="col-10 mb-5">
        {/* Section header */}
        <div className="text-center fs-3 mb-4 border-bottom">Type Chart</div>

        {/* Table to display the type chart */}
        <div className="row justify-content-center">
          <table id="typeChart" className="table">
            {/* Table header with Effectiveness and Types columns */}
            <thead className="thead-light">
              <tr>
                <th className="fs-5 fw-light">Effectiveness</th>
                <th className="fs-5 fw-light">Types</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {keys.map((key: string, index) => {
                return (
                  <tr key={index}>
                    {/* Effectiveness column: shows the effectiveness of the type (e.g., 2x, 0.5x) */}
                    <th className="text-center bg-light fs-5 fw-light">
                      {key}x
                    </th>
                    {/* Types column: displays the types that have the given effectiveness */}
                    <td className="d-flex flex-wrap p-1">
                      {typeChart.type_chart[key as keyof object].map(
                        (type, index) => {
                          return (
                            <div
                              key={index}
                              className={`bg-${type} pokemonType fs-5 m-1`} // Dynamic class based on the type color
                            >
                              {capitalizeFirstCharacter(type)}{" "}
                              {/* Capitalize the type name */}
                            </div>
                          );
                        }
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    // Loading message displayed while waiting for the data
    <div>Loading Type Chart...</div>
  );
}

export default PokemonTypeChart;
