import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountOutWithPassword


class Authenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.

        # Convert to Pydantic model if account is a dictionary
        if isinstance(account, dict):
            account = AccountOutWithPassword(**account)
        # Now account is guaranteed to be a AccountOutWithPassword object

        return account.email, account.dict()


# authenticator = Authenticator(os.environ["SIGNING_KEY"])
authenticator = Authenticator(os.environ.get("SIGNING_KEY"))
