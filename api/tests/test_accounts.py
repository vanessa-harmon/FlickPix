from fastapi.testclient import TestClient
from main import app
from authenticator import authenticator

client = TestClient(app)

client.cookies[authenticator.cookie_name] = "TOKEN!"


class FakeAccountQueries:
    def get(self):
        return {
            "id": 1,
            "username": "user1",
            "first_name": "Test",
            "last_name": "User",
            "email": "user1@email.com",
            "date_of_birth": "10-26-2023",
            "hashed_password": "password"
        }


def test_get_token():
    # Arrange/Setup
    app.dependency_overrides[authenticator.try_get_current_account_data] = FakeAccountQueries().get

    # Act/Enact
    response = client.get("/token")

    data = response.json()
    # Assert
    assert response.status_code == 200
    assert data["access_token"] == "TOKEN!"
    assert data["token_type"] == "Bearer"

    # Teardown
    app.dependency_overrides = {}
