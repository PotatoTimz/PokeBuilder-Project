import bcrypt

# Pepper used to defntriate passwords further
PEPPER = b"supersecretpepper"

def hash_password(password):
    """
    Encrtypt a given password with salt and pepper.
    Return the the newly decrypted password and salt.
    """
    salt = bcrypt.gensalt()
    password_with_pepper = password.encode("utf-8") + PEPPER
    hashed_password = bcrypt.hashpw(password_with_pepper, salt)

    return hashed_password, salt

def verify_password(entered_password, stored_hashed_password, stored_salt):
    """
    Encrypt the given password and compare it to the stored password.
    Returns the result of the comparison.
    """
    entered_password_with_pepper = entered_password.encode("utf-8") + PEPPER
    hashed_entered_password = bcrypt.hashpw(entered_password_with_pepper, stored_salt)
    return hashed_entered_password == stored_hashed_password