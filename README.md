# Myzo

A very rough clone of the basic features found in the official Monzo app. Only tested on iPhone.

**This is a toy project for learning/show-casing. This is not a replacement for the official Monzo app.**

Note the warning on the [Monzo Docs](https://docs.monzo.com/):

_The Monzo Developer API is not suitable for building public applications.
You may only connect to your own account or those of a small set of users you explicitly whitelist._

## Current Features

- Transactions list
- Current balance
- Spent today
- Balance history chart
- Transaction location using Maps app

## How to Use

1. Run `yarn` to install dependencies
2. Create `config.json` with API secrets
3. Download Expo client app for iOS
4. Run `expo start`
5. Use your iPhone camera to snap the QR code
6. App should open

### config.json

Monzo API needs an access token, this process is described [here](https://docs.monzo.com/#acquire-an-access-token). I can't currently get this to work though - I suspect the Monzo page doesn't like using the Expo [redirect URL](https://docs.expo.io/versions/latest/sdk/auth-session). It might work once the app is built properly (ie not using Expo client app.)

For now you need to create a `config.json` file in the root directory with two keys:

```
{
  "MONZO_TOKEN": "Your access token",
  "MONZO_ACCOUNT_ID": "Your account id"
}
```

These values can be found by signing into the [Monzo Developer Playground](https://developers.monzo.com/api/playground). This file is in the `.gitignore` so those secrets aren't accidentally checked in.
