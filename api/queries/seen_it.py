from models.seen_it import SeenItIn, SeenItOut, SeenItItem
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class SeenItQueries():
    def create(self, data, account_id) -> SeenItIn:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id
                    FROM seen_it
                    WHERE tmdb_id = (%s)
                    AND account_id = (%s)
                    """,
                    [data.tmdb_id, account_id]
                )
                existing_entry = cur.fetchone()
                if existing_entry:
                    return "MOVIE ALREADY IN LIST"
                params = [
                    data.title,
                    data.tmdb_id,
                    data.synopsis,
                    data.actors,
                    data.backdrop_img,
                    data.poster_img,
                    account_id
                ]
                cur.execute(
                    """
                    INSERT INTO seen_it (title, tmdb_id,  synopsis, actors, backdrop_img, poster_img, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, title, tmdb_id, synopsis, actors, backdrop_img, poster_img, account_id;
                    """,
                    params
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                if record:
                    return SeenItIn(**record)
                else:
                    print("FAILED TO RETRIEVE FROM DATABASE")

    def get(self, account_id) -> SeenItOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT title, tmdb_id, synopsis, actors, backdrop_img,
                    poster_img, account_id
                    FROM seen_it
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
                        records.append(SeenItItem(**record))
                        print("RECORD:               ", record)
                    return SeenItOut(items=records)
                except Exception:
                    return SeenItOut(items=[])

    def delete(self, tmdb_id, account_id) -> SeenItOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM seen_it
                    WHERE tmdb_id = (%s)
                    AND account_id = (%s)
                    """,
                    [tmdb_id, account_id]
                )
                if cur.rowcount > 0:
                    return ("Item was deleted")
                else:
                    return None
