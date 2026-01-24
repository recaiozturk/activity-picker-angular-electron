import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityService } from './activity.service';
import { HomeComponent } from './home.component';
import { ManageComponent } from './manage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    ManageComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentPage = signal<'home' | 'manage'>('home');
  selectedActivity = signal<string | null>(null);

  constructor(public activityService: ActivityService) {}

  async ngOnInit() {
    await this.activityService.loadActivities();
  }

  pickRandom() {
    const activity = this.activityService.getRandomActivity();
    this.selectedActivity.set(activity);
  }

  async addActivity(activity: string) {
    await this.activityService.addActivity(activity);
  }

  async updateActivity(index: number, newValue: string) {
    await this.activityService.updateActivity(index, newValue);
  }

  async deleteActivity(index: number) {
    await this.activityService.deleteActivity(index);
    if (this.activityService.activities().length === 0) {
      this.selectedActivity.set(null);
    }
  }

  goToManage() {
    this.currentPage.set('manage');
  }

  goToHome() {
    this.currentPage.set('home');
  }
}
