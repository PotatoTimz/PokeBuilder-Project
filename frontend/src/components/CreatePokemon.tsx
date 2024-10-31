import { useContext, useEffect, useState } from "react";
import { ExtensivePokemonData, Type } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchTypes } from "../utilities/fetchTypes";

function CreatePokemon() {
  const { axiosFetch, isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [types, setTypes] = useState<Type[]>([]);
  const [pokemonData, setPokemonData] = useState<ExtensivePokemonData>({
    base_stat: {
      hp: 0,
      attack: 0,
      defense: 0,
      sp_attack: 0,
      sp_defense: 0,
      speed: 0,
    },
    creator: "",
    pokemon_id: 0,
    pokemon_image: "",
    pokemon_name: "",
    pokemon_types: ["normal", ""],
    pokemon_moves: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllTypes() {
      const response = await fetchTypes(axiosFetch);
      setTypes(response);
    }

    getAllTypes();
    setIsLoading(true);
  }, []);

  const submitPokemon = async (e: React.FormEvent) => {
    e.preventDefault();

    axiosFetch
      .post("/user/pokemon", {
        name: pokemonData.pokemon_name,
        types: pokemonData.pokemon_types,
        image: pokemonData.pokemon_image,
        hp: pokemonData.base_stat.hp,
        attack: pokemonData.base_stat.attack,
        defense: pokemonData.base_stat.defense,
        sp_attack: pokemonData.base_stat.sp_attack,
        sp_defense: pokemonData.base_stat.sp_defense,
        speed: pokemonData.base_stat.speed,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((err: AxiosError) => {
        console.log(err.response);
      });
  };

  return isLoading ? (
    <>
      <div className="container-fluid">
        <div className="row fs-3 justify-content-center ">
          <div className="col-lg-6">
            <div className="text-center fw-bold mt-3">Create Your Pokemon!</div>
          </div>
        </div>
        <div className="row justify-content-center mt-1 mb-5">
          <div className="col-lg-6">
            <form>
              <div className="form-group my-3">
                <div className="fw-bold mb-2 fs-5">General Info</div>
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      pokemon_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      pokemon_image: e.target.value,
                    })
                  }
                />
              </div>

              <div className="fw-bold mb-2 fs-5">Type</div>
              <div className="row">
                <div className="col">
                  <div className="form-group my-3">
                    <label>Type 1</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setPokemonData({
                          ...pokemonData,
                          pokemon_types: [
                            e.target.value,
                            pokemonData.pokemon_types[1] as string,
                          ],
                        });
                      }}
                    >
                      {types.map((type, index) => {
                        return (
                          <option value={`${type.name}`} key={index}>
                            {type.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col">
                  {" "}
                  <div className="form-group my-3">
                    <label>Type 2</label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setPokemonData({
                          ...pokemonData,
                          pokemon_types: [
                            pokemonData.pokemon_types[0] as string,
                            e.target.value,
                          ],
                        });
                      }}
                    >
                      <option value={``}>No Second Type</option>
                      {types.map((type, index) => {
                        return (
                          <option value={`${type.name}`} key={index}>
                            {type.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="fw-bold fs-5">Base Stats</div>
              <div className="form-group my-3">
                <label>HP</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        hp: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Attack</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        attack: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Defense</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        defense: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Special Attack</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        sp_attack: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Special Defense</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        sp_defense: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <label>Speed</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setPokemonData({
                      ...pokemonData,
                      base_stat: {
                        ...pokemonData.base_stat,
                        speed: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="form-group my-3">
                <input
                  className="form-control btn btn-primary"
                  type="submit"
                  onClick={submitPokemon}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>loading</div>
  );
}

export default CreatePokemon;
