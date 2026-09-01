# Mentra-lite — Building Management Dashboard

A live Building Management System (BMS) dashboard built in Angular, simulating real-time monitoring for a smart building: temperature, energy usage, occupancy, and air quality, plus per-floor status and historical trend charts.

**Live demo:** https://bms-dashboard-4xm.pages.dev

## Features

- Real-time gauge widgets (temperature, energy usage, occupancy, air quality) with color-coded status thresholds
- Interactive building/floor overview with live per-floor readings
- Historical trend charts for temperature and energy usage
- Custom SVG-based gauges and building visualizations, built from scratch (no charting library)
- Simulated live data stream via an RxJS-driven data service, mimicking a real BMS/IoT sensor feed

## Tech Stack

- **Angular** (standalone components, reactive signals, dependency injection)
- **TypeScript**
- **RxJS** for the live data service
- **SVG** for custom gauge and floor visualizations
- **SCSS** for styling

## Architecture

The dashboard is structured around a central data service that emits simulated sensor readings on an interval, consumed reactively by the gauge, building-overview, and trend-chart components. Each widget is a standalone, reusable component that reacts to the shared data stream through dependency injection, keeping the UI in sync in real time as readings change.

## Running Locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.
