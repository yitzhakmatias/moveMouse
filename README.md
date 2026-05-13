# Mouse Mover

Desktop app that keeps your mouse moving to prevent screen lock or inactivity timeout.

## Features

- Configurable move interval (in seconds)
- Configurable move amount (in pixels)
- Start/Stop controls via UI
- Random angle movement that returns to original position

## Tech Stack

- Electron + Vite
- React + TypeScript
- robotjs (native Node addon for mouse control)

## Setup

```bash
npm install
```

## Run Dev Mode

```bash
npm run dev
```

## Build

```bash
npm run build
```

Build output is in the `out/` directory.

## Rebuild Native Module

If robotjs fails to load (ABI mismatch), run:

```bash
npm run rebuild
```

## Usage

1. Launch the app
2. Set the interval (seconds) and move amount (pixels)
3. Click Start to begin mouse movement
4. Click Stop to halt movement