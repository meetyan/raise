# Raise

<img src="./static/logo.png" width="180" alt="Raise App" />

A simple (and unofficial) GitHub Trending client that lives in your menubar.

## Screenshots

![Raise App Screenshots](./static/screenshots/banner.png)

![Raise App Screenshots](./static/screenshots/ui.png)

## Installation

Download from [GitHub Releases](https://github.com/meetyan/raise/releases) and install.

Currently Raise can run on macOS and Windows machines.

### macOS

If you use an Intel machine, please download the `.dmg` file with its filename containing no architecture. Otherwise use `arm64.dmg` if your hardware is armed with Apple Silicon (M1/M2).

### Windows

For Windows users simply download the package with `.exe` extension.

If it's your first time to open Raise, you might see a screen saying `Windows protected your PC. Windows SmartScreen prevented an unrecognized app from start. Running this app might put your PC at risk.`. To bypass it, click `More Info` and then click `Run anyway`. This is simply because Raise on Windows is not [code signed](https://www.electronjs.org/docs/latest/tutorial/code-signing). Read [this](https://stackoverflow.com/questions/48946680/how-to-avoid-the-windows-defender-smartscreen-prevented-an-unrecognized-app-fro) for your reference.

## Features

- Showcasing GitHub's trending repos and developers
- Simple and intuitive user interface
- Language and date range filtering
- Dark mode
- More under development

## Tech Involved

- [Electron](https://electronjs.org/)
- [React](https://reactjs.org/)
- [Semi Design](https://semi.design/)
- [GitHub Trending API](https://github.com/huchenme/github-trending-api)
- [Umami](https://github.com/gmasclet/umami)
- [PM2](https://pm2.keymetrics.io/)
- [Webpack](https://webpack.js.org/)

## How to Develop

Raise is developed on Node.js v16. Other Node.js versions have not been tested.

Run the following commands in `Terminal.app` on macOS or `PowerShell` on Windows:

```bash

yarn

yarn start

```

## Build and Deploy

To build and deploy, run the following:

```bash

yarn build

yarn release

```

