from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Type(db.Model):
    """
    The Type model represents a Pokémon type (e.g., Fire, Water, Electric, etc.).
    Each Pokémon can have one or more types, and each move belongs to a specific type.
    
    Attributes:
        id (int): The unique identifier for each Type (primary key).
        name (str): The name of the type (e.g., "Fire", "Water"). Must be unique and cannot be null.
    
    Relationships:
        pokemons (list[Pokemon]): A list of Pokémon associated with this type (many-to-many).
        moves (list[Move]): A list of moves that belong to this type (one-to-many).
    """
        
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    # Relationships
    pokemons = db.relationship("Pokemon", secondary="pokemon_type", back_populates="types")
    moves: Mapped[list["Move"]] = relationship("Move", back_populates="type", cascade="all, delete-orphan")
