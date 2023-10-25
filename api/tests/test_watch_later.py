from fastapi.testclient import TestClient
from main import app
from queries.watch_later import WatchLaterQueries
from authenticator import authenticator

client = TestClient(app)

def fake_get_current_account_data():
    return {
        "id": 123,
        "username": "string",
        "password": "string"
    }


class FakeWatchLaterQueries:
    def get_all_watch_later(self, account_id):
        return []


def test_get_all_categories():
    # Arrange
    app.dependency_overrides[WatchLaterQueries] = FakeWatchLaterQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = fake_get_current_account_data
    access_token = "valid_access_token"
    headers = {"Authorization": f"Bearer {access_token}"}
    # Act
    response = client.get("/api/watch_later", headers=headers)
    data = response.json()

    # Assert
    assert response.status_code == 200
    assert isinstance(data, list)
