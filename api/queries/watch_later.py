from models.watch_later import WatchLaterOut
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class WatchLaterQueries():
    def get(self, account_id: int) -> WatchLaterOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT watch_later.title, watch_later.synopsis,
                    watch_later.actors, watch_later.backdrop_img,
                    watch_later.poster_img, watch_later.account_id
                    FROM watch_later
                    JOIN accounts
                    ON watch_later.account_id = account.id
                    WHERE account.id = %s;
                    """,
                    [account_id],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return WatchLaterQueries(**record)
                except Exception:
                    return {
                        "message": "Could not get Watch Later record for this account"
                    }

    def create(self, data, account_id: int) -> WatchLaterOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.title,
                    data.synopsis,
                    data.actors,
                    data.backdrop_img,
                    data.poster_img,
                    data.account_id
                ]
                cur.execute(
                    """
                    INSERT INTO watch_later (title, synopsis, actors, backdrop_img, poster_img, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    Returning id, title, synopsis, actors, backdrop_img, poster_img, account_id
                    """,
                    params, account_id
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return WatchLaterOut(**record)
