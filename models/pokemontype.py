from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class PokemonType(db.Model):
    __tablename__ = "pokemon_type"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    pokemon_id = mapped_column(ForeignKey("pokemon.id"), nullable=False)
    type_id = mapped_column(ForeignKey("type.id"), nullable=False)