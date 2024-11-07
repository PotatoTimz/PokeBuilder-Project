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
  base_stats: BaseStats;
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

export interface TypeChart {
  type_chart: {
    [key: string]: string[];
  };
}

const defaultBaseStats: BaseStats = {
  hp: 0,
  attack: 0,
  defense: 0,
  sp_attack: 0,
  sp_defense: 0,
  speed: 0,
};

const defaultType: Type = {
  type_id: 0,
  name: "",
};

const defaultMove: Move = {
  move_id: 0,
  move_accuracy: 0,
  move_description: "",
  move_name: "",
  move_power: 0,
  move_pp: 0,
  type: "",
};

export const defaultExtensivePokemonData: ExtensivePokemonData = {
  base_stats: defaultBaseStats,
  creator: "",
  pokemon_id: 0,
  pokemon_image: "",
  pokemon_name: "",
  pokemon_types: [defaultType],
  pokemon_moves: [defaultMove],
};
