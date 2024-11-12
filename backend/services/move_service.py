from models.account import Account
from models.move import Move
from models.type import Type
from models.association_pokemon_move import PokemonMove

from services.type_service import valid_type

from extensions import db
from flask import abort, jsonify
from sqlalchemy import and_, func

def get_all_moves(name, creator):
    """
    Retrieves all moves filtered by the specified name and creator.

    Queries Move table to retrieve all moves whos names match the given
    "name" and "creator" parameter. Returning a JSON containing information
    of all the queried moves.

    Args:
        name (str): The name or partial name of the move to filter.
        creator (str): The username or partial username of the creator to filter.

    Returns:
        tuple: A JSON response containing a list of moves that match the filters, 
               with their associated details (such as power, accuracy, description, 
               and type information) and a 200 HTTP status code.
    """
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
    """
    Retrieves a single move by its ID.

    Queries the Move table and fetches the move associated to the given id.
    """
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
    """
    Retrieves all possible moves that a Pokémon can learn based on its ID.
    
    Queries the database to find all moves that are not associated
    to the given Pokemon.
    """
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
    """
    Validates the user input data.
    Checks if the required parameters of a Move was given.

    Args:
        data (dict): A dictionary containing the user input. Expected to have 
                     keys 'name', 'power', 'description', 'accuracy',
                     'pp' and 'type'.
    """
    if not data or not data.get("name") or not data.get("power") or not data.get("description") or not data.get("accuracy") or not data.get("pp") or not data.get("type"):
        abort(400, "Invalid Input!")
    
    name, power, description, accuracy, pp, type = data.get("name"), data.get("power"), data.get("description"), data.get("accuracy"), data.get("pp"), data.get("type")

    return name, power, description, accuracy, pp, type

def add_move(name, power, description, accuracy, pp, type, username):
    """
    Adds a new Move to the database

    Creates a new move given the needed parameters. Associating
    the move to the given type. Once completed adds the move to
    the database

    Args:
        name (str): The name of the move.
        power (int): The power of the move.
        description (str): A description of the move's effects.
        accuracy (int): The accuracy of the move (0 to 100).
        pp (int): The Power Points (PP) of the move.
        type (str): The type of the move (e.g., 'fire', 'water').
        username (str): The username of the account creating the move.

    Returns:
        None: If successful, the move is added to the database and the function 
              ends with no return. If invalid input is detected, it will abort 
              with a 400 error.
    """
    # Checks if the given type is valid
    if not valid_type(type):
        abort(400, "Type not found. Invalid Input")

    # Finds the type and account associated to the move
    account_id = Account.query.filter_by(username=username).first().id
    type_id = Type.query.filter(Type.name==type).first().id

    # Create the new move
    new_move = Move(name=name, account_id=account_id, power=power, description=description, accuracy=accuracy, pp=pp, type_id=type_id)

    # Add the move to the database
    db.session.add(new_move)
    db.session.commit()
    
def update_move(id, name, power, description, accuracy, pp, type):
    """
    Updates a Move from the database

    Updates an existing move given the parameters passed.

    Args:
        name (str): The name of the move.
        power (int): The power of the move.
        description (str): A description of the move's effects.
        accuracy (int): The accuracy of the move (0 to 100).
        pp (int): The Power Points (PP) of the move.
        type (str): The type of the move (e.g., 'fire', 'water').
    """
    # Checks if the given type is valid
    if not valid_type(type):
        abort(400, "Type not found. Invalid Input")
    
    # Finds and update the moves in the database
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
    """
    Deletes a Move entry from the database.
    Given the id of a move delete it from the database
    """
    delete_move = Move.query.filter_by(id=id).first()
    db.session.delete(delete_move)
    db.session.commit()

def valid_move(move):
    """
    Given a move name checks if the Move is found in the database.
    """
    return False if not Move.query.filter_by(name=move).first() else True