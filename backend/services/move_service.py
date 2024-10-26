from models.move import Move
from models.type import Type

from services.type_service import valid_type

from extensions import db
from flask import abort, jsonify
from sqlalchemy import func

def get_all_moves():
    moves = Move.query.all()

    move_data = jsonify(
        [
            {
                "move_id": move.id,
                "move_name": move.name,
                "move_power": move.power,
                "move_description": move.description,
                "move_accuracy": move.accuracy,
                "move_pp": move.pp,
                "type":{
                    "type_id": move.type_id,
                    "type_name": db.session.query(Type).filter(Type.id==move.type_id).first().name
                }
            } for move in moves
        ] 
    )

    return move_data

def get_move_by_id(id):
    move = Move.query.filter_by(id=id).first()

    move_data = jsonify(
        {
            "move_id": move.id,
            "move_name": move.name,
            "move_power": move.power,
            "move_description": move.description,
            "move_accuracy": move.accuracy,
            "move_pp": move.pp,
            "type":{
                "type_id": move.type_id,
                "type_name": db.session.query(Type).filter(Type.id==move.type_id).first().name
            } 
        }
    )
    
    return move_data

def validate_data(data):
    if not data or not data.get("name") or not data.get("power") or not data.get("description") or not data.get("accuracy") or not data.get("pp") or not data.get("type"):
        abort(400, "Invalid Input!")
    
    name, power, description, accuracy, pp, type = data.get("name"), data.get("power"), data.get("description"), data.get("accuracy"), data.get("pp"), data.get("type")

    return name, power, description, accuracy, pp, type

def add_move(name, power, description, accuracy, pp, type):

    if not valid_type(type):
        abort(400, type, "not found")
    type_id = Type.query.filter(Type.name==type).first().id
    new_move = Move(name=name, power=power, description=description, accuracy=accuracy, pp=pp, type_id=type_id)

    db.session.add(new_move)
    db.session.commit()

def delete_move(id):
    delete_move = Move.query.filter_by(id=id).first()
    db.session.delete(delete_move)
    db.session.commit()