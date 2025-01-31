import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private _storage: Storage | null = null;

  constructor(@Inject(Storage) private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async logWorkout(workout: any) {
    let logs = await this._storage?.get('workout_logs') || [];
    logs.push({ workout, date: new Date() });
    await this._storage?.set('workout_logs', logs);
  }

  async getLogs(): Promise<any[]> {
    return await this._storage?.get('workout_logs') || [];
  }

  calculateAverage(durations: number[]): number {
    if (durations.length === 0) return 0;
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  calculateMax(durations: number[]): number {
    return durations.length ? Math.max(...durations) : 0;
  }

  calculateMin(durations: number[]): number {
    return durations.length ? Math.min(...durations) : 0;
  }
}
