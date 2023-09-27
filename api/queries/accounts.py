import os
from psycopg_pool import ConnectionPool
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))
from pydantic import BaseModel
from datetime import date


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    date_of_birth: date
    password: str


class AccountOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries():
    def get(self, email: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return AccountOutWithPassword(**record)
                except Exception:
                    return {
                        "message": "Could not get account record for this account email"
                    }

    def create(self, data, hashed_password) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.date_of_birth,
                    hashed_password
                ]
                cur.execute(
                    """
                    INSERT INTO accounts (username, first_name, last_name, email, date_of_birth, hashed_password)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, username, first_name, last_name, email, date_of_birth, hashed_password
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return AccountOutWithPassword(**record)
