from models.pokemon import Pokemon
from models.pokemontype import PokemonType
from models.type import Type
from models.account import Account

from services.type_service import valid_type

from extensions import db
from flask import request, jsonify, current_app, abort
from sqlalchemy import func

def get_all_pokemons():
    return (db.session.query(Pokemon, Account, PokemonType, Type)
              .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), func.group_concat(Type.name).label("types"), Pokemon.image)
              .join(Account)
              .join(PokemonType)
              .join(Type)
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
    
    return jsonify({"message": "pokemon successfully added!"})