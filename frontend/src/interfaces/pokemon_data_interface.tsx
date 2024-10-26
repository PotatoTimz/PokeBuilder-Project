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
  move_power: string;
  move_pp: number;
  type: Type;
}

export interface ExtensivePokemonData {
  base_stat: BaseStats;
  creator: string;
  pokemon_id: number;
  pokemon_image: string;
  pokemon_name: string;
  pokemon_type: Type[];
  pokemon_move: Move[];
}

export interface SimplePokemonData {
  base_stat: BaseStats;
  pokemon_creator: string;
  pokemon_id: number;
  pokemon_image: string;
  pokemon_name: string;
}
