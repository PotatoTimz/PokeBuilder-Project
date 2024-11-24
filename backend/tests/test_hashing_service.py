import pytest
from services.hashing_service import hash_password, verify_password
import bcrypt

# Test hash_password function
def test_hash_password():
    password = "mypassword123"
    hashed_password, salt = hash_password(password)
    
    assert isinstance(hashed_password, bytes)
    assert isinstance(salt, bytes)
    assert bcrypt.checkpw((password + "supersecretpepper").encode("utf-8"), hashed_password)

# Test verify_password function
def test_verify_password_success():
    password = "mypassword123"
    hashed_password, salt = hash_password(password)
    result = verify_password(password, hashed_password, salt)
    assert result is True

def test_verify_password_failure():
    correct_password = "mypassword123"
    wrong_password = "wrongpassword123"
    hashed_password, salt = hash_password(correct_password)
    result = verify_password(wrong_password, hashed_password, salt)
    assert result is False