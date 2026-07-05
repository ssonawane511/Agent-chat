# Agent Chat

<p align="center">
  <img src="assets/images/icon.png" width="120" alt="Agent Chat icon" />
</p>

A multi-agent team chat app built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev). Collaborate with Strategist, Designer, and Writer agents in one conversation on iOS, Android, and the web.

**Live web app:** [ssonawane511.github.io/Agent-chat](https://ssonawane511.github.io/Agent-chat/)

## Features

- Multi-agent chat with Strategist, Designer, and Writer personas
- Chat history and session management
- Responsive web layout with desktop sidebar and mobile drawer
- Native iOS and Android support via Expo
- Storybook for component development

## Tech stack

- Expo SDK 56
- React Native 0.85 + React 19
- Expo Router (file-based routing)
- React Native Reanimated
- TypeScript

## Getting started

### Prerequisites

- Node.js 22+
- npm
- For native builds: Xcode (iOS) and/or Android Studio (Android)

### Install

```bash
npm install
```

### Development

```bash
# Start Expo dev server (iOS, Android, web)
npm start

# Web only
npm run web

# iOS / Android
npm run ios
npm run android
```

Edit screens and components under `src/app` and `src/components`.

### Storybook

```bash
npm run storybook
```

## Web build & deploy

The web app is deployed to GitHub Pages on every push to `main`.

| Script | Description |
|--------|-------------|
| `npm run build:web` | Export a local web build (root paths) |
| `npm run build:web:pages` | Export with GitHub Pages base path (`/Agent-chat`) |
| `npx expo serve` | Serve the `dist/` folder locally |

Preview the production build the same way GitHub Pages serves it:

```bash
npm run build:web:pages
npx expo serve
```

Open [http://localhost:8081/Agent-chat/](http://localhost:8081/Agent-chat/).

### GitHub Pages setup

1. In the repo, go to **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` — the [Deploy Web to GitHub Pages](.github/workflows/deploy-web.yml) workflow builds and publishes automatically.

Because this is a project site, assets are served under `/Agent-chat/`. The workflow sets `EXPO_BASE_URL` from the repository name.

## Project structure

```
src/
  app/           # Expo Router screens
  components/    # UI and chat components
  constants/     # Tokens, agents, icons
  context/       # App state
  hooks/         # Shared hooks
assets/
  images/        # App icon, splash, favicon
```

## License

See [LICENSE](LICENSE).
