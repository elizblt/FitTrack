import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { WorkoutApiService } from './workout-api.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private _storage: Storage | null = null;  // Stockage local
  private workouts$ = new BehaviorSubject<any[]>([]); // Observable qui stocke les workouts

  constructor(@Inject(Storage) private storage: Storage, private workoutApi: WorkoutApiService) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create(); // Initialisation de Ionic Storage
    this.loadWorkouts(); // Chargement des workouts
  }

  async loadWorkouts() {
    const localWorkouts = await this._storage?.get('workouts') || []; // Récupère les workouts stockés localement
    this.workouts$.next(localWorkouts); // Mise à jour du BehaviorSubject

    // Synchronisation avec l'API
    this.workoutApi.getWorkouts().subscribe(apiWorkouts => {
      this.workouts$.next(apiWorkouts);
      this._storage?.set('workouts', apiWorkouts); // Mise à jour du stockage local
    });
  }

  async addWorkout(workout: any) {
    const newWorkouts = [...this.workouts$.value, workout];
    this.workouts$.next(newWorkouts);
    await this._storage?.set('workouts', newWorkouts); // Ajout au stockage local

    this.workoutApi.addWorkout(workout).subscribe(); // Ajout à l’API
  }

  getWorkouts() {
    return this.workouts$.asObservable(); // Renvoie la liste des workouts en temps réel
  }
}
