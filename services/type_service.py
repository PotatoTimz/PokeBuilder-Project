from models.type import Type
from extensions import db
from flask import request, jsonify, current_app, abort

def validate_type(data):
    if not data or not data.get("name"):
        abort(400, "Invalid Input!")

    name = data.get("name")

    return name

def create_type(name):
    new_type = Type(name=name)
    db.session.add(new_type)
    db.session.commit()

    return jsonify({"id": new_type.id, "name": new_type.name})

def get_all_types():
    types = Type.query.all()
    return jsonify([{"id": type.id, "name": type.name} for type in types])