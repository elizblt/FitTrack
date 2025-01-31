import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class TimerComponent {
  @Input() duration: number = 60;  
  timeLeft: number = this.duration;
  interval: any = null;

  startTimer() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.pauseTimer();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  resetTimer() {
    this.timeLeft = this.duration; 
    this.pauseTimer();
  }
}
