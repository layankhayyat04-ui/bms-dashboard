import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorReading } from '../../models/sensor-reading';

// A small SVG line chart. It takes an array of past readings (@Input)
// and one "field" (@Input) telling it which number in each reading to
// plot -- so the same component draws the temperature trend AND the
// energy trend, just pointed at different data.

@Component({
  selector: 'app-trend-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-chart.component.html',
  styleUrl: './trend-chart.component.scss',
})
export class TrendChartComponent {
  @Input() set history(readings: SensorReading[]) {
    this._history.set(readings ?? []);
  }
  get history(): SensorReading[] {
    return this._history();
  }

  @Input() field: keyof SensorReading = 'temperature';
  @Input() label = '';
  @Input() color = '#3ddc97';

  private readonly _history = signal<SensorReading[]>([]);

  private readonly width = 280;
  private readonly height = 80;

  readonly values = computed(() =>
    this._history().map((reading) => Number(reading[this.field]))
  );

  // Converts the raw numeric values into an SVG "points" string
  // (a list of x,y coordinates) that <polyline> can draw directly.
  readonly points = computed(() => {
    const values = this.values();
    if (values.length === 0) return '';

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    return values
      .map((value, index) => {
        const x = (index / Math.max(values.length - 1, 1)) * this.width;
        const y = this.height - ((value - min) / range) * this.height;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  readonly latestValue = computed(() => {
    const values = this.values();
    return values.length ? values[values.length - 1] : 0;
  });
}
