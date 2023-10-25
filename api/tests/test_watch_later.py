from fastapi.testclient import TestClient
from main import app
from queries.watch_later import WatchLaterQueries
from authenticator import authenticator

client = TestClient(app)


class FakeWatchLaterQueries:
    # get_watch_later function
    def get_watch_later(self, account_id):
        return []
        # fake_watch_later_list = [
        #     {
        #         "title": "Movie 1",
        #         "tmdb_id": 123,
        #         "synopsis": "Synopsis 1",
        #         "actors": "Actor 1",
        #         "backdrop_img": "backdrop_url_1",
        #         "poster_img": "poster_url_1",
        #         "account_id": account_id
        #     },
        # ]
        # return {"items": fake_watch_later_list}


class FakeAccountData:
    def get_current_account_data(self):
        return {
            "id": 123
            }


def test_get_all_watch_later():
    # Arrange/Setup
    account_id = 123
    app.dependency_overrides[WatchLaterQueries] = FakeWatchLaterQueries
    app.dependency_overrides[authenticator.get_current_account_data] = FakeAccountData

    # Act/Enact
    response = client.get("/api/watch_later")

    # Assert
    assert response.status_code == 200
    expected_response = {
        "items": [
            {
                "title": "Movie 1",
                "tmdb_id": 123,
                "synopsis": "Synopsis 1",
                "actors": "Actor 1",
                "backdrop_img": "backdrop_url_1",
                "poster_img": "poster_url_1",
                "account_id": account_id
            },
        ]
    }

    assert response.json() == expected_response
