from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Type(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    # Relationships
    pokemons = db.relationship("Pokemon", secondary="pokemon_type", back_populates="types")