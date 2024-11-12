import os

class Config:
    """
    Create the database and links it to the SQLAlchemy URI
    """
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///pokemon.db'  # Or another DB URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False
