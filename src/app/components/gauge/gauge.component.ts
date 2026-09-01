import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// A reusable circular gauge widget, drawn entirely with SVG.
// It's "reusable" because it doesn't know what data it's showing --
// the parent component tells it via @Input properties (value, min, max,
// label, unit). This is the same widget used for temperature, energy
// usage, occupancy, and air quality -- just with different inputs.

@Component({
  selector: 'app-gauge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gauge.component.html',
  styleUrl: './gauge.component.scss',
})
export class GaugeComponent {
  // @Input() marks a property that the PARENT component sets from
  // outside, e.g. <app-gauge [value]="42" label="Temperature" />
  @Input() set value(v: number) {
    this._value.set(v);
  }
  get value(): number {
    return this._value();
  }

  @Input() min = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() unit = '';
  @Input() warnAt = 75; // percentage of range at which the gauge turns amber
  @Input() alertAt = 90; // percentage of range at which the gauge turns red

  private readonly _value = signal(0);

  // computed() automatically recalculates whenever _value() changes --
  // this is Angular's modern reactive primitive (a "signal").
  readonly percentage = computed(() => {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    const pct = ((this._value() - this.min) / range) * 100;
    return Math.max(0, Math.min(100, pct));
  });

  // SVG circle math: circumference = 2 * PI * radius.
  // We draw the "filled" arc by offsetting the stroke-dasharray.
  readonly radius = 54;
  readonly circumference = 2 * Math.PI * this.radius;

  readonly dashOffset = computed(() => {
    return this.circumference * (1 - this.percentage() / 100);
  });

  readonly statusClass = computed(() => {
    const pct = this.percentage();
    if (pct >= this.alertAt) return 'alert';
    if (pct >= this.warnAt) return 'warning';
    return 'normal';
  });
}
