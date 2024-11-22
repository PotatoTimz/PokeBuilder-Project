import pytest
from flask import Flask
from unittest.mock import patch
from controllers.types_controller import type_bp

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(type_bp)
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test the /type GET endpoint
@patch("types_controller.get_all_types", return_value=[{"name": "Fire"}, {"name": "Water"}])
def test_manage_types_get(mock_get_all_types, client):
    response = client.get("/type")
    assert response.status_code == 200
    assert response.json == [{"name": "Fire"}, {"name": "Water"}]
    mock_get_all_types.assert_called_once()

# Test the /type POST endpoint
@patch("types_controller.validate_data", return_value="Electric")
@patch("types_controller.create_type", return_value={"message": "Type successfully created!"})
def test_manage_types_post(mock_create_type, mock_validate_data, client):
    response = client.post("/type", json={"name": "Electric"})
    assert response.status_code == 200
    assert response.json == {"message": "Type successfully created!"}
    mock_validate_data.assert_called_once_with({"name": "Electric"})
    mock_create_type.assert_called_once_with("Electric")