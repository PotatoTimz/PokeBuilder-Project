from models.pokemon import Pokemon
from models.pokemontype import PokemonType
from models.type import Type
from models.account import Account

from services.type_service import valid_type

from extensions import db
from flask import abort
from sqlalchemy import func

def get_all_pokemons():
    return (db.session.query(Pokemon, Account, PokemonType, Type)
              .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), func.group_concat(Type.name).label("types"), Pokemon.image)
              .join(Account)
              .join(PokemonType)
              .join(Type)
              .group_by(Pokemon.name).all())

def get_pokemon_by_id(id):
    return (db.session.query(Pokemon, Account, PokemonType, Type)
        .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), func.group_concat(Type.name).label("types"), Pokemon.image)
        .join(Account)
        .join(PokemonType)
        .join(Type)
        .filter(Pokemon.id == id)
        .group_by(Pokemon.name).first())

def get_pokemon_by_user(account_id):
    if isinstance(account_id, str):
        account_id = Account.query.filter_by(username=account_id).first().id
    
    return (db.session.query(Pokemon, Account, PokemonType, Type)
            .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), func.group_concat(Type.name).label("types"), Pokemon.image)
            .join(Account)
            .join(PokemonType)
            .join(Type)
            .filter(Account.id == account_id)
            .group_by(Pokemon.name).all())

def validate_data(data):
    if not data or not data.get("types") or not data.get("name") or not data.get("image"):
        abort(400, "Invalid Input!")
    
    types, name, image = data.get("types"), data.get("name"), data.get("image")
    return types, name, image

def add_pokemon(types, name, image, username):

    # Check if all given types are valid
    for type in types:
        if not valid_type(type):
            abort(400, type, "not found")

    account_id = Account.query.filter_by(username=username).first().id

    new_pokemon = Pokemon(name=name, account_id=account_id, image=image)
    db.session.add(new_pokemon)
    db.session.commit()

    pokemonType = []
    for type in types:
        type_id = Type.query.filter_by(name=type).first().id
        pokemonType.append(PokemonType(pokemon_id=new_pokemon.id, type_id=type_id))
    
    db.session.add_all(pokemonType)
    db.session.commit()

def is_created_by_user(pokemon_id, username):
    account_id = Account.query.filter_by(username=username).first().id
    pokemon_account_id = Pokemon.query.filter_by(id=pokemon_id).first().account_id

    return True if account_id == pokemon_account_id else False

def update_pokemon(types, name, image, pokemon_id): 
    for type in types:
        if not valid_type(type):
            abort(400, type, "not found")

    updated_pokemon = Pokemon.query.filter_by(id=pokemon_id).first()
    updated_pokemon.name = name
    updated_pokemon.image = image
    db.session.commit()
    
    pokemon_types = PokemonType.query.filter_by(pokemon_id=pokemon_id).all()

    for pokemon_type in pokemon_types:
        db.session.delete(pokemon_type)
    db.session.commit()

    pokemonType = []
    for type in types:
        type_id = Type.query.filter_by(name=type).first().id
        pokemonType.append(PokemonType(pokemon_id=updated_pokemon.id, type_id=type_id))
    
    db.session.add_all(pokemonType)
    db.session.commit()


def delete_pokemon(pokemon_id):
    delete_pokemon = Pokemon.query.filter_by(id=pokemon_id).first()
    db.session.delete(delete_pokemon)
    db.session.commit()
