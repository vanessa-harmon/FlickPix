from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 123,
        "username": "string",
        "password": "string"
    }


class FakeAccountQueries:
    def get(self):
        fake_account = [
            {
                "access_token": "string",
                "token_type": "Bearer",
                "account": {
                    "id": 0,
                    "username": "string",
                    "first_name": "string",
                    "last_name": "string",
                    "email": "string"
                }
            }
        ]
        return {fake_account}


def test_create_account():
    # Arrange/Setup
    app.dependency_overrides[AccountQueries] = FakeAccountQueries


    # access_token = "valid_access_token"
    # headers = {"Authorization": f"Bearer {access_token}"}


    # Act/Enact
    response = client.post("/api/accounts/")
    print("RESPONSE: ", response)

    data = response.json()
    # Assert
    assert response.status_code == 200
    assert isinstance(data, dict)

# def test_create_account(client):
#     data = {
#         "username":"testuser",
#         "first_name": "string",
#         "last_name": "string",
#         "email":"testuser@nofoobar.com",
#         "date_of_birth": "2023-10-25",
#         "password":"testing"}
#     response = client.post("/api/accounts/",json.dumps(data))
#     assert response.status_code == 200
#     assert response.json()["email"] == "testuser@nofoobar.com"
#     assert response.json()["is_active"] == True
