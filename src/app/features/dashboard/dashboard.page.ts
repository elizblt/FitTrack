import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DatePipe } from '@angular/common';
import { WorkoutService } from 'src/app/core/services/workout.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  providers: [DatePipe]
})
export class DashboardPage implements OnInit {
  workouts$ = this.workoutService.getWorkouts();

  constructor(private workoutService: WorkoutService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.workouts$ = this.workoutService.getWorkouts();

    this.workouts$.subscribe((workouts: any[]) => {
      console.log('Workouts:', workouts);
    });
  }

  addWorkout() {
    const newWorkout = { name: `Entraînement ${Date.now()}`, date: new Date() };
    this.workoutService.addWorkout(newWorkout);
  }

  scheduleReminder() {
    this.notificationService.scheduleNotification();
  }
}
