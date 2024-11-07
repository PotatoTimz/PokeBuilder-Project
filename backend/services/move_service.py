from models.account import Account
from models.move import Move
from models.type import Type
from models.association_pokemon_move import PokemonMove

from services.type_service import valid_type

from extensions import db
from flask import abort, jsonify
from sqlalchemy import and_, func

def get_all_moves(name, creator):
    moves = (db.session.query(Move, Account)
            .with_entities(Move.id, Move.name, Account.username.label("creator"), Move.power, Move.description, Move.accuracy, Move.pp, Move.type_id)
            .filter(Move.name.ilike(f'%{name}%'))
            .join(Account)
            .filter(Account.username.ilike(f'%{creator}%'))
             .all())

    move_data = jsonify(
        [
            {
                "move_id": move[0],
                "move_name": move[1],
                "move_creator": move[2],
                "move_power": move[3],
                "move_description": move[4],
                "move_accuracy": move[5],
                "move_pp": move[6],
                "type":{
                    "type_id": move[7],
                    "name": db.session.query(Type).filter(Type.id==move[7]).first().name
                }
            } for move in moves
        ] 
    )

    return move_data

def get_move_by_id(id):
    move = (db.session.query(Move, Account)
            .with_entities(Move.id, Move.name, Account.username.label("creator"), Move.power, Move.description, Move.accuracy, Move.pp, Move.type_id)
            .filter(Move.id==id)
            .join(Account)
            .first())
    
    move_data = jsonify(
        {
            "move_id": move.id,
            "move_name": move.name,
            "move_creator": move.creator,
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

def learnable_moves_by_pokemon(id):
    moves = (db.session.query(Move)
            .with_entities(Move.id, Move.name, Account.username.label("creator"), Move.power, Move.description, Move.accuracy, Move.pp, Move.type_id)
            .outerjoin(PokemonMove, and_(Move.id == PokemonMove.move_id, PokemonMove.pokemon_id == id)).
            filter(PokemonMove.move_id == None)
            .join(Account)
            .all()
            )
        

    move_data = jsonify(
        [
            {
                "move_id": move[0],
                "move_name": move[1],
                "move_creator": move[2],
                "move_power": move[3],
                "move_description": move[4],
                "move_accuracy": move[5],
                "move_pp": move[6],
                "type":{
                    "type_id": move[7],
                    "name": db.session.query(Type).filter(Type.id==move[7]).first().name
                }
            } for move in moves
        ] 
    )
    
    return move_data

def validate_data(data):
    if not data or not data.get("name") or not data.get("power") or not data.get("description") or not data.get("accuracy") or not data.get("pp") or not data.get("type"):
        abort(400, "Invalid Input!")
    
    name, power, description, accuracy, pp, type = data.get("name"), data.get("power"), data.get("description"), data.get("accuracy"), data.get("pp"), data.get("type")

    return name, power, description, accuracy, pp, type

def add_move(name, power, description, accuracy, pp, type, username):

    if not valid_type(type):
        abort(400, "Type not found. Invalid Input")

    account_id = Account.query.filter_by(username=username).first().id
    type_id = Type.query.filter(Type.name==type).first().id

    new_move = Move(name=name, account_id=account_id, power=power, description=description, accuracy=accuracy, pp=pp, type_id=type_id)

    db.session.add(new_move)
    db.session.commit()
    
def update_move(id, name, power, description, accuracy, pp, type):
    
    if not valid_type(type):
        abort(400, "Type not found. Invalid Input")
    
    current_move = Move.query.filter_by(id=id).first()
    current_move.name = name
    current_move.power = power
    current_move.description = description
    current_move.accuracy = accuracy
    current_move.pp = pp
    
    type_id = Type.query.filter(Type.name==type).first().id
    current_move.type_id = type_id
    
    db.session.commit()

def delete_move(id):
    delete_move = Move.query.filter_by(id=id).first()
    db.session.delete(delete_move)
    db.session.commit()

def valid_move(move):
    return False if not Move.query.filter_by(name=move).first() else True