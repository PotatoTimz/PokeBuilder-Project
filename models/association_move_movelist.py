from extensions import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey

class MoveListMove(db.Model):
    __tablename__ = "movelist_move"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    movelist_id = mapped_column(ForeignKey("movelist.id"), nullable=False)
    move_id = mapped_column(ForeignKey("move.id"), nullable=False)