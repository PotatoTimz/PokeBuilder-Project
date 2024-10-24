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

    movelists = db.relationship("MoveList", secondary="movelist_move", back_populates="moves")

    