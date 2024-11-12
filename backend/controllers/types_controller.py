from flask import Blueprint, request, jsonify
from services.jwt_token_service import token_required
from services.type_service import validate_data, create_type, get_all_types


type_bp = Blueprint("type_bp", __name__)

@type_bp.route("/type", methods=["POST", "GET"])
def manage_types():
    # Get all types 
    if request.method == "GET":
        return get_all_types()
    # Add new types
    if request.method == "POST":
        data = request.json
        name = validate_data(data)
        return create_type(name)

