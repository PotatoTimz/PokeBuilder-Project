from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class Pokemon(db.Model):
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

