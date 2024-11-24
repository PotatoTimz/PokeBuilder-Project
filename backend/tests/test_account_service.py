import pytest
from unittest.mock import patch, MagicMock
from services.account_service import (
    validate_user_input,
    check_account_created,
    create_account,
    get_all_accounts,
    get_account,
    delete_account,
    update_password,
    get_account_name,
)

# Test validate_user_input
def test_validate_user_input_valid():
    data = {"username": "testuser", "password": "testpass"}
    username, password = validate_user_input(data)
    assert username == "testuser"
    assert password == "testpass"

def test_validate_user_input_invalid():
    data = {"username": "testuser"}
    with pytest.raises(Exception) as excinfo:
        validate_user_input(data)
    assert "Invalid Input!" in str(excinfo.value)

# Test check_account_created
@patch("account_service.Account.query.filter_by")
def test_check_account_created_exists(mock_filter_by):
    mock_filter_by.return_value.first.return_value = True
    response, status_code = check_account_created("testuser")
    assert status_code == 401
    assert response.json["message"] == "Username already exists. Please enter a unique username!"

@patch("account_service.Account.query.filter_by")
def test_check_account_created_not_exists(mock_filter_by):
    mock_filter_by.return_value.first.return_value = None
    result = check_account_created("testuser")
    assert result is None

# Test create_account
@patch("account_service.db.session.add")
@patch("account_service.db.session.commit")
@patch("account_service.Account")
def test_create_account(mock_account, mock_add, mock_commit):
    mock_account.return_value = MagicMock()
    response, status_code = create_account("testuser", "hashed_pass", "salt")
    assert status_code == 201
    assert response.json["message"] == "User registered successfully!"
    mock_add.assert_called_once()
    mock_commit.assert_called_once()

# Test get_all_accounts
@patch("account_service.Account.query.all")
def test_get_all_accounts(mock_query_all):
    mock_query_all.return_value = [
        MagicMock(id=1, username="user1"),
        MagicMock(id=2, username="user2"),
    ]
    response = get_all_accounts()
    assert response.json == [{"id": 1, "username": "user1"}, {"id": 2, "username": "user2"}]

# Test get_account
def test_get_account():
    mock_account = MagicMock(id=1, username="testuser")
    response = get_account(mock_account)
    assert response.json == {"id": 1, "username": "testuser"}

# Test delete_account
@patch("account_service.db.session.delete")
@patch("account_service.db.session.commit")
def test_delete_account(mock_commit, mock_delete):
    mock_account = MagicMock()
    response, status_code = delete_account(mock_account)
    assert status_code == 201
    assert response.json["message"] == "Successfully delete account!"
    mock_delete.assert_called_once_with(mock_account)
    mock_commit.assert_called_once()

# Test update_password
@patch("account_service.db.session.commit")
def test_update_password(mock_commit):
    mock_account = MagicMock()
    response, status_code = update_password(mock_account, "new_hashed_pass", "new_salt")
    assert status_code == 201
    assert response.json["message"] == "Successfully updated password!"
    assert mock_account.hashed_password == "new_hashed_pass"
    assert mock_account.salt == "new_salt"
    mock_commit.assert_called_once()

# Test get_account_name
@patch("account_service.Account.query.filter")
def test_get_account_name(mock_filter):
    mock_filter.return_value.first.return_value.username = "testuser"
    result = get_account_name(1)
    assert result == "testuser"
    mock_filter.assert_called_once()