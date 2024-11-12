from models.pokemon import Pokemon
from models.association_pokemon_type import PokemonType
from models.association_pokemon_move import PokemonMove
from models.type import Type
from models.account import Account
from models.move import Move

from services.type_service import valid_type
from services.move_service import valid_move

from extensions import db
from flask import abort
from sqlalchemy import func

def get_all_pokemons(name, creator, checkUser):
    """
    Retrieves all Pokemon filtered by the specified name and creator.
    Function can be filtered to be stricter on user checker.

    Queries Pokemon table to retrieve all pokemon whos names match the given
    "name" and "creator" parameters. Returning a JSON containing information 
    of all the queried pokemons.

    Args:
        name (str): The name or partial name of the move to filter.
        creator (str): The username or partial username of the creator to filter.
        checkUser(boolean): Check to see if strict creator search is on

    Returns:
        tuple: A JSON response containg a list of pokemons that match the filters,
               with their association details and a 200 HTTP status code.
    """
    # Strict search off
    if not checkUser:
        pokemons = (db.session.query(Pokemon, Account, PokemonType, Type)
                            .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), Pokemon.image, Pokemon.hp, Pokemon.attack, Pokemon.defense, Pokemon.sp_attack, Pokemon.sp_defense, Pokemon.speed)
                            .filter(Pokemon.name.like(name + "%"))
                            .join(Account)
                            .filter(Account.username.like(creator + "%"))
                            .join(PokemonType)
                            .group_by(Pokemon.name)
                            .order_by(Pokemon.id)
                            .all()
                )
    # Strict search on
    else:
        pokemons = (db.session.query(Pokemon, Account, PokemonType, Type)
                    .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), Pokemon.image, Pokemon.hp, Pokemon.attack, Pokemon.defense, Pokemon.sp_attack, Pokemon.sp_defense, Pokemon.speed)
                    .filter(Pokemon.name.like(name + "%"))
                    .join(Account)
                    .filter(Account.username == creator)
                    .join(PokemonType)
                    .group_by(Pokemon.name)
                    .order_by(Pokemon.id)
                    .all()
        )

    pokemon_data = (
        [
            {
                "pokemon_id": pokemon[0], 
                "pokemon_name": pokemon[1],
                "creator": pokemon[2],
                "pokemon_image": pokemon[3],
                "pokemon_types": [
                    {
                        "type_id": type.id,
                        "name": type.name
                    }
                    for type in db.session.query(Type).join(PokemonType).join(Pokemon).filter(PokemonType.pokemon_id==pokemon[0]).all()
                    ],
            } for pokemon in pokemons
        ]
    )
    return pokemon_data 

def get_pokemon_by_id(id):
    """
    Retrieves a single Pokemon by its ID.
    Queries the Pokemon table and fetches the Pokemon associated to the given id.
    """
    pokemon = (db.session.query(Pokemon, Account, PokemonType, Type)
                        .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), Pokemon.image, Pokemon.hp, Pokemon.attack, Pokemon.defense, Pokemon.sp_attack, Pokemon.sp_defense, Pokemon.speed)
                        .filter(Pokemon.id == id)
                        .join(Account)
                        .first()
              )

    pokemon_data = (
        {
            "pokemon_id": pokemon[0], 
            "pokemon_name": pokemon[1],
            "creator": pokemon[2],
            "pokemon_image": pokemon[3],
            "base_stats":{
                "hp": pokemon[4],
                "attack": pokemon[5],
                "defense": pokemon[6],
                "sp_attack": pokemon[7],
                "sp_defense": pokemon[8],
                "speed": pokemon[9],
            },
            "pokemon_types": [{
                    "type_id": type.id,
                    "name": type.name
                }
                for type in db.session.query(Type).join(PokemonType).join(Pokemon).filter(PokemonType.pokemon_id==id).all()
                ],
            "pokemon_moves": [
                {
                    "move_id": move.id,
                    "move_name": move.name,
                    "move_power": move.power,
                    "move_description": move.description,
                    "move_accuracy": move.accuracy,
                    "move_pp": move.pp,
                    "type":{
                        "type_id": move.type_id,
                        "name": db.session.query(Type).filter(Type.id==move.type_id).first().name
                    }
                }
                for move in db.session.query(Move).join(PokemonMove).join(Pokemon).filter(PokemonMove.pokemon_id==id).all()
            ]
        } 
    )

    return pokemon_data

def validate_data(data):
    """
    Validates the user input data.
    Checks if the required parameters of a Pokemon was given.

    Args:
        data (dict): A dictionary containing the user input. Expected to have 
                     keys 'name', 'types', 'hp', 'attack', 'defense', 'sp_attack',
                     'sp_defense' and 'speed'.
    """
    if not data or not data.get("types") or not data.get("name") or not data.get("image") or not data.get("hp") or not data.get("attack") or not data.get("defense") or not data.get("sp_attack") or not data.get("sp_defense") or not data.get("speed"):
        abort(400, "Invalid Input!")
    
    types, name, image, hp, attack, defense, sp_attack, sp_defense, speed = data.get("types"), data.get("name"), data.get("image"), data.get("hp"), data.get("attack"), data.get("defense"), data.get("sp_attack"), data.get("sp_defense"), data.get("speed")
    return types, name, image, hp, attack, defense, sp_attack, sp_defense, speed

def add_pokemon(types, name, image, username, hp, attack, defense, sp_attack, sp_defense, speed):
    """
    Adds a new Pokemon to the database.

    Creates a new Pokemon given the needed parameters. Associating
    the Pokemon to the given Type. Once compelted adds the Pokemon to 
    the database.

    Args:
        types (list): A list of type names (e.g., ['fire', 'flying']).
        name (str): The name of the Pokémon.
        image (str): A URL to an image of the Pokémon.
        username (str): The username of the account creating the Pokémon.
        hp (int): The Pokémon's health points.
        attack (int): The Pokémon's attack stat.
        defense (int): The Pokémon's defense stat.
        sp_attack (int): The Pokémon's special attack stat.
        sp_defense (int): The Pokémon's special defense stat.
        speed (int): The Pokémon's speed stat.

    Returns:
        int: The ID of the newly created Pokémon.
    """

    # Check if the type(s) is valid
    for type in types:
        if type != "":
            if not valid_type(type):
                abort(400, "Type not found")

    # Finds the account associated to the account
    account_id = Account.query.filter_by(username=username).first().id

    # Creates the pokemon and adds it to the database
    new_pokemon = Pokemon(name=name, account_id=account_id, image=image, hp=hp, attack=attack, defense=defense, sp_attack=sp_attack, sp_defense=sp_defense, speed=speed)
    db.session.add(new_pokemon)
    db.session.commit()
    
    # Adds association between types and new pokemon and add it to the database
    pokemonType = []
    for type in types:
        if type != "":
            type_id = Type.query.filter_by(name=type).first().id
            pokemonType.append(PokemonType(pokemon_id=new_pokemon.id, type_id=type_id))
    
    db.session.add_all(pokemonType)
    db.session.commit()

    # Return the new pokemon id
    return new_pokemon.id

def is_created_by_user(pokemon_id, username):
    """
    Checks if given pokemon is associated the given username
    """
    account_id = Account.query.filter_by(username=username).first().id
    pokemon_account_id = Pokemon.query.filter_by(id=pokemon_id).first().account_id

    return True if account_id == pokemon_account_id else False

def update_pokemon(types, name, image, pokemon_id, hp, attack, defense, sp_attack, sp_defense, speed): 
    """
    Updates a Pokemon fromthe database

    Updates an existing Pokemon given the parameters passed.

    Args:
        types (list): A list of type names (e.g., ['fire', 'flying']).
        name (str): The name of the Pokémon.
        image (str): A URL to an image of the Pokémon.
        username (str): The username of the account creating the Pokémon.
        hp (int): The Pokémon's health points.
        attack (int): The Pokémon's attack stat.
        defense (int): The Pokémon's defense stat.
        sp_attack (int): The Pokémon's special attack stat.
        sp_defense (int): The Pokémon's special defense stat.
        speed (int): The Pokémon's speed stat.    
    """
    # Checks if type(s) given are valid
    for type in types:
        if type != "":
            if not valid_type(type):
                abort(400, "Type not found")

    # Update pokemon info
    updated_pokemon = Pokemon.query.filter_by(id=pokemon_id).first()
    updated_pokemon.name = name
    updated_pokemon.image = image
    updated_pokemon.hp = hp
    updated_pokemon.attack = attack
    updated_pokemon.defense = defense
    updated_pokemon.sp_attack = sp_attack
    updated_pokemon.sp_defense = sp_defense
    updated_pokemon.speed = speed
    db.session.commit()

    # Get an update Pokemon Type association
    pokemon_types = PokemonType.query.filter_by(pokemon_id=pokemon_id).all()
    for pokemon_type in pokemon_types:
        db.session.delete(pokemon_type)
    db.session.commit()
    pokemonType = []
    for type in types:
            if type != "":
                type_id = Type.query.filter_by(name=type).first().id
                pokemonType.append(PokemonType(pokemon_id=updated_pokemon.id, type_id=type_id))
    db.session.add_all(pokemonType)
    db.session.commit()


def delete_pokemon(pokemon_id):
    """
    Delete a Pokemon entry from the database.
    Given the id of a Pokemon delete it from the database
    """
    delete_pokemon = Pokemon.query.filter_by(id=pokemon_id).first()
    db.session.delete(delete_pokemon)
    db.session.commit()

def add_moves(data, pokemon_id):
    """
    Adds a move to a Pokemon

    This function associates a move with a Pokémon by creating a new record in the 
    PokemonMove table. The function checks if the provided move is valid and if the
    Pokémon exists. Once valid, the Pokémon is linked with the move.    
   
    Args:
        data (dict): A dictionary containing the move name (e.g., {"move": "Flamethrower"}).
        pokemon_id (int): The ID of the Pokémon to which the move should be added.
    """
    # Checks if user input is valid
    if not data or not data.get("move"):
        abort(400, "Invalid Input!")
    move_name = data.get("move")

    # Check if all given moves are valid
    if not valid_move(move_name):
        abort(400, "Type not found")

    # Creates a new association between a move and a pokemon
    move_id = Move.query.filter_by(name=move_name).first().id
    pokemonMove = PokemonMove(pokemon_id=pokemon_id, move_id=move_id)

    db.session.add(pokemonMove)
    db.session.commit()

def remove_move(data, pokemon_id):
    """
    Deletes a move from a Pokemon

    Disassociates a move from a Pokemon. The function checks if the given move
    is valid and if he Pokemon exists. If it does the move will be disassociated
    from the pokemon

    Args:
        data (dict): A dictionary containing the move name (e.g., {"move": "Flamethrower"}).
        pokemon_id (int): The ID of the Pokémon to which the move should be added.
    """
    # Validates user input
    if not data or not data.get("move"):
        abort(400, "Invalid Input!")
    move_name = data.get("move")

    # Gets PokemonMove association and deletes it
    move_id = Move.query.filter_by(name=move_name).first().id
    delete_move = PokemonMove.query.filter_by(pokemon_id=pokemon_id).filter_by(move_id=move_id).first()

    # If the association was not found return error
    if not delete_move:
        abort(400, "Pokemon does not have this move!")
    
    db.session.delete(delete_move)
    db.session.commit()
