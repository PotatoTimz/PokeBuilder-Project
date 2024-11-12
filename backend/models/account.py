from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

class Account(db.Model):
    """
    The Account model represents the users of the system. Each Account can have multiple
    associated Pokémon and moves that it has created.

    Attributes:
        id (int): The unique identifier for the account (primary key).
        username (str): The username of the account (unique and non-nullable).
        hashed_password (str): The hashed password for the account (non-nullable).
        salt (str): The salt used to hash the password (nullable).
        pokemons (list[Pokemon]): The list of Pokémon created by this account (one-to-many).
        moves (list[Move]): The list of moves created by this account (one-to-many).
    """
    __tablename__ = "account"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    username: Mapped[str] = mapped_column(nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(200), nullable=True)

    # one-to-many relationship (one account can create multiple pokemon)
    pokemons: Mapped[list["Pokemon"]] = relationship("Pokemon", back_populates="account", cascade="all, delete-orphan")
    # one-to-many relationship (one account can create multiple moves)
    moves: Mapped[list["Move"]] = relationship("Move", back_populates="account", cascade="all, delete-orphan")