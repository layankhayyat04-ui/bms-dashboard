import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { FloorStatus, SensorReading } from '../models/sensor-reading';

// This service is the single source of truth for "live" building data.
// In a real BMS product this would connect to a WebSocket or a polling API
// endpoint that reads actual sensor hardware. Here we simulate that feed
// with randomized values so the dashboard behaves like it's reacting to
// real, constantly-changing data.

@Injectable({
  providedIn: 'root', // registers ONE shared instance app-wide (a singleton)
})
export class SensorDataService {
  // BehaviorSubject: an RxJS "observable" that always remembers its last
  // value, and immediately hands that value to any new subscriber.
  // Components don't need to know HOW the data is produced -- they just
  // subscribe to this service and react whenever it emits a new reading.
  private readonly currentReadingSubject = new BehaviorSubject<SensorReading>(
    this.generateReading()
  );

  private readonly floorStatusSubject = new BehaviorSubject<FloorStatus[]>(
    this.generateFloorStatuses()
  );

  readonly currentReading$: Observable<SensorReading> =
    this.currentReadingSubject.asObservable();

  readonly floorStatuses$: Observable<FloorStatus[]> =
    this.floorStatusSubject.asObservable();

  // A rolling history of readings, used to draw the trend chart.
  readonly history$: Observable<SensorReading[]> = this.currentReading$.pipe(
    scan((history, reading) => {
      const next = [...history, reading];
      return next.length > 20 ? next.slice(next.length - 20) : next;
    }, [] as SensorReading[])
  );

  constructor() {
    // interval(2000) emits every 2 seconds -- this simulates a live feed.
    interval(2000).subscribe(() => {
      const reading = this.generateReading();
      this.currentReadingSubject.next(reading);
      this.floorStatusSubject.next(this.generateFloorStatuses());
    });
  }

  private generateReading(): SensorReading {
    return {
      temperature: this.randomBetween(20, 28),
      energyUsage: this.randomBetween(40, 95),
      occupancy: this.randomBetween(10, 100),
      airQuality: this.randomBetween(55, 100),
      timestamp: Date.now(),
    };
  }

  private generateFloorStatuses(): FloorStatus[] {
    const floors = [
      { id: 'f1', label: 'Ground Floor' },
      { id: 'f2', label: 'Floor 1' },
      { id: 'f3', label: 'Floor 2' },
      { id: 'f4', label: 'Floor 3' },
      { id: 'f5', label: 'Rooftop Plant' },
    ];

    return floors.map((floor) => {
      const temperature = this.randomBetween(19, 30);
      let status: FloorStatus['status'] = 'normal';
      if (temperature > 27) status = 'alert';
      else if (temperature > 25) status = 'warning';

      return { ...floor, temperature, status };
    });
  }

  private randomBetween(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
  }
}
