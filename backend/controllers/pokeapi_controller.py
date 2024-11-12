from collections import defaultdict
from flask import Blueprint, abort, request, jsonify
import requests, json

from services.pokemon_service import get_pokemon_by_id

pokeapi_bp = Blueprint("pokeapi_bp", __name__)

@pokeapi_bp.route("/pokeapi/pokemon/<string:pokemon>", methods=["GET"])
def get_pokemon_info(pokemon):
    # Get information from Pokemon from PokeAPI
    if request.method == "GET":
        res = requests.get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        data = res.json()

        return jsonify({
            "pokemon_name": data.get("name"),
            "creator": "The Pokemon Company",
            "pokemon_image": data.get("sprites").get("other").get("official-artwork").get("front_default"),
            "base_stats": {
                "hp": data.get("stats")[0].get("base_stat"),
                "attack": data.get("stats")[1].get("base_stat"),
                "defense": data.get("stats")[2].get("base_stat"),
                "sp_attack": data.get("stats")[3].get("base_stat"),
                "sp_defense": data.get("stats")[4].get("base_stat"),
                "speed": data.get("stats")[5].get("base_stat")
            },
            "pokemon_types": [{
                "name": type.get("type").get("name")
            }for type in data.get("types")]
        })
    
@pokeapi_bp.route("/pokeapi/pokemon/<string:pokemon>/typechart", methods=["GET"])
def get_pokemon_typechart(pokemon):
    # Create a type chart using information from PokeAPI
    if request.method == "GET":
        pokemon_data = get_pokemon_by_id(pokemon)

        # Creates dictionary of type matchups (by default damage-taken = 1x)
        types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water']
        type_chart = {type: 1 for type in types}

        # Fetch type data from PokeAPI for each type a pokemon has
        for type in pokemon_data.get("pokemon_types"):
            res = requests.get("https://pokeapi.co/api/v2/type/" + type.get("name"))
            data = res.json().get("damage_relations")

            # Update typechart based on double damage
            for t in data.get("double_damage_from"):
                type_chart[t.get("name")] = type_chart[t.get("name")] * 2
            
            # Update typechart based on half damage
            for t in data.get("half_damage_from"):
                type_chart[t.get("name")] = type_chart[t.get("name")] * 0.5

            # Update typechart based on damage immunity
            for t in data.get("no_damage_from"):
                type_chart[t.get("name")] = type_chart[t.get("name")] * 0

        # Create list of every possible damage effectiveness 
        damage_taken_chart = defaultdict(list)

        for type in type_chart:
            if type_chart[type] == 0:
                damage_taken_chart["0"].append(type)
            elif type_chart[type] == 1/4:
                damage_taken_chart["1/4"].append(type)
            elif type_chart[type] == 1/2:
                damage_taken_chart["1/2"].append(type)
            elif type_chart[type] == 1:
                damage_taken_chart["1"].append(type)
            elif type_chart[type] == 2:
                damage_taken_chart["2"].append(type)
            elif type_chart[type] == 4:
                damage_taken_chart["4"].append(type)

        # Return damaage chart
        return jsonify({"type_chart": damage_taken_chart})

@pokeapi_bp.route("/pokeapi/move/<string:move>", methods=["GET"])
def get_move_info(move):
    # Get infromation about a move from PokeAPI
    if request.method == "GET":
        res = requests.get("https://pokeapi.co/api/v2/move/" + move)
        data = res.json()
        
        return jsonify({"move_name": data.get("name"),
                        "move_accuracy": data.get("accuracy"),
                        "move_description": data.get("flavor_text_entries")[0].get("flavor_text").replace("\n", " "),
                        "move_power": data.get("power"),
                        "move_pp": data.get("pp"),
                        "type": data.get("type").get("name")
                        })
