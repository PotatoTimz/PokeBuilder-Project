from flask import Blueprint, abort, request, jsonify
from services.account_service import get_account_name
from services.jwt_token_service import token_required
from services.move_service import delete_move, get_all_moves, get_move_by_id, learnable_moves_by_pokemon, update_move, validate_data, add_move 

move_bp = Blueprint("move_bp", __name__)

@move_bp.route("/move", methods=["GET"])
def manage_moves():
    if request.method == "GET":
        name = "" if not request.args.get("name") else request.args.get("name")
        creator = "" if not request.args.get("creator") else request.args.get("creator")

        move_data = get_all_moves(name, creator)

        return move_data

@move_bp.route("/user/move", methods=["POST", "GET"])
@token_required
def manage_user_move(user_data):
    if request.method == "GET":
           move_data = get_all_moves("", user_data.username)

           return move_data
    
    if request.method == "POST":
        data = request.json
        name, power, description, accuracy, pp, type = validate_data(data)
        add_move(name, power, description, accuracy, pp, type, user_data.username)

        return jsonify({"message": "move successfully added!"})

@move_bp.route("/user/move/learnable/<int:id>", methods=["GET"])
def manage_learnable_move(id):
    if request.method == "GET":
        move_data = learnable_moves_by_pokemon(id)

        return move_data

# Get Move from other users
@move_bp.route("/user/move/<string:username>", methods=["POST", "GET"])
def manage_other_user_move(username):
    if request.method == "GET":
        move_data = get_all_moves("", username)

        return move_data

    
@move_bp.route("/move/<int:move_id>", methods=["GET"])
@token_required
def manage_moves_by_id(move_id):
    if request.method == "GET":
        move_data = get_move_by_id(move_id)

        return move_data

@move_bp.route("/user/move/<int:move_id>", methods=["DELETE", "PUT"])
@token_required
def modify_delete_move(user_data, move_id):
    print(move_id, "\n\n")
    if request.method == "DELETE":
        delete_move(move_id)
        
        return jsonify({"message": "successfully deleted move!"})
    if request.method == "PUT":
        data = request.json
        name, power, description, accuracy, pp, type = validate_data(data)
        update_move(move_id, name, power, description, accuracy, pp, type)
        
        return jsonify({"message": "Successfully updated move!"})    