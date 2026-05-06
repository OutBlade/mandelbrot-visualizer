# Mandelbrot Visualizer

Interactive Mandelbrot set explorer with video recording mode.

[![Release](https://github.com/OutBlade/mandelbrot-visualizer/actions/workflows/release-app.yml/badge.svg)](https://github.com/OutBlade/mandelbrot-visualizer/actions/workflows/release-app.yml)

## Download

Download the latest Windows installer from the [Releases](https://github.com/OutBlade/mandelbrot-visualizer/releases) page.

## Features

- **Interactive Exploration**: Click and drag to pan around the fractal
- **Smooth Zooming**: Mouse wheel to zoom at cursor position
- **Video Recording Mode**: Automatically records a zoom video up to 1000x magnification
- **Zoom Presets**: Quick navigation to beautiful locations (Spiral Valley, Seahorse Valley, etc.)
- **Color Schemes**: Electric, Ocean, Sunset, and Grayscale themes
- **Auto-Update**: Automatically updates when new versions are released

## Installation

1. Download the latest `.exe` installer from the [releases page](https://github.com/OutBlade/mandelbrot-visualizer/releases)
2. Run the installer
3. Launch Mandelbrot Visualizer from the Start Menu or Desktop shortcut

Updates are downloaded and installed automatically in the background.

## Video Recording Mode

1. Click "Start Video Recording"
2. Set duration (10-120 seconds) and zoom speed
3. Watch as the app automatically zooms into a beautiful spiral formation
4. Progress bar shows recording status

## Keyboard Shortcuts

- Mouse wheel: Zoom at cursor
- Click and drag: Pan view
- Video mode auto-zooms from 1x to 1000B (1 trillion)x magnification

## Development

```bash
cd app
npm install
npm start
```

## Building Installer

```bash
cd app
npm run dist:win
```

Creates a Windows installer in `app/dist/`.

## Tech Stack

- Electron
- HTML5 Canvas
- electron-updater for auto-updates
- electron-builder for packaging

## License

MIT