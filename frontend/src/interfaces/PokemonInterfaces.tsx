export interface Type {
  type_id: number;
  name: string;
}

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
}

export interface Move {
  move_id: number;
  move_accuracy: number;
  move_description: string;
  move_name: string;
  move_power: number;
  move_pp: number;
  type: Type | string;
}

export interface ExtensivePokemonData {
  base_stat: BaseStats;
  creator: string;
  pokemon_id: number;
  pokemon_image: string;
  pokemon_name: string;
  pokemon_types: Type[] | string[];
  pokemon_moves: Move[];
}

export interface SimplePokemonData {
  creator: string;
  pokemon_id: number;
  pokemon_image: string;
  pokemon_name: string;
  pokemon_types: Type[] | string[];
}

export interface PokemonSearchQuery {
  name: string;
  creator: string;
}
