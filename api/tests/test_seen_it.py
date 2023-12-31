from fastapi.testclient import TestClient
from main import app
from queries.seen_it import SeenItQueries
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 123,
        "username": "string",
        # "password": "string"
    }


class FakeSeenItQueries:
    # get_watch_later function
    def get(self, account_id):
        fake_seen_it_list = [
            {
                "title": "Movie 1",
                "tmdb_id": 9999,
                "synopsis": "Synopsis 1",
                "actors": "Actor 1, Actor 2",
                "backdrop_img": "backdrop_url_1",
                "poster_img": "poster_url_1",
                "account_id": 123
            }
        ]
        return {"items": fake_seen_it_list}


def test_get_all_seen_it():
    # Arrange/Setup
    app.dependency_overrides[SeenItQueries] = FakeSeenItQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    # Act/Enact
    response = client.get("/api/seen_it")
    app.dependency_overrides = {}
    print("RESPONSE: ", response)

    data = response.json()

    # Assert
    assert response.status_code == 200
    assert isinstance(data, dict)
