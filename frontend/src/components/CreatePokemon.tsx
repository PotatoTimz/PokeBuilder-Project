import { useContext, useEffect, useState } from "react";
import { ExtensivePokemonData, Move } from "../interfaces/PokemonInterfaces";
import { UserContext } from "../context/UserAuth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function CreatePokemon() {
  const { axiosFetch, isLoggedIn } = useContext(UserContext);
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
    pokemon_type: ["grass"],
    pokemon_move: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const submitPokemon = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: pokemonData.pokemon_name,
      types: pokemonData.pokemon_type,
      image: pokemonData.pokemon_image,
      hp: pokemonData.base_stat.hp,
      attack: pokemonData.base_stat.attack,
      defense: pokemonData.base_stat.defense,
      sp_attack: pokemonData.base_stat.sp_attack,
      sp_defense: pokemonData.base_stat.sp_defense,
      speed: pokemonData.base_stat.speed,
    });
    console.log({
      name: "Ivysaur",
      types: ["grass", "water"],
      image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full//002.png",
      hp: 45,
      attack: 49,
      defense: 49,
      sp_attack: 65,
      sp_defense: 65,
      speed: 45,
    });
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

  return (
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
        <label>Types</label>

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
  );
}

export default CreatePokemon;
