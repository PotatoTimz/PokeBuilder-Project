import pytest
from unittest.mock import patch, MagicMock
from services.pokemon_service import (
    get_all_pokemons,
    get_pokemon_by_id,
    validate_data,
    add_pokemon,
    is_created_by_user,
    update_pokemon,
    delete_pokemon,
    add_moves,
    remove_move,
)

# Test get_all_pokemons
@patch("pokemon_service.db.session.query")
def test_get_all_pokemons(mock_query):
    mock_query.return_value.with_entities.return_value.filter.return_value.join.return_value.group_by.return_value.order_by.return_value.all.return_value = [
        (1, "Pikachu", "Ash", "image_url", 35, 55, 40, 50, 50, 90)
    ]
    result = get_all_pokemons("Pikachu", "Ash", False)
    assert result[0]["pokemon_name"] == "Pikachu"
    assert result[0]["creator"] == "Ash"

# Test get_pokemon_by_id
@patch("pokemon_service.db.session.query")
def test_get_pokemon_by_id(mock_query):
    mock_query.return_value.with_entities.return_value.filter.return_value.join.return_value.first.return_value = MagicMock(
        id=1,
        name="Pikachu",
        creator="Ash",
        image="image_url",
        hp=35,
        attack=55,
        defense=40,
        sp_attack=50,
        sp_defense=50,
        speed=90,
    )
    result = get_pokemon_by_id(1)
    assert result["pokemon_name"] == "Pikachu"

# Test validate_data
def test_validate_data_valid():
    data = {
        "types": ["electric"],
        "name": "Pikachu",
        "image": "image_url",
        "hp": 35,
        "attack": 55,
        "defense": 40,
        "sp_attack": 50,
        "sp_defense": 50,
        "speed": 90,
    }
    result = validate_data(data)
    assert result == (
        ["electric"],
        "Pikachu",
        "image_url",
        35,
        55,
        40,
        50,
        50,
        90,
    )

def test_validate_data_invalid():
    data = {"name": "Pikachu"}
    with pytest.raises(Exception):
        validate_data(data)

# Test add_pokemon
@patch("pokemon_service.valid_type", return_value=True)
@patch("pokemon_service.db.session.add")
@patch("pokemon_service.db.session.commit")
@patch("pokemon_service.Account.query.filter_by")
@patch("pokemon_service.Type.query.filter_by")
def test_add_pokemon(
    mock_type_filter, mock_account_filter, mock_commit, mock_add, mock_valid_type
):
    mock_account_filter.return_value.first.return_value = MagicMock(id=1)
    mock_type_filter.return_value.first.return_value = MagicMock(id=1)
    pokemon_id = add_pokemon(
        ["electric"], "Pikachu", "image_url", "Ash", 35, 55, 40, 50, 50, 90
    )
    assert isinstance(pokemon_id, int)
    mock_add.assert_called()
    mock_commit.assert_called()

# Test is_created_by_user
@patch("pokemon_service.Account.query.filter_by")
@patch("pokemon_service.Pokemon.query.filter_by")
def test_is_created_by_user(mock_pokemon_filter, mock_account_filter):
    mock_account_filter.return_value.first.return_value = MagicMock(id=1)
    mock_pokemon_filter.return_value.first.return_value = MagicMock(account_id=1)
    assert is_created_by_user(1, "Ash") is True

# Test update_pokemon
@patch("pokemon_service.valid_type", return_value=True)
@patch("pokemon_service.db.session.commit")
@patch("pokemon_service.Pokemon.query.filter_by")
@patch("pokemon_service.Type.query.filter_by")
def test_update_pokemon(
    mock_type_filter, mock_pokemon_filter, mock_commit, mock_valid_type
):
    mock_pokemon = MagicMock()
    mock_pokemon_filter.return_value.first.return_value = mock_pokemon
    update_pokemon(
        ["electric"],
        "Pikachu",
        "image_url",
        1,
        35,
        55,
        40,
        50,
        50,
        90,
    )
    mock_commit.assert_called_once()

# Test delete_pokemon
@patch("pokemon_service.db.session.commit")
@patch("pokemon_service.db.session.delete")
@patch("pokemon_service.Pokemon.query.filter_by")
def test_delete_pokemon(mock_pokemon_filter, mock_delete, mock_commit):
    mock_pokemon = MagicMock()
    mock_pokemon_filter.return_value.first.return_value = mock_pokemon
    delete_pokemon(1)
    mock_delete.assert_called_once_with(mock_pokemon)
    mock_commit.assert_called_once()

# Test add_moves
@patch("pokemon_service.valid_move", return_value=True)
@patch("pokemon_service.db.session.commit")
@patch("pokemon_service.db.session.add")
@patch("pokemon_service.Move.query.filter_by")
def test_add_moves(mock_move_filter, mock_add, mock_commit, mock_valid_move):
    mock_move_filter.return_value.first.return_value = MagicMock(id=1)
    add_moves({"move": "Thunderbolt"}, 1)
    mock_add.assert_called_once()
    mock_commit.assert_called_once()

# Test remove_move
@patch("pokemon_service.db.session.commit")
@patch("pokemon_service.db.session.delete")
@patch("pokemon_service.PokemonMove.query.filter_by")
@patch("pokemon_service.Move.query.filter_by")
def test_remove_move(
    mock_move_filter, mock_pokemon_move_filter, mock_delete, mock_commit
):
    mock_move_filter.return_value.first.return_value = MagicMock(id=1)
    mock_pokemon_move_filter.return_value.filter_by.return_value.first.return_value = (
        MagicMock()
    )
    remove_move({"move": "Thunderbolt"}, 1)
    mock_delete.assert_called_once()
    mock_commit.assert_called_once()