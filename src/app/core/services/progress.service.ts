import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private _storage: Storage | null = null;
  private progress$ = new BehaviorSubject<any[]>([]);

  constructor(@Inject(Storage) private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    this.loadProgress();
  }

  async loadProgress() {
    const progressData = await this._storage?.get('progress') || [];
    this.progress$.next(progressData);
  }

  async saveProgress(data: any) {
    const progressData = [...this.progress$.value, data];
    this.progress$.next(progressData);
    await this._storage?.set('progress', progressData);
  }

  getProgress() {
    return this.progress$.asObservable();
  }

  async getWorkoutHistory(): Promise<any[]> {
    return await this._storage?.get('workout_history') || [];
  }
}
