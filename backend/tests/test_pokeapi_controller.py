import pytest
from flask import Flask
from unittest.mock import patch
from controllers.pokeapi_controller import pokeapi_bp

# Setup Flask app for testing
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(pokeapi_bp)
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

# Test the /pokeapi/pokemon/<string:pokemon> endpoint
@patch("pokeapi_controller.requests.get")
def test_get_pokemon_info(mock_requests_get, client):
    mock_requests_get.return_value.json.return_value = {
        "name": "pikachu",
        "sprites": {
            "other": {
                "official-artwork": {
                    "front_default": "https://image.url/pikachu.png"
                }
            }
        },
        "stats": [
            {"base_stat": 35},  # HP
            {"base_stat": 55},  # Attack
            {"base_stat": 40},  # Defense
            {"base_stat": 50},  # Sp. Attack
            {"base_stat": 50},  # Sp. Defense
            {"base_stat": 90},  # Speed
        ],
        "types": [{"type": {"name": "electric"}}]
    }

    response = client.get("/pokeapi/pokemon/pikachu")
    assert response.status_code == 200
    assert response.json == {
        "pokemon_name": "pikachu",
        "creator": "The Pokemon Company",
        "pokemon_image": "https://image.url/pikachu.png",
        "base_stats": {
            "hp": 35,
            "attack": 55,
            "defense": 40,
            "sp_attack": 50,
            "sp_defense": 50,
            "speed": 90
        },
        "pokemon_types": [{"name": "electric"}]
    }

# Test the /pokeapi/pokemon/<string:pokemon>/typechart endpoint
@patch("pokeapi_controller.requests.get")
@patch("pokeapi_controller.get_pokemon_by_id")
def test_get_pokemon_typechart(mock_get_pokemon_by_id, mock_requests_get, client):
    mock_get_pokemon_by_id.return_value = {
        "pokemon_types": [{"name": "electric"}]
    }
    mock_requests_get.return_value.json.return_value = {
        "damage_relations": {
            "double_damage_from": [{"name": "ground"}],
            "half_damage_from": [{"name": "flying"}],
            "no_damage_from": []
        }
    }

    response = client.get("/pokeapi/pokemon/pikachu/typechart")
    assert response.status_code == 200
    assert response.json == {
        "type_chart": {
            "0": [],
            "1/4": [],
            "1/2": ["flying"],
            "1": [],
            "2": ["ground"],
            "4": []
        }
    }

# Test the /pokeapi/move/<string:move> endpoint
@patch("pokeapi_controller.requests.get")
def test_get_move_info(mock_requests_get, client):
    mock_requests_get.return_value.json.return_value = {
        "name": "thunderbolt",
        "accuracy": 100,
        "flavor_text_entries": [{"flavor_text": "A strong electric attack that may paralyze the foe."}],
        "power": 90,
        "pp": 15,
        "type": {"name": "electric"}
    }

    response = client.get("/pokeapi/move/thunderbolt")
    assert response.status_code == 200
    assert response.json == {
        "move_name": "thunderbolt",
        "move_accuracy": 100,
        "move_description": "A strong electric attack that may paralyze the foe.",
        "move_power": 90,
        "move_pp": 15,
        "type": "electric"
    }