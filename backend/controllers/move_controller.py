from flask import Blueprint, abort, request, jsonify
from services.account_service import get_account_name
from services.jwt_token_service import token_required
from services.move_service import delete_move, get_all_moves, get_move_by_id, validate_data, add_move 

move_bp = Blueprint("move_bp", __name__)

@move_bp.route("/move", methods=["GET", "POST"])
def manage_moves():
    if request.method == "GET":
        move_data = get_all_moves()

        return move_data
    if request.method == "POST":
        data = request.json
        name, power, description, accuracy, pp, type = validate_data(data)
        add_move(name, power, description, accuracy, pp, type)

        return jsonify({"message": "move successfully added!"})

    
@move_bp.route("/move/<int:move_id>", methods=["GET", "DELETE"])
def manage_moves_by_id(move_id):
    if request.method == "GET":
        move_data = get_move_by_id(move_id)

        return move_data
    if request.method == "DELETE":
        delete_move(move_id)
        
        return jsonify({"message": "successfully deleted move!"})