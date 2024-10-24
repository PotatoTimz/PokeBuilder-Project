from flask import Blueprint, request, jsonify
from services.jwt_token_service import token_required
from services.pokemon_service import get_all_pokemons, add_pokemon, validate_data

pokemon_bp = Blueprint("pokemon_bp", __name__)

@pokemon_bp.route("/pokemon", methods=["GET"])
def manage_pokemon():
    if request.method == "GET":
        pokemons = get_all_pokemons()
        return jsonify([{
                            "id": pokemon[0], 
                            "name": pokemon[1],
                            "creator": pokemon[2],
                            "types": pokemon[3],
                            "image": pokemon[4]
                        } for pokemon in pokemons])

@pokemon_bp.route("/pokemon", methods=["POST", "GET"])
@token_required
def manage_user_pokemon(user_data):
    if request.method == "POST":
        # Check user body
        data = request.json
        types, name, image = validate_data(data)
        
        # Check if types are valid
        add_pokemon(types, name, image, user_data.username)

        return jsonify({"message": "pokemon successfully added!"})