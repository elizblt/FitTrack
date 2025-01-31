import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonList, IonItem, IonContent } from '@ionic/angular';
import { ProgressService } from '../../core/services/progress.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {
  history$!: Observable<any[]>;

  constructor(private progressService: ProgressService) {}

  ngOnInit() {
    this.history$ = from(this.progressService.getWorkoutHistory());
  }
}
