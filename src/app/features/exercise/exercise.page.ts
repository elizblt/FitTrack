import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/core/services/exercise.service';
import { TimerComponent } from 'src/app/shared/timer/timer.component'; 

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, TimerComponent]
})
export class ExercisePage {
  exerciseForm: FormGroup;
  workoutId: string;

  constructor(private fb: FormBuilder, private exerciseService: ExerciseService, private route: ActivatedRoute) {
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      intensity: ['', Validators.required]
    });

    this.workoutId = this.route.snapshot.paramMap.get('id') || '';
  }

  async addExercise() {
    if (this.exerciseForm.valid) {
      await this.exerciseService.saveExercise(this.workoutId, this.exerciseForm.value);
      alert('Exercice ajouté avec succès !');
    }
  }
}
