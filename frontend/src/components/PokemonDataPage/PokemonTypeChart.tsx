import { useEffect, useState } from "react";
import { fetchTypeChartPokeApi } from "../../utilities/fetchPokeAPI";
import { Axios } from "axios";
import { TypeChart } from "../../interfaces/PokemonInterfaces";
import { capitalizeFirstCharacter } from "../../utilities/helpers";

interface Props {
  id: string;
  axiosFetch: Axios;
}

/*
  Type Chart Component
  Displays a Pokemon's type chart based of information retrieved from
  the PokeAPI
*/
function PokemonTypeChart(props: Props) {
  const [typeChart, setTypeChart] = useState<TypeChart>({ type_chart: {} });
  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const keys = Object.keys(typeChart.type_chart);

  useEffect(() => {
    async function getTypeChart() {
      const response = await fetchTypeChartPokeApi(props.axiosFetch, props.id);
      setTypeChart(response);
      setDoneLoading(true);
      console.log(response);
    }
    getTypeChart();
  }, []);

  return doneLoading ? (
    <div className="row justify-content-center">
      <div className="col-10 mb-5">
        <div className="text-center fs-3 mb-4 border-bottom">Type Chart</div>
        <div className="row justify-content-center">
          <table id="typeChart" className="table">
            <thead className="thead-light">
              <tr>
                <th className="fs-5 fw-light">Effectiveness</th>
                <th className="fs-5 fw-light">Types</th>
              </tr>
            </thead>
            <tbody>
              {keys.map((key: string, index) => {
                return (
                  <tr key={index}>
                    <th className="text-center bg-light fs-5 fw-light">
                      {key}x
                    </th>
                    <td className="d-flex flex-wrap p-1">
                      {typeChart.type_chart[key as keyof object].map(
                        (type, index) => {
                          return (
                            <div
                              key={index}
                              className={`bg-${type} pokemonType fs-5 m-1`}
                            >
                              {capitalizeFirstCharacter(type)}
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
    <div>Loading Type Chart...</div>
  );
}

export default PokemonTypeChart;
