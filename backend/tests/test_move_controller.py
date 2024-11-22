import pytest
from flask import Flask
from unittest.mock import patch
from controllers.move_controller import move_bp

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(move_bp)
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test the /move GET endpoint
@patch("move_controller.get_all_moves", return_value=[{"name": "Tackle", "power": 40}])
def test_manage_moves(mock_get_all_moves, client):
    response = client.get("/move?name=Tackle&creator=Ash")
    assert response.status_code == 200
    assert response.json == [{"name": "Tackle", "power": 40}]
    mock_get_all_moves.assert_called_once_with("Tackle", "Ash")

# Test the /user/move POST endpoint
@patch("move_controller.validate_data", return_value=("Tackle", 40, "Basic attack", 100, 35, "Normal"))
@patch("move_controller.add_move", return_value=None)
@patch("move_controller.token_required", return_value={"username": "Ash"})
def test_manage_user_move_post(mock_token_required, mock_add_move, mock_validate_data, client):
    response = client.post(
        "/user/move",
        json={
            "name": "Tackle",
            "power": 40,
            "description": "Basic attack",
            "accuracy": 100,
            "pp": 35,
            "type": "Normal"
        },
    )
    assert response.status_code == 201
    assert response.json == {"message": "move successfully added!"}
    mock_validate_data.assert_called_once()
    mock_add_move.assert_called_once_with("Tackle", 40, "Basic attack", 100, 35, "Normal", "Ash")

# Test the /user/move/<int:move_id> DELETE endpoint
@patch("move_controller.delete_move", return_value=None)
@patch("move_controller.token_required", return_value={"username": "Ash"})
def test_modify_delete_move(mock_token_required, mock_delete_move, client):
    response = client.delete("/user/move/1")
    assert response.status_code == 200
    assert response.json == {"message": "successfully deleted move!"}
    mock_delete_move.assert_called_once_with(1)

# Test the /move/<int:move_id> GET endpoint
@patch("move_controller.get_move_by_id", return_value={"name": "Tackle", "power": 40})
def test_manage_moves_by_id(mock_get_move_by_id, client):
    response = client.get("/move/1")
    assert response.status_code == 200
    assert response.json == {"name": "Tackle", "power": 40}
    mock_get_move_by_id.assert_called_once_with(1)