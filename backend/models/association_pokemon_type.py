from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class PokemonType(db.Model):
    """
    The PokemonType model represents the many-to-many relationship between Pokémon and Types.
    This table stores the associations of types that a specific Pokémon has.

    Attributes:
        id (int): The unique identifier for the PokemonType entry (primary key).
        pokemon_id (int): The ID of the Pokémon (foreign key referencing the `pokemon` table).
        type_id (int): The ID of the type (foreign key referencing the `type` table).

    Relationships:
        pokemon (Pokemon): The Pokémon associated with the type.
        type (Type): The type associated with the Pokémon.
    """
    __tablename__ = "pokemon_type"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    pokemon_id = mapped_column(ForeignKey("pokemon.id"), nullable=False)
    type_id = mapped_column(ForeignKey("type.id"), nullable=False)