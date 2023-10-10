from models.seen_it import SeenItOut, SeenItIn
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class SeenItQueries():
    def get(self, account_id: int)-> SeenItOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT seen_it.title, seen_it.synopsis,
                    seen_it.actors, seen_it.backdrop_img,
                    seen_it.poster_img, seen_it.account_id
                    FROM seen_it
                    JOIN accounts
                    ON seen_it.account_id = account.id
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
                    return SeenItQueries(**record)
                except Exception:
                    return {
                        "message": "Could not get Seen It record for this account"
                    }

    def create(self, data, account_id: int) -> SeenItIn:
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
                    INSERT INTO seen_it (title, synopsis, actors, backdrop_img, poster_img, account_id)
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
                return SeenItIn(**record)
