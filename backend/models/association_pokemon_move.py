from extensions import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

class PokemonMove(db.Model):
    __tablename__ = "pokemon_move"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    pokemon_id = mapped_column(ForeignKey("pokemon.id"), nullable=False)
    move_id = mapped_column(ForeignKey("move.id"), nullable=False)