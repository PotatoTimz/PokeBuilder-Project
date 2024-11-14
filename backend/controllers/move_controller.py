from flask import Blueprint, abort, request, jsonify
from services.account_service import get_account_name
from services.jwt_token_service import token_required
from services.move_service import delete_move, get_all_moves, get_move_by_id, learnable_moves_by_pokemon, update_move, validate_data, add_move 

move_bp = Blueprint("move_bp", __name__)

@move_bp.route("/move", methods=["GET"])
def manage_moves():
    # Get all Moves with given filters
    if request.method == "GET":
        name = "" if not request.args.get("name") else request.args.get("name")
        creator = "" if not request.args.get("creator") else request.args.get("creator")

        move_data = get_all_moves(name, creator)

        return move_data

@move_bp.route("/user/move", methods=["POST", "GET"])
@token_required
def manage_user_move(user_data):
    # Get all Moves with the current user
    if request.method == "GET":
           move_data = get_all_moves("", user_data.username)

           return move_data
    # Add move given the move parameters
    if request.method == "POST":
        print(request.json)
        data = request.json
        name, power, description, accuracy, pp, type = validate_data(data)
        print(request.json)
        add_move(name, power, description, accuracy, pp, type, user_data.username)

        return jsonify({"message": "move successfully added!"}), 201

@move_bp.route("/user/move/learnable/<int:id>", methods=["GET"])
def manage_learnable_move(id):
    # Get all moves that a pokemon does not have
    if request.method == "GET":
        move_data = learnable_moves_by_pokemon(id)

        return move_data

# Get Move from other users
@move_bp.route("/user/move/<string:username>", methods=["GET"])
def manage_other_user_move(username):
    # Get all moves from other users ("not current login")
    if request.method == "GET":
        move_data = get_all_moves("", username)

        return move_data

    
@move_bp.route("/move/<int:move_id>", methods=["GET"])
def manage_moves_by_id(move_id):
    # Get info about specific move (based on id)
    if request.method == "GET":
        move_data = get_move_by_id(move_id)

        return move_data

@move_bp.route("/user/move/<int:move_id>", methods=["DELETE", "PUT"])
@token_required
def modify_delete_move(user_data, move_id):
    # Delete move based on id
    if request.method == "DELETE":
        delete_move(move_id)
        
        return jsonify({"message": "successfully deleted move!"})
    # Update move based on id
    if request.method == "PUT":
        data = request.json
        name, power, description, accuracy, pp, type = validate_data(data)
        update_move(move_id, name, power, description, accuracy, pp, type)
        
        return jsonify({"message": "Successfully updated move!"})    