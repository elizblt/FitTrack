import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnalyticsService } from '../../core/services/analytics.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  average!: number;
  max!: number;
  min!: number;
  durations: number[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.calculateStats();
  }

  calculateStats() {
    this.average = this.analyticsService.calculateAverage(this.durations);
    this.max = this.analyticsService.calculateMax(this.durations);
    this.min = this.analyticsService.calculateMin(this.durations);
  }
}
