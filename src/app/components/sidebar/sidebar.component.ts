import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { icon: '&#9678;', label: 'Overview' },
    { icon: '&#127968;', label: 'Floors' },
    { icon: '&#9889;', label: 'Energy' },
    { icon: '&#128202;', label: 'Reports' },
    { icon: '&#9881;', label: 'Settings' },
  ];

  readonly activeIndex = signal(0);

  select(index: number): void {
    this.activeIndex.set(index);
  }
}
