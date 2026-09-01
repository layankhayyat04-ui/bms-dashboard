import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { TrendChartComponent } from './components/trend-chart/trend-chart.component';
import { BuildingViewComponent } from './components/building-view/building-view.component';
import { SensorDataService } from './services/sensor-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // `imports` on a standalone component lists every other component,
  // directive, or module THIS component's template uses. This replaces
  // the old NgModule "declarations" list.
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    GaugeComponent,
    TrendChartComponent,
    BuildingViewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // inject() is the modern way to get a service instance -- Angular's
  // Dependency Injection system finds the single shared SensorDataService
  // instance (registered as `providedIn: 'root'`) and hands it to us here.
  private readonly sensorData = inject(SensorDataService);

  // These are Observables. The `| async` pipe in the template subscribes
  // to them automatically and unsubscribes when the component is
  // destroyed -- we never call .subscribe() manually here.
  readonly currentReading$ = this.sensorData.currentReading$;
  readonly floorStatuses$ = this.sensorData.floorStatuses$;
  readonly history$ = this.sensorData.history$;
}
