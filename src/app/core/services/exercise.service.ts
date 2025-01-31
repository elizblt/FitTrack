import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private _storage: Storage | null = null;

  constructor(@Inject(Storage) private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async saveExercise(workoutId: string | null, exercise: any) {
    let exercises = await this._storage?.get('exercises') || [];

    if (workoutId) {
      exercise.workoutId = workoutId;
    }

    exercises.push(exercise);
    await this._storage?.set('exercises', exercises);
  }
}
