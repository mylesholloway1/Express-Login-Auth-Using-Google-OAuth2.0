# Express User Register, Login & Auth Using Google OAuth2.0

- This is an express application built using OAuth2.0

# Set up

## Mongo DB

- This application uses Mongo DB Atlas to connect.
- [This](https://www.mongodb.com/docs/atlas/getting-started/) is a good guide to quickly set up a Mongo DB atlas collection.
- You need to get the connection string from your account to place in the default config file.

## Google Credentials

- You need to set Google OAuth credentials in order to use google OAuth2.0
- [This](https://www.youtube.com/watch?v=xH6hAW3EqLk) is a great video for learning how to do this
- [This](https://developers.google.com/workspace/guides/create-credentials) is also an article on how to do this (in case the video doesn't work).

## Default.Json

- The applicaiton looks for a `./config/default.json` file to get the db connection string and the jwt secret
- create default.json:

```json
{
  "mongodb": "[CONNECTION STRING]",
  "jwtSecret": "[SECRET]"
}
```
