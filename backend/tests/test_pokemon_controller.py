import pytest
from flask import Flask
from unittest.mock import patch
from controllers.pokemon_controller import pokemon_bp

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(pokemon_bp)
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test the /pokemon GET endpoint
@patch("pokemon_controller.get_all_pokemons", return_value=[{"name": "Pikachu", "creator": "Ash"}])
def test_manage_pokemon(mock_get_all_pokemons, client):
    response = client.get("/pokemon?name=Pikachu&creator=Ash")
    assert response.status_code == 200
    assert response.json == [{"name": "Pikachu", "creator": "Ash"}]
    mock_get_all_pokemons.assert_called_once_with("Pikachu", "Ash", False)

# Test the /pokemon/<int:pokemon_id> GET endpoint
@patch("pokemon_controller.get_pokemon_by_id", return_value={"name": "Pikachu", "hp": 35})
def test_manage_by_id_pokemon(mock_get_pokemon_by_id, client):
    response = client.get("/pokemon/1")
    assert response.status_code == 200
    assert response.json == {"name": "Pikachu", "hp": 35}
    mock_get_pokemon_by_id.assert_called_once_with(1)

# Test the /user/pokemon POST endpoint
@patch("pokemon_controller.validate_data", return_value=(["electric"], "Pikachu", "image_url", 35, 55, 40, 50, 50, 90))
@patch("pokemon_controller.add_pokemon", return_value=1)
@patch("pokemon_controller.token_required", return_value={"username": "Ash"})
def test_manage_user_pokemon_post(mock_token_required, mock_add_pokemon, mock_validate_data, client):
    response = client.post(
        "/user/pokemon",
        json={
            "types": ["electric"],
            "name": "Pikachu",
            "image": "image_url",
            "hp": 35,
            "attack": 55,
            "defense": 40,
            "sp_attack": 50,
            "sp_defense": 50,
            "speed": 90,
        },
    )
    assert response.status_code == 200
    assert response.json == {"message": "pokemon successfully added!", "id": 1}
    mock_validate_data.assert_called_once()
    mock_add_pokemon.assert_called_once_with(
        ["electric"], "Pikachu", "image_url", "Ash", 35, 55, 40, 50, 50, 90
    )

# Test the /user/pokemon/<int:pokemon_id> DELETE endpoint
@patch("pokemon_controller.delete_pokemon", return_value=None)
@patch("pokemon_controller.token_required", return_value={"username": "Ash"})
def test_modify_delete_pokemon(mock_token_required, mock_delete_pokemon, client):
    response = client.delete("/user/pokemon/1")
    assert response.status_code == 200
    assert response.json == {"message": "pokemon successfully deleted!"}
    mock_delete_pokemon.assert_called_once_with(1)

# Test the /user/pokemon/<int:pokemon_id>/move POST endpoint
@patch("pokemon_controller.add_moves", return_value=None)
@patch("pokemon_controller.token_required", return_value={"username": "Ash"})
def test_manage_pokemon_moves_post(mock_token_required, mock_add_moves, client):
    response = client.post(
        "/user/pokemon/1/move",
        json={"moves": ["thunderbolt", "quick attack"]}
    )
    assert response.status_code == 200
    assert response.json == {"message": "move successfully added to pokemon"}
    mock_add_moves.assert_called_once_with({"moves": ["thunderbolt", "quick attack"]}, "1")