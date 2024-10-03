import bcrypt

PEPPER = b"supersecretpepper"

def hash_password(password):
    salt = bcrypt.gensalt()
    password_with_pepper = password.encode("utf-8") + PEPPER
    hashed_password = bcrypt.hashpw(password_with_pepper, salt)

    return hashed_password, salt

def verify_password(entered_password, stored_hashed_password, stored_salt):
    entered_password_with_pepper = entered_password.encode("utf-8") + PEPPER
    hashed_entered_password = bcrypt.hashpw(entered_password_with_pepper, stored_salt)
    return hashed_entered_password == stored_hashed_password