from models.type import Type
from extensions import db
from flask import request, jsonify, current_app, abort

def validate_data(data):
    """
    Validates the user input data.
    Checks if the required parameters of a type was given

    Args:
        data (dict): A dictionary containing the user input. Expected to have
                     key "name"
    """
    if not data or not data.get("name"):
        abort(400, "Invalid Input!")

    name = data.get("name")

    return name

def valid_type(type):
    """
    Given a type (str) query the database to check if the type
    exists. Returning a boolean based on the result
    """
    return False if not Type.query.filter_by(name=type).first() else True

def create_type(name):
    """
    Create a type given a "name"
    """
    new_type = Type(name=name)
    db.session.add(new_type)
    db.session.commit()

    return jsonify({"id": new_type.id, "name": new_type.name})

def get_all_types():
    """
    Queries of the entries in "Type" table. Returning the
    data as a JSON.
    """
    types = Type.query.order_by(Type.name).all()
    return jsonify([{"id": type.id, "name": type.name} for type in types])