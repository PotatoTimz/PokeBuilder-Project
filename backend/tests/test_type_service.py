import pytest
from unittest.mock import patch, MagicMock
from services.type_service import validate_data, valid_type, create_type, get_all_types

# Test validate_data
def test_validate_data_valid():
    data = {"name": "Fire"}
    result = validate_data(data)
    assert result == "Fire"

def test_validate_data_invalid():
    data = {}
    with pytest.raises(Exception) as excinfo:
        validate_data(data)
    assert "Invalid Input!" in str(excinfo.value)

# Test valid_type
@patch("type_service.Type.query.filter_by")
def test_valid_type_exists(mock_filter_by):
    mock_filter_by.return_value.first.return_value = MagicMock()
    assert valid_type("Fire") is True

@patch("type_service.Type.query.filter_by")
def test_valid_type_not_exists(mock_filter_by):
    mock_filter_by.return_value.first.return_value = None
    assert valid_type("Fire") is False

# Test create_type
@patch("type_service.db.session.add")
@patch("type_service.db.session.commit")
@patch("type_service.Type")
def test_create_type(mock_type, mock_add, mock_commit):
    mock_type.return_value = MagicMock(id=1, name="Fire")
    result = create_type("Fire")
    assert result.json == {"id": 1, "name": "Fire"}
    mock_add.assert_called_once()
    mock_commit.assert_called_once()

# Test get_all_types
@patch("type_service.Type.query.order_by")
def test_get_all_types(mock_order_by):
    mock_order_by.return_value.all.return_value = [
        MagicMock(id=1, name="Fire"),
        MagicMock(id=2, name="Water"),
    ]
    result = get_all_types()
    assert result.json == [{"id": 1, "name": "Fire"}, {"id": 2, "name": "Water"}]