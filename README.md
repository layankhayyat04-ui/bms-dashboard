<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,100:16213e&height=180&section=header&text=Mentra-lite&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=Live%20Building%20Management%20Dashboard%20%C2%B7%20Angular&descAlignY=62&descSize=15" />

<p align="center">
  <img src="https://img.shields.io/badge/status-active-16213e?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white"/>
  <br/>
  <a href="https://bms-dashboard-ochre.vercel.app"><img src="https://img.shields.io/badge/🔴_LIVE_DEMO-16213e?style=for-the-badge"/></a>
</p>

A live Building Management System (BMS) dashboard built in Angular, simulating real-time monitoring for a smart building: temperature, energy usage, occupancy, and air quality, plus per-floor status and historical trend charts.

---

### ✨ Features

- 🔴 **Real-time gauge widgets** (temperature, energy usage, occupancy, air quality) with color-coded status thresholds
- 🏢 **Interactive building/floor overview** with live per-floor readings
- 📈 **Historical trend charts** for temperature and energy usage
- 🎨 **Custom SVG-based gauges** and building visualizations, built from scratch (no charting library)
- 📡 **Simulated live data stream** via an RxJS-driven data service, mimicking a real BMS/IoT sensor feed

### 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=angular,ts,rxjs,sass&theme=light" />
</p>

| | |
|---|---|
| **Framework** | Angular (standalone components, reactive signals, dependency injection) |
| **Language** | TypeScript |
| **Reactive Layer** | RxJS for the live data service |
| **Visuals** | Custom SVG for gauges and floor visualizations |
| **Styling** | SCSS |

### 🏗️ Architecture

The dashboard is structured around a central data service that emits simulated sensor readings on an interval, consumed reactively by the gauge, building-overview, and trend-chart components. Each widget is a standalone, reusable component that reacts to the shared data stream through dependency injection, keeping the UI in sync in real time as readings change.

### ▶️ Running Locally

```bash
npm install
npm start
```

Then open `http://localhost:4200/`.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:16213e,100:1a1a2e&height=80&section=footer" />
