from fastapi.testclient import TestClient
from main import app
from queries.watch_later import WatchLaterQueries
from authenticator import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 123,
        "username": "string"
    }


class FakeWatchLaterQueries:
    def create(self, data, account_id):
        fake_watch_later_data = {
            "title": "string",
            "tmdb_id": 10,
            "synopsis": "string",
            "actors": "string",
            "backdrop_img": "string",
            "poster_img": "string",
            "account_id": 0
            }
        return fake_watch_later_data


def test_create_seen_it():
    app.dependency_overrides[WatchLaterQueries] = FakeWatchLaterQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    movie_data = {
        "title": "string",
        "tmdb_id": 0,
        "synopsis": "string",
        "actors": "string",
        "backdrop_img": "string",
        "poster_img": "string",
        "account_id": 0
    }

    response = client.post("/api/watch_later", json=movie_data)
    app.dependency_overrides = {}

    data = response.json()

    assert response.status_code == 200
    assert isinstance(data, dict)