from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Move(db.Model):
    """
    The Move model represents a move (such as an attack or ability) that can be learned by Pokémon.
    This model stores information about the move itself, its type, its creator, and the Pokémon
    that can learn it.

    Attributes:
        id (int): Unique identifier for the move (primary key).
        name (str): Name of the move, which must be unique.
        power (int): The power of the move, a numeric value.
        description (str): A description of the move's effect.
        accuracy (int): The accuracy of the move as a percentage (0 to 100).
        pp (int): The number of times the move can be used before needing to be restored (Power Points).
        type_id (int): Foreign key referencing the `type` table to associate the move with a type.
        account_id (int): Foreign key referencing the `account` table to identify the move's creator.
    
    Relationships:
        account (Account): The account that created this move (one-to-many).
        type (Type): The type of this move (many-to-one).
        pokemons (Pokemon): The Pokémon that can learn this move (many-to-many through `pokemon_move`).
    """
    __tablename__= "move"

    id: Mapped[int] = mapped_column(primary_key=True) 
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    power: Mapped[int] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=False)
    accuracy: Mapped[int] = mapped_column(nullable=True)
    pp: Mapped[int] = mapped_column(nullable=False)

    # Foreign key linking to account and type
    type_id: Mapped[int] = mapped_column(ForeignKey("type.id"), nullable=False)
    account_id: Mapped[int] = mapped_column(ForeignKey('account.id'), nullable=False)

    # relationships
    account: Mapped["Account"] = relationship("Account", back_populates="moves")
    type: Mapped["Type"] = relationship("Type", back_populates="")
    pokemons = db.relationship("Pokemon", secondary="pokemon_move", back_populates="moves")

    