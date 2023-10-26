# from routers.movies import trending_movie_list
# import requests
# import pytest
# import json


# @pytest.fixture
# def fake_trending_movie_info():
#     mock_json = '{"results": [{"id": 123, "Title": "Test Movie 1"}]}'
#     response = json.loads(mock_json)
#     print("RESPONSE: ", response)
#     print("TYPE: ", type(response))
#     return response


# @pytest.mark.asyncio
# async def test_trending_movie_list(mocker, fake_trending_movie_info):
#     mocker.patch('requests.get', return_value=fake_trending_movie_info)

#     response = await trending_movie_list()
#     assert response == fake_trending_movie_info
