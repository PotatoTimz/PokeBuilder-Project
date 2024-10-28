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
    pokemon_type: ["normal", ""],
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
        types: pokemonData.pokemon_type,
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
      <form>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) =>
            setPokemonData({ ...pokemonData, pokemon_name: e.target.value })
          }
        />
        <label>Image</label>
        <input
          type="text"
          onChange={(e) =>
            setPokemonData({ ...pokemonData, pokemon_image: e.target.value })
          }
        />
        <label>Type 1</label>
        <select
          onChange={(e) => {
            setPokemonData({
              ...pokemonData,
              pokemon_type: [
                e.target.value,
                pokemonData.pokemon_type[0] as string,
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

        <label>Type 2</label>
        <select
          onChange={(e) => {
            setPokemonData({
              ...pokemonData,
              pokemon_type: [
                pokemonData.pokemon_type[0] as string,
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

        <div>Base Stats</div>
        <label>HP</label>
        <input
          type="number"
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
        <label>Attack</label>
        <input
          type="number"
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
        <label>Defense</label>
        <input
          type="number"
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
        <label>Special Attack</label>
        <input
          type="number"
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
        <label>Special Defense</label>
        <input
          type="number"
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
        <label>Speed</label>
        <input
          type="number"
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

        <input type="submit" onClick={submitPokemon} />
      </form>
    </>
  ) : (
    <div>loading</div>
  );
}

export default CreatePokemon;
