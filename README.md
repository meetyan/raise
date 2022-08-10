# Raise

<img src="./static/logo-without-padding.png" width="256" alt="Raise App" />

A simple (and unofficial) GitHub Trending client that lives in your menubar.

## Screenshots

## Installation

Download from [GitHub Releases](https://github.com/meetya/raise/releases) and install it.

Currently Raise can run on macOS and Windows machines.

### macOS

If you use an Intel machine, please download the `.dmg` or `.zip` file with its filename containing `x64`. Use `arm64` if you are on a hardware armed with Apple Silicon (M1/M2).

### Windows

If your system is supported by `x64` architecture, simply download the `.exe` file with its filename containing `x64`. On a 32-bit system, use `ia32`.

If it's your first time to open Raise, please make sure xxx is turned on. See []() for reference.

## Features

## Tech Involved

- [Electron](https://electronjs.org/)
- [React](https://reactjs.org/)
- [GitHub Trending API](https://github.com/huchenme/github-trending-api)
- [PM2](https://pm2.keymetrics.io/)
- [Umami](https://github.com/gmasclet/umami)

## How to Develop

Raise is developed on NodeJS version 16.16.0. Other NodeJS versions have not been tested.

Run the following commands in `Terminal.app` on macOS or `PowerShell` on Windows:

```bash

yarn

yarn start

```

## Build and Deploy

```bash

yarn build

yarn release

```

