from extensions import db
from models.account import Account
from models.type import Type
from models.pokemon import Pokemon
from models.pokemontype import PokemonType

from services.account_service import create_account
from services.hashing_service import hash_password
from sqlalchemy import func

def seed_account():
    if not Account.query.first():
        hash_password1, salt1 = hash_password("password1")
        hash_password2, salt2 = hash_password("password2")
        accounts = [
            Account(username="account1", hashed_password=hash_password1, salt=salt1),
            Account(username="account2", hashed_password=hash_password2, salt=salt2)
        ]

        db.session.add_all(accounts)
        db.session.commit()
        print("Empty Account Table --> Created Accounts")

def seed_type():
    if not Type.query.first():
        types = [
            Type(name="normal"),
            Type(name="fighting"),
            Type(name="flying"),
            Type(name="poison"),
            Type(name="ground"),
            Type(name="rock"),
            Type(name="bug"),
            Type(name="ghost"),
            Type(name="steel"),
            Type(name="fire"),
            Type(name="water"),
            Type(name="grass"),
            Type(name="electric"),
            Type(name="psychic"),
            Type(name="ice"),
            Type(name="dragon"),
            Type(name="dark"),
            Type(name="fairy"),
        ]

        db.session.add_all(types)
        db.session.commit()
        print("Empty Type Table --> Created Types")

def seed_pokemon():
    if not Pokemon.query.first():
        account = Account.query.first()
        pokemon = [
            Pokemon(name="Charmander", account_id=account.id, image="https://assets.pokemon.com/assets/cms2/img/pokedex/full//004.png"),
            Pokemon(name="Charizard", account_id=account.id, image="https://assets.pokemon.com/assets/cms2/img/pokedex/full//006.png")
        ]
        db.session.add_all(pokemon)
        db.session.commit()

        fire_id = Type.query.filter_by(name="fire").first().id
        flying_id = Type.query.filter_by(name="flying").first().id

        pokemonType =[
            PokemonType(pokemon_id=pokemon[0].id, type_id=fire_id),
            PokemonType(pokemon_id=pokemon[1].id, type_id=fire_id),
            PokemonType(pokemon_id=pokemon[1].id, type_id=flying_id),
        ]

        db.session.add_all(pokemonType)
        db.session.commit()

        print("Empty Pokemon Table --> Created Pokemons")


if __name__ == "__main__":
    from app import app  # Import the app to initialize the Flask context
    with app.app_context():
        db.create_all()  # Ensure tables are created
        seed_account()
        seed_type()
        seed_pokemon()
        
        #.query.join(Account, Account.id == Pokemon.id, isouter=True))
        # print(db.session.query(Pokemon, Account)
        #       .filter(Pokemon.account_id == Account.id).join) 

        print(db.session.query(Pokemon, Account, PokemonType, Type)
              .with_entities(Pokemon.id, Pokemon.name, Account.username.label("creator"), func.group_concat(Type.name).label("types"), Pokemon.image)
              .join(Account)
              .join(PokemonType)
              .join(Type)
              .group_by(Pokemon.name)
              ) 