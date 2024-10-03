from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Pokemon(db.Model):
    __tablename__ = "pokemon"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    creator: Mapped[int]
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    
    # Foreign key linking to account
    account_id: Mapped[int] = mapped_column(ForeignKey('account.id'), nullable=False)

    # Relationships
    account: Mapped["Account"] = relationship("Account", back_populates="pokemons")
    types = db.relationship("Type", secondary='pokemon_type')
    #types = relationship("Type", secondary="pokemon_type")

