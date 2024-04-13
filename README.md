# Mongodb login/signup
## salt and hash the password in browser

TLDR;

```
npm install
npm start
```

This fetches a salt from a mongodb collection, if the username is found. If the username is not found it generates a guid to use as the salt and saves it with the username.

Before logging in or signing up the password is salted and hashed in the browser. It is then checked on the mongodb side.
