import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WorkoutApiService {
  private apiUrl = 'https://api.com/workouts'; 
  constructor(@Inject(HttpClient) private http: HttpClient) {} 

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Erreur API:', err);
        return throwError(() => new Error('Erreur lors de la récupération des workouts'));
      })
    );
  }

  addWorkout(workout: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, workout).pipe(
      catchError(err => {
        console.error('Erreur API:', err);
        return throwError(() => new Error('Erreur lors de l’ajout du workout'));
      })
    );
  }
}
