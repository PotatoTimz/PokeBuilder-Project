from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Move(db.Model):
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

    