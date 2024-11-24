import pytest
import jwt
from unittest.mock import patch, MagicMock
from services.jwt_token_service import generate_token, token_required
from flask import Flask, jsonify

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "testsecret"
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test generate_token function
def test_generate_token(app):
    username = "testuser"
    with app.app_context():
        token = generate_token(username)
        assert isinstance(token, str)

# Test token_required decorator with valid token
@patch("jwt_token_service.jwt.decode")
@patch("jwt_token_service.Account.query.filter_by")
def test_token_required_valid(mock_filter_by, mock_jwt_decode, app, client):
    mock_jwt_decode.return_value = {"username": "testuser"}
    mock_filter_by.return_value.first.return_value = MagicMock(username="testuser")

    @token_required
    def protected_route(current_user):
        return jsonify({"message": f"Welcome, {current_user.username}!"})

    with app.test_request_context(headers={"Authorization": "Bearer valid_token"}):
        response = protected_route()
        assert response.status_code == 200
        assert response.json == {"message": "Welcome, testuser"}

# Test token_required decorator with missing token
def test_token_required_missing_token(app):
    @token_required
    def protected_route(current_user):
        return jsonify({"message": f"Welcome, {current_user.username}!"})

    with app.test_request_context(headers={}):
        response = protected_route()
        assert response.status_code == 403
        assert response.json == {"message": "Token is missing!"}

# Test token_required decorator with expired token
@patch("jwt_token_service.jwt.decode")
def test_token_required_expired_token(mock_jwt_decode, app):
    mock_jwt_decode.side_effect = jwt.ExpiredSignatureError

    @token_required
    def protected_route(current_user):
        return jsonify({"message": f"Welcome, {current_user.username}!"})

    with app.test_request_context(headers={"Authorization": "Bearer expired_token"}):
        response = protected_route()
        assert response.status_code == 403
        assert response.json == {"message": "Token has expired!"}

# Test token_required decorator with invalid token
@patch("jwt_token_service.jwt.decode")
def test_token_required_invalid_token(mock_jwt_decode, app):
    mock_jwt_decode.side_effect = jwt.InvalidTokenError("Invalid token")

    @token_required
    def protected_route(current_user):
        return jsonify({"message": f"Welcome, {current_user.username}!"})

    with app.test_request_context(headers={"Authorization": "Bearer invalid_token"}):
        response = protected_route()
        assert response.status_code == 403
        assert response.json == {"message": "Invalid or expired token! Invalid token"}