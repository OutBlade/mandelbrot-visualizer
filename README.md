# Mandelbrot Visualizer

An interactive web-based Mandelbrot set explorer with smooth zooming, panning, and multiple color schemes.

## Features

- **Interactive Controls**: Click and drag to pan around the fractal
- **Zoom**: Use mouse scroll wheel to zoom in/out, or use the zoom buttons
- **Color Schemes**: Switch between Electric, Ocean, Sunset, and Grayscale palettes
- **High Performance**: Canvas-based rendering with optimized algorithm

## Usage

Simply open `index.html` in any modern web browser to explore the Mandelbrot set.

### Controls

- **Click & Drag**: Pan the view
- **Scroll Wheel**: Zoom in/out at cursor position
- **Zoom In Button**: Double the zoom level
- **Zoom Out Button**: Halve the zoom level
- **Reset View**: Return to default view
- **Change Colors**: Cycle through color schemes

## Technical Details

The Mandelbrot set is computed using the classic escape-time algorithm. Points are colored based on how quickly they escape the set boundary, with smooth coloring applied for visual appeal.

## License

MIT License