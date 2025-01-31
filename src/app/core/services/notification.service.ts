import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  async scheduleNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Rappel Entraînement',
          body: 'N’oubliez pas votre séance d’entraînement aujourd’hui !',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 60 * 60) } // Dans 1h
        }
      ]
    });
  }
}
