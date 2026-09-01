import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorStatus } from '../../models/sensor-reading';

// Draws a simple building cross-section as stacked SVG rectangles, one
// per floor, colored by that floor's live status. This is the kind of
// "visualize building equipment with SVG" widget the job posting asks
// for directly.

@Component({
  selector: 'app-building-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './building-view.component.html',
  styleUrl: './building-view.component.scss',
})
export class BuildingViewComponent {
  @Input() set floors(value: FloorStatus[]) {
    this._floors.set(value ?? []);
  }
  get floors(): FloorStatus[] {
    return this._floors();
  }

  private readonly _floors = signal<FloorStatus[]>([]);

  readonly floorHeight = 44;
  readonly floorGap = 6;

  selectedFloor = signal<FloorStatus | null>(null);

  selectFloor(floor: FloorStatus): void {
    this.selectedFloor.set(floor);
  }
}
