import pytest
from flask import Flask
from controllers.account_controller import account_bp
from unittest.mock import patch

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(account_bp)
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Mock Services
@patch("account_controller.validate_user_input", return_value=("testuser", "testpass"))
@patch("account_controller.check_account_created", return_value=None)
@patch("account_controller.Account.query.filter_by")
@patch("account_controller.verify_password", return_value=True)
@patch("account_controller.generate_token", return_value="mock_token")
def test_login_success(
    mock_generate_token, mock_verify_password, mock_query, mock_check_account, mock_validate_input, client
):
    # Mock Account Query
    mock_account = type("MockAccount", (object,), {"hashed_password": "hashed", "salt": "salt"})
    mock_query.return_value.first.return_value = mock_account

    response = client.post("/login", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert response.json == {"token": "mock_token"}

@patch("account_controller.validate_user_input", return_value=("testuser", "testpass"))
@patch("account_controller.check_account_created", side_effect=Exception("User exists"))
def test_register_user_exists(mock_check_account, mock_validate_input, client):
    response = client.post("/register", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 500  # Assuming exception is returned as a 500 error
    assert "User exists" in response.get_data(as_text=True)