from extensions import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

class PokemonMove(db.Model):
    """
    The PokemonMove model represents the many-to-many relationship between Pokémon and Moves.
    This table stores the associations of moves that a specific Pokémon has learned.

    Attributes:
        id (int): The unique identifier for the PokemonMove entry (primary key).
        pokemon_id (int): The ID of the Pokémon (foreign key referencing the `pokemon` table).
        move_id (int): The ID of the move (foreign key referencing the `move` table).

    Relationships:
        pokemon (Pokemon): The Pokémon associated with the move.
        move (Move): The move associated with the Pokémon.
    """
    __tablename__ = "pokemon_move"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    pokemon_id = mapped_column(ForeignKey("pokemon.id"), nullable=False)
    move_id = mapped_column(ForeignKey("move.id"), nullable=False)