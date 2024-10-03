from extensions import db

if __name__ == "__main__":
    from app import app  # Import the app to initialize the Flask context
    with app.app_context():
        db.create_all()  # Ensure tables are created
