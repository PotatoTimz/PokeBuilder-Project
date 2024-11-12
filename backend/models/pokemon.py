from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Pokemon(db.Model):
    """
    The Pokemon model represents a Pokémon in the game. It includes information 
    about the Pokémon's attributes (like stats, name, and image), the account 
    that created the Pokémon, and the types and moves that the Pokémon possesses.

    Attributes:
        id (int): The unique identifier for each Pokémon (primary key).
        name (str): The name of the Pokémon, which must be unique.
        image (str): A URL or image path representing the Pokémon's image.
        hp (int): Health points of the Pokémon.
        attack (int): Attack stat of the Pokémon.
        defense (int): Defense stat of the Pokémon.
        sp_attack (int): Special attack stat of the Pokémon.
        sp_defense (int): Special defense stat of the Pokémon.
        speed (int): Speed stat of the Pokémon.
        account_id (int): The ID of the account that created the Pokémon (foreign key to `account`).
    
    Relationships:
        account (Account): The account that created this Pokémon (many-to-one).
        types (Type): The types associated with the Pokémon (many-to-many through `pokemon_type`).
        moves (Move): The moves that the Pokémon can learn (many-to-many through `pokemon_move`).
    """
    
    __tablename__ = "pokemon"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    image: Mapped[str] = mapped_column(default="https://static.vecteezy.com/system/resources/thumbnails/022/493/595/small_2x/3d-question-mark-icon-or-ask-faq-answer-solution-isolated-on-transparent-background-file-png.png")

    hp: Mapped[int] = mapped_column(nullable=False)
    attack: Mapped[int] = mapped_column(nullable=False)
    defense: Mapped[int] = mapped_column(nullable=False)
    sp_attack: Mapped[int] = mapped_column(nullable=False)
    sp_defense: Mapped[int] = mapped_column(nullable=False)
    speed: Mapped[int] = mapped_column(nullable=False)

    # Foreign key linking to account
    account_id: Mapped[int] = mapped_column(ForeignKey('account.id'), nullable=False)

    # Relationships
    account: Mapped["Account"] = relationship("Account", back_populates="pokemons")
    types = db.relationship("Type", secondary='pokemon_type', back_populates="pokemons")
    moves = db.relationship("Move", secondary='pokemon_move', back_populates="pokemons")
    #types = relationship("Type", secondary="pokemon_type")

