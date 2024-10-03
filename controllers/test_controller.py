from flask import Blueprint, request, jsonify
from services.jwt_token_service import token_required

test_bp = Blueprint("test_bp", __name__)

@test_bp.route("/protected", methods=["GET"])
@token_required
def protected(user_data):
    return jsonify({'message': f'Welcome, {user_data.username}! This is a protected route.'})


@test_bp.route("/unprotected", methods=["GET"])
def unprotected():
    return jsonify({"message": "unprotected page!"})

@test_bp.route("/", methods=["GET"])
def test():
    return "test"