from extensions import db
from models.account import Account
from models.type import Type
from models.pokemon import Pokemon
from models.association_pokemon_type import PokemonType
from models.move import Move
from models.association_pokemon_move import PokemonMove

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

def seed_moves():
    if not Move.query.first():
        fire_id = Type.query.filter_by(name="fire").first().id
        water_id = Type.query.filter_by(name="water").first().id
        electric_id = Type.query.filter_by(name="electric").first().id        
        ground_id = Type.query.filter_by(name="ground").first().id
        psychic_id = Type.query.filter_by(name="psychic").first().id
        ice_id = Type.query.filter_by(name="ice").first().id
        normal_id = Type.query.filter_by(name="normal").first().id
        rock_id = Type.query.filter_by(name="rock").first().id

        moves = [
            Move(name="Flamethrower", type_id=fire_id, description="A powerful fire attack that may burn the target.", accuracy=100, power=90, pp=15),
            Move(name="Hydro Pump", type_id=water_id, description="A high-pressure water attack that has a chance to miss.", accuracy=80, power=110, pp=5),
            Move(name="Thunderbolt", type_id=electric_id, description="A strong electric attack that may paralyze the target.", accuracy=100, power=90, pp=15),
            Move(name="Earthquake", type_id=ground_id, description="A powerful ground attack that damages all Pokémon in battle.", accuracy=100, power=100, pp=10),
            Move(name="Psychic", type_id=psychic_id, description="A psychic attack that may lower the target's Special Defense.", accuracy=100, power=90, pp=10),
            Move(name="Ice Beam", type_id=ice_id, description="A beam of icy energy that may freeze the target.", accuracy=100, power=90, pp=10),
            Move(name="Giga Drain", type_id=normal_id, description="A grass-type move that drains the target's energy to heal the user.", accuracy=100, power=75, pp=10),
            Move(name="Stone Edge", type_id=rock_id, description="A rock-type move that has a high critical-hit ratio.", accuracy=80, power=100, pp=5)
        ]

        db.session.add_all(moves)
        db.session.commit()

        print("Empty Move Table --> Created Moves")

def seed_pokemon():
    if not Pokemon.query.first():
        account = Account.query.first()

        # Create Pokemon
        pokemon = [
            Pokemon(name="Charmander", account_id=account.id, image="https://assets.pokemon.com/assets/cms2/img/pokedex/full//004.png", hp=78, attack=84, defense=78, sp_attack=109, sp_defense=85, speed=100),
            Pokemon(name="Charizard", account_id=account.id, image="https://assets.pokemon.com/assets/cms2/img/pokedex/full//006.png", hp=39, attack=52, defense=43, sp_attack=60, sp_defense=50, speed=65)
        ]
        db.session.add_all(pokemon)
        db.session.commit()

        # Create Pokemon Associated Typing
        fire_id = Type.query.filter_by(name="fire").first().id
        flying_id = Type.query.filter_by(name="flying").first().id

        pokemonType =[
            PokemonType(pokemon_id=pokemon[0].id, type_id=fire_id),
            PokemonType(pokemon_id=pokemon[1].id, type_id=fire_id),
            PokemonType(pokemon_id=pokemon[1].id, type_id=flying_id),
        ]

        db.session.add_all(pokemonType)
        db.session.commit()

        # Create Pokemon Associated Moves
        flamethrower_id = Move.query.filter_by(name="Flamethrower").first().id
        stoneedge_id = Move.query.filter_by(name="Stone Edge").first().id

        pokemonMoves = [
            PokemonMove(pokemon_id=pokemon[0].id, move_id=flamethrower_id),
            PokemonMove(pokemon_id=pokemon[1].id, move_id=flamethrower_id),
            PokemonMove(pokemon_id=pokemon[1].id, move_id=stoneedge_id),
        ]        
        
        db.session.add_all(pokemonMoves)
        db.session.commit()


        print("Empty Pokemon Table --> Created Pokemons")

if __name__ == "__main__":
    from app import app  # Import the app to initialize the Flask context
    with app.app_context():
        db.create_all()  # Ensure tables are created
        seed_account()
        seed_type()
        seed_moves()
        seed_pokemon()