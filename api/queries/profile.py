from models.profile import Profile
import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class ProfileQueries():
    def create(self, data, account_id) -> Profile:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.nickname,
                    data.avatar,
                    account_id
                ]
                cur.execute(
                    """
                    INSERT INTO profiles (nickname, avatar, account_id)
                    VALUES (%s, %s, %s)
                    RETURNING id, nickname, avatar, account_id;
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
                    print("No records found in the database.")
                if record:
                    return Profile(**record)
                else:
                    print("Failed to retrieve data from the Database.")

    def get(self, account_id, profile_id) -> Profile:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT account_id, id, nickname, avatar
                    FROM profiles
                    WHERE account_id = (%s) AND id = (%s)
                    """,
                    [account_id, profile_id]
                )
                try:
                    record = None
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record

                except Exception:
                    return {
                        "message": "Could not find the Profile for this Account."
                    }

    def update(self, data, account_id, profile_id) -> Profile:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.nickname,
                    data.avatar,
                    account_id,
                    profile_id
                ]
                cur.execute(
                    """
                    UPDATE profiles
                    SET nickname = %s, avatar =  %s
                    WHERE account_id = (%s) AND id = (%s)
                    RETURNING id, nickname, avatar, account_id;
                    """,
                    params
                )
                try:
                    record = None
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return record
                except Exception:
                    return {
                        "message": "Could not find the Profile for this Account."
                    }
