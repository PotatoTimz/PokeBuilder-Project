import pytest
from unittest.mock import patch, MagicMock
from services.move_service import (
    get_all_moves,
    get_move_by_id,
    learnable_moves_by_pokemon,
    validate_data,
    add_move,
    update_move,
    delete_move,
    valid_move,
)

# Test get_all_moves
@patch("move_service.db.session.query")
def test_get_all_moves(mock_query):
    mock_query.return_value.with_entities.return_value.filter.return_value.join.return_value.filter.return_value.all.return_value = [
        (1, "Thunderbolt", "Ash", 90, "A strong electric attack.", 100, 15, 1)
    ]
    response = get_all_moves("Thunderbolt", "Ash")
    assert response.json[0]["move_name"] == "Thunderbolt"
    assert response.json[0]["move_creator"] == "Ash"

# Test get_move_by_id
@patch("move_service.db.session.query")
def test_get_move_by_id(mock_query):
    mock_query.return_value.with_entities.return_value.filter.return_value.join.return_value.first.return_value = MagicMock(
        id=1,
        name="Thunderbolt",
        creator="Ash",
        power=90,
        description="A strong electric attack.",
        accuracy=100,
        pp=15,
        type_id=1,
    )
    response = get_move_by_id(1)
    assert response.json["move_name"] == "Thunderbolt"

# Test learnable_moves_by_pokemon
@patch("move_service.db.session.query")
def test_learnable_moves_by_pokemon(mock_query):
    mock_query.return_value.with_entities.return_value.outerjoin.return_value.filter.return_value.join.return_value.all.return_value = [
        (1, "Thunderbolt", "Ash", 90, "A strong electric attack.", 100, 15, 1)
    ]
    response = learnable_moves_by_pokemon(1)
    assert response.json[0]["move_name"] == "Thunderbolt"

# Test validate_data
def test_validate_data_valid():
    data = {
        "name": "Thunderbolt",
        "power": 90,
        "description": "A strong electric attack.",
        "accuracy": 100,
        "pp": 15,
        "type": "electric",
    }
    result = validate_data(data)
    assert result == (
        "Thunderbolt",
        90,
        "A strong electric attack.",
        100,
        15,
        "electric",
    )

def test_validate_data_invalid():
    data = {"name": "Thunderbolt", "power": 90}
    with pytest.raises(Exception):
        validate_data(data)

# Test add_move
@patch("move_service.valid_type", return_value=True)
@patch("move_service.db.session.add")
@patch("move_service.db.session.commit")
@patch("move_service.Account.query.filter_by")
@patch("move_service.Type.query.filter")
def test_add_move(
    mock_type_filter, mock_account_filter, mock_commit, mock_add, mock_valid_type
):
    mock_account_filter.return_value.first.return_value = MagicMock(id=1)
    mock_type_filter.return_value.first.return_value = MagicMock(id=1)
    add_move("Thunderbolt", 90, "A strong electric attack.", 100, 15, "electric", "Ash")
    mock_add.assert_called_once()
    mock_commit.assert_called_once()

# Test update_move
@patch("move_service.valid_type", return_value=True)
@patch("move_service.db.session.commit")
@patch("move_service.Move.query.filter_by")
@patch("move_service.Type.query.filter")
def test_update_move(
    mock_type_filter, mock_move_filter, mock_commit, mock_valid_type
):
    mock_type_filter.return_value.first.return_value = MagicMock(id=1)
    mock_move = MagicMock()
    mock_move_filter.return_value.first.return_value = mock_move
    update_move(
        1, "Thunderbolt", 90, "A strong electric attack.", 100, 15, "electric"
    )
    assert mock_move.name == "Thunderbolt"
    mock_commit.assert_called_once()

# Test delete_move
@patch("move_service.db.session.commit")
@patch("move_service.db.session.delete")
@patch("move_service.Move.query.filter_by")
def test_delete_move(mock_move_filter, mock_delete, mock_commit):
    mock_move = MagicMock()
    mock_move_filter.return_value.first.return_value = mock_move
    delete_move(1)
    mock_delete.assert_called_once_with(mock_move)
    mock_commit.assert_called_once()

# Test valid_move
@patch("move_service.Move.query.filter_by")
def test_valid_move(mock_filter_by):
    mock_filter_by.return_value.first.return_value = True
    assert valid_move("Thunderbolt") is True
    mock_filter_by.return_value.first.return_value = None
    assert valid_move("Thunderbolt") is False