from flask import Blueprint, abort, request, jsonify
import requests, json

pokeapi_bp = Blueprint("pokeapi_bp", __name__)

@pokeapi_bp.route("/pokeapi/pokemon/<string:pokemon>", methods=["GET"])
def get_pokemon_info(pokemon):
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