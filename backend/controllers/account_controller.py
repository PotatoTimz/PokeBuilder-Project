from flask import Blueprint, request, jsonify
from models.account import Account
from services.account_service import validate_user_input, check_account_created, create_account, get_all_accounts, update_password, get_account, delete_account
from services.hashing_service import hash_password, verify_password
from services.jwt_token_service import generate_token

account_bp = Blueprint("account_bp", __name__)

@account_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    username, password = validate_user_input(data)

    check_account_created(username)

    account = Account.query.filter_by(username=username).first()
    if not account:
        return jsonify({"message": "Invalid Username"}), 401
    
    if verify_password(password, account.hashed_password, account.salt):
        token = generate_token(username)
        return jsonify({"token": token})
    else:
        return jsonify({"message": "Invalid Password"}), 401
    
@account_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    username, password = validate_user_input(data)
    check_account_created(username)
    hashed_password, salt = hash_password(password)
    
    return create_account(username, hashed_password, salt)

@account_bp.route("/users", methods=["GET"])
def get_users():
    return get_all_accounts()

@account_bp.route("/users/<int:account_id>", methods=["PUT", "DELETE", "GET"])
def manage_users(account_id):
    account = Account.query.get_or_404(account_id)

    if request.method == "GET":
        return get_account(account)
    elif request.method == "DELETE":
        return delete_account(account)

