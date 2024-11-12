from models.account import Account
from extensions import db
from flask import jsonify, abort

def validate_user_input(data):
    """
    Validates the user input data.

    Checks if a "username" and "password" was inputed. If not
    sends a 400 error

    Args:
        data (dict): A dictionary containing the user input. Expected to have 
                     keys 'username' and 'password'.
    
    Returns:
        tuple: A tuple containing the 'username' and 'password' if valid.                 
    """

    if not data or not data.get("username") or not data.get("password"):
        abort(400, "Invalid Input!")
    
    username = data.get("username")
    password = data.get("password")

    return username, password

def check_account_created(username):
    """
    Check if an account with the given username already exists.

    Given a username queries the database to find a row the given username.
    If an entry was found send a 401 error

    Args:
        username (str): The username to check in the database.
    
    Returns:
        tuple: A tuple containing a JSON response with an error message 
            and a 401 HTTP status code if the username exists.
    """

    if Account.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists. Please enter a unique username!"}), 401

def create_account(username, hashed_password, salt):
    """
    Creates a new user account and stores it in the database.

    Given the information needed to make an "Account" entry create the entry
    and than add it to the database

    Args:
        username (str): The username of the new account.
        hashed_password (str): The hashed password of the new account.
        salt (str): The salt used in the password hashing process.

    Returns:
        tuple: A JSON response with a success message and a 201 HTTP status code
    """

    new_account = Account(username=username, hashed_password=hashed_password, salt=salt)
    db.session.add(new_account)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

def get_all_accounts():
    """
    Retrieves and returns all accounts from the database

    Returns:
        tuple: A JSON containing all accounts.
    """
    accounts = Account.query.all()
    return jsonify([{"id": account.id, "username": account.username} for account in accounts])

def get_account(account):
    """
    Given Account returns account info
    """

    return jsonify({"id": account.id, "username": account.username})

def delete_account(account):
    """
    Given an Account delete an account from the database
    """
    
    db.session.delete(account)
    db.session.commit()

    return jsonify({"message": "Successfully delete account!"}), 201

def update_password(account, hashed_password, salt):
    """
    Given the information needed to make an account update account
    to have new information.

    Args:
        username (str): The username of the new account.
        hashed_password (str): The hashed password of the new account.
        salt (str): The salt used in the password hashing process.

    Returns:
        tuple: A JSON response with a success message and a 201 HTTP status code
    """
    account.hashed_password = hashed_password
    account.salt = salt
    db.session.commit()
    
    return jsonify({"message": "Successfully updated password!"}), 201

def get_account_name(id):
    """
    Given the account id return the account name
    """

    return Account.query.filter(Account.id==id).first().username