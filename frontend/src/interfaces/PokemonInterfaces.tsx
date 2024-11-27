// Interface for a Pokémon Type, which has an ID and a name (e.g., Fire, Water, Grass)
export interface Type {
  type_id: number; // The unique identifier for the type
  name: string; // The name of the type (e.g., 'Fire', 'Water', etc.)
}

// Interface for the base stats of a Pokémon, which includes various attributes like HP, attack, defense, etc.
export interface BaseStats {
  hp: number; // Health points of the Pokémon
  attack: number; // Attack stat of the Pokémon
  defense: number; // Defense stat of the Pokémon
  sp_attack: number; // Special attack stat of the Pokémon
  sp_defense: number; // Special defense stat of the Pokémon
  speed: number; // Speed stat of the Pokémon
}

// Interface for a Pokémon Move, which includes move attributes such as accuracy, description, power, etc.
export interface Move {
  move_id: number; // The unique identifier for the move
  move_accuracy: number; // The accuracy of the move (percentage)
  move_description: string; // Description of what the move does
  move_name: string; // The name of the move (e.g., 'Tackle', 'Flamethrower')
  move_power: number; // Power of the move (damage it deals)
  move_pp: number; // Power points (how many times the move can be used)
  type: Type | string; // Type of the move (it can be a Type object or just a string representing the move type)
}

// Interface for detailed Pokémon data, including base stats, type, moves, etc.
export interface ExtensivePokemonData {
  base_stats: BaseStats; // The base stats of the Pokémon
  creator: string; // The creator or owner of the Pokémon
  pokemon_id: number; // Unique identifier for the Pokémon
  pokemon_image: string; // URL or path to the Pokémon's image
  pokemon_name: string; // Name of the Pokémon
  pokemon_types: Type[] | string[]; // The types of the Pokémon, can be an array of Type objects or strings
  pokemon_moves: Move[]; // The list of moves that the Pokémon can use
}

// Interface for simplified Pokémon data, usually for search results where not all details are needed
export interface SimplePokemonData {
  creator: string; // The creator or owner of the Pokémon
  pokemon_id: number; // Unique identifier for the Pokémon
  pokemon_image: string; // URL or path to the Pokémon's image
  pokemon_name: string; // Name of the Pokémon
  pokemon_types: Type[] | string[]; // Types of the Pokémon (array of Type objects or strings)
}

// Interface for a search query, which contains the Pokémon's name and creator for search filters
export interface PokemonSearchQuery {
  name: string; // Name of the Pokémon for searching
  creator: string; // Creator or owner of the Pokémon for searching
}

// Interface for the Pokémon type chart, which defines how types interact with each other (e.g., Fire is strong against Grass)
export interface TypeChart {
  type_chart: {
    // An object mapping each type to an array of types it is strong against
    [key: string]: string[]; // Key is the Pokémon type, value is an array of types that the key type is strong against
  };
}

// Default values for the base stats of a Pokémon, initialized to 0 for all stats
const defaultBaseStats: BaseStats = {
  hp: 0, // Default HP
  attack: 0, // Default attack stat
  defense: 0, // Default defense stat
  sp_attack: 0, // Default special attack stat
  sp_defense: 0, // Default special defense stat
  speed: 0, // Default speed stat
};

// Default value for a Pokémon Type, initialized with an ID of 0 and an empty name
const defaultType: Type = {
  type_id: 0, // Default type ID
  name: "", // Default type name (empty string)
};

// Default value for a Pokémon Move, initialized with basic values like 0 for ID and power, and empty strings for name and description
const defaultMove: Move = {
  move_id: 0, // Default move ID
  move_accuracy: 0, // Default move accuracy
  move_description: "", // Default move description (empty string)
  move_name: "", // Default move name (empty string)
  move_power: 0, // Default move power (0)
  move_pp: 0, // Default move PP (0)
  type: "", // Default move type (empty string)
};

// Default value for extensive Pokémon data, using default values for all properties (base stats, types, moves, etc.)
export const defaultExtensivePokemonData: ExtensivePokemonData = {
  base_stats: defaultBaseStats, // Base stats initialized to default
  creator: "", // Creator name initialized to an empty string
  pokemon_id: 0, // Pokémon ID initialized to 0
  pokemon_image: "", // Pokémon image URL initialized to an empty string
  pokemon_name: "", // Pokémon name initialized to an empty string
  pokemon_types: [defaultType], // Pokémon types initialized with the default Type object
  pokemon_moves: [defaultMove], // Pokémon moves initialized with the default Move object
};
