from models.account import Account
from extensions import db
from flask import jsonify, abort

def validate_user_input(data):
    if not data or not data.get("username") or not data.get("password"):
        abort(400, "Invalid Input!")
    
    username = data.get("username")
    password = data.get("password")

    return username, password

def check_account_created(username):
    if Account.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists. Please enter a unique username!"}), 401

def create_account(username, hashed_password, salt):
    new_account = Account(username=username, hashed_password=hashed_password, salt=salt)
    db.session.add(new_account)
    db.session.commit()

def get_all_accounts():
    accounts = Account.query.all()
    return jsonify([{"id": account.id, "username": account.username} for account in accounts])