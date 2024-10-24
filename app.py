import sys

from flask import Flask
from extensions import db, migrate
from config import Config

from controllers.account_controller import account_bp
from controllers.test_controller import test_bp
from controllers.types_controller import type_bp
from controllers.pokemon_controller import pokemon_bp

sys.dont_write_bytecode = True

def create_app():
    app = Flask(__name__)
    
    app.config.from_object(Config)  # Load configuration from Config class

    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(account_bp)
    app.register_blueprint(test_bp)
    app.register_blueprint(type_bp)
    app.register_blueprint(pokemon_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
    