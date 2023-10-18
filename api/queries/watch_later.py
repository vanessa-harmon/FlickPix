from models.watch_later import WatchLaterIn, WatchLaterOut, WatchLaterItem
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
                    print("record:", record)
                else:
                    print("No records found in the database")
                if record:
                    return WatchLaterIn(**record)
                else:
                    print('FAILED TO RETRIEVE DATA FROM DB')

    def get(self, account_id) -> WatchLaterOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT title, synopsis, actors, backdrop_img,
                    poster_img, account_id
                    FROM watch_later
                    WHERE account_id = (%s);
                    """,
                    [account_id]
                )
                try:
                    records = []
                    for row in cur.fetchall():
                        print("ROW:   ", row)
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        records.append(WatchLaterItem(**record))
                        print("RECORD:               ", record)
                    return WatchLaterOut(items=records)
                except Exception:
                    return WatchLaterOut(items=[])

    def delete(self, title, account_id) -> WatchLaterOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM watch_later
                    WHERE title = (%s)
                    AND account_id = (%s)
                    """,
                    [title, account_id]
                )
                if cur.rowcount > 0:
                    return ("Item was deleted")
                else:
                    return None
