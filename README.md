# Tiffin tracker

Static site. Firebase settings come from environment variables and are injected by `build.js`.

## Deploy on Netlify (from GitHub)
1. Push this folder to a GitHub repo (`.env` is git-ignored).
2. Netlify -> Add new site -> Import from Git -> pick the repo. Build settings are read from `netlify.toml`.
3. Site configuration -> Environment variables -> add the six FIREBASE_* values (see `.env.example`).
4. Deploy. Any later change to a variable needs a new deploy (Deploys -> Trigger deploy).

## Build locally
    cp .env.example .env     # fill in the values
    node build.js
    npx serve dist           # Google sign-in needs http://localhost, not file://

Add `localhost` under Firebase -> Authentication -> Settings -> Authorized domains to test sign-in locally.
