from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey

class MoveList(db.Model):
    __tablename__ = "movelist"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    
    moves = db.relationship("Move", secondary='movelist_move', back_populates="movelists")
