from extensions import db
from models.account import Account
from services.account_service import create_account
from services.hashing_service import hash_password

def seed_account():
    if not Account.query.first():
        hash_password1, salt1 = hash_password("password1")
        hash_password2, salt2 = hash_password("password2")
        
        account1 = Account(username="account1", hash_password=hash_password1, salt=salt1)
        account2 = Account(username="account2", hash_password=hash_password2, salt=salt2)


if __name__ == "__main__":
    from app import app  # Import the app to initialize the Flask context
    with app.app_context():
        db.create_all()  # Ensure tables are created
