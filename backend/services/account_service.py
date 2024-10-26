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

    return jsonify({"message": "User registered successfully!"}), 201

def get_all_accounts():
    accounts = Account.query.all()
    return jsonify([{"id": account.id, "username": account.username} for account in accounts])

def get_account(account):
    return jsonify({"id": account.id, "username": account.username})

def delete_account(account):
    db.session.delete(account)
    db.session.commit()

    return jsonify({"message": "Successfully delete account!"}), 201

def update_password(account, hashed_password, salt):
    account.hashed_password = hashed_password
    account.salt = salt
    db.session.commit()
    
    return jsonify({"message": "Successfully updated password!"}), 201

def get_account_name(id):
    return Account.query.filter(id==id).first().username