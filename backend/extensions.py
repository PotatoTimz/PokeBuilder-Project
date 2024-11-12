# extensions.py
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initializes the Database and Migrations.
db = SQLAlchemy()
migrate = Migrate()