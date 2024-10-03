from flask import Blueprint, request, jsonify
from models.account import Account
from services.account_service import validate_user_input, check_account_created, create_account
from services.hashing_service import hash_password, verify_password
from services.jwt_token_service import generate_token

account_bp = Blueprint("account_bp", __name__)

@account_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    username, password = validate_user_input(data)

    check_account_created(username)

    account = Account.query.filter_by(username=username).first()
    if verify_password(password, account.hashed_password, account.salt):
        token = generate_token(username)
        return jsonify({"token": token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    
@account_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    username, password = validate_user_input(data)
    check_account_created(username)
    hashed_password, salt = hash_password(password)
    create_account(username, hashed_password, salt)

    return jsonify({"message": "User registered successfully!"}), 201

@account_bp.route("/users", methods=["GET"])
def get_users():
    accounts = Account.query.all()
    return jsonify([{"id": account.id, "username": account.username, "password": account.hashed_password.decode("utf-8")} for account in accounts])
