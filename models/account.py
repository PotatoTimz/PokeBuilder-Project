from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String

class Account(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True) 
    username: Mapped[str] = mapped_column(nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(200), nullable=True)

    