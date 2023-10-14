from models.watch_later import WatchLaterIn
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class WatchLaterQueries():
    def create(self, data, account_id) -> WatchLaterIn:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.title,
                    data.synopsis,
                    data.actors,
                    data.backdrop_img,
                    data.poster_img,
                    account_id
                ]
                cur.execute(
                    """
                    INSERT INTO watch_later (title, synopsis, actors, backdrop_img, poster_img, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, title, synopsis, actors, backdrop_img, poster_img, account_id;
                    """,
                    params
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                else:
                    print("No records found in the database")
                if record:
                    return WatchLaterIn(**record)
                else:
                    print('FAILED TO RETRIEVE DATA FROM DB')
