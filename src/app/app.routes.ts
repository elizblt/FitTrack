import { Routes } from '@angular/router';
import { TabsPage } from './features/tabs/tabs.page';
import { DashboardPage } from './features/dashboard/dashboard.page';
import { ExercisePage } from './features/exercise/exercise.page';
import { GoalsPage } from './features/goals/goals.page';
import { HistoryPage } from './features/history/history.page';
import { StatsPage } from './features/stats/stats.page';


export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'exercise', component: ExercisePage },
      { path: 'stats', component: StatsPage },
      { path: 'goals', component: GoalsPage },
      { path: 'stats/history', component: HistoryPage }
    ]
  }
];

