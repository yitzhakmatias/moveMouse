# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install deps + rebuilds robotjs against Electron's Node ABI
npm run dev          # Start dev server (Electron + Vite HMR)
npm run build        # Production build to out/
npm run rebuild      # Re-run electron-rebuild if robotjs fails to load
```

## Architecture

Electron app with three processes:

**Main process** (`src/main/`)
- `index.ts` — creates the `BrowserWindow`, registers IPC handlers (`mouse:start`, `mouse:stop`, `mouse:status`)
- `mouse-mover.ts` — `MouseMover` class wraps `robotjs`; on each interval tick it nudges the cursor by a random angle and then returns it 300ms later

**Preload** (`src/preload/index.ts`)
- Exposes `window.electronAPI` to the renderer via `contextBridge`

**Renderer** (`src/renderer/`)
- React + TypeScript SPA built by Vite
- `App.tsx` — all UI state (running, intervalSec, moveAmount); calls `window.electronAPI.*` for IPC

## Native module note

`robotjs` is a native Node addon. It must be compiled against Electron's Node ABI, not the system Node. `postinstall` runs `electron-rebuild` automatically. If you see _"was compiled against a different Node.js version"_, run `npm run rebuild`.

## IPC channels

| Channel | Direction | Payload |
|---|---|---|
| `mouse:start` | renderer → main | `{ intervalMs, moveAmount }` |
| `mouse:stop` | renderer → main | — |
| `mouse:status` | renderer → main | returns `{ running: boolean }` |
