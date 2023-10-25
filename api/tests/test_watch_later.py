from fastapi.testclient import TestClient
from main import app
from queries.watch_later import WatchLaterQueries
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 123,
        "username": "string"
        # "password": "string"
    }


class FakeWatchLaterQueries:
    def get(self, account_id):
        fake_watch_later_list = [
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
        return {"items": fake_watch_later_list}


def test_get_all_watch_later():
    # Arrange/Setup
    app.dependency_overrides[WatchLaterQueries] = FakeWatchLaterQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    # access_token = "valid_access_token"
    # headers = {"Authorization": f"Bearer {access_token}"}


    # Act/Enact
    response = client.get("/api/watch_later/")
    app.dependency_overrides = {}
    print("RESPONSE: ", response)

    data = response.json()
    # Assert

    # expected_response = {
    #     "items": {
    #             "title": "Movie 1",
    #             "tmdb_id": 123,
    #             "synopsis": "Synopsis 1",
    #             "actors": "Actor 1, Actor 2",
    #             "backdrop_img": "backdrop_url_1",
    #             "poster_img": "poster_url_1",
    #             "account_id": account_id
    #     }
    # }
    assert response.status_code == 200
    assert isinstance(data, dict)
