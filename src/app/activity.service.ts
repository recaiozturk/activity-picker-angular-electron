import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  // Reactive state via signals
  private activitiesSignal = signal<string[]>([]);

  readonly activities = this.activitiesSignal.asReadonly();

  readonly activitiesCount = computed(() => this.activities().length);

  constructor() {
    this.loadActivities();
  }

  async loadActivities(): Promise<void> {
    if (window.electronAPI) {
      const data = await window.electronAPI.getActivities();
      this.activitiesSignal.set(data);
    }
  }

  async addActivity(activity: string): Promise<void> {
    if (activity && activity.trim()) {
      // Optimistic UI update, then persist
      this.activitiesSignal.update(activities => [...activities, activity.trim()]);
      await this.saveActivities();
    }
  }

  async updateActivity(index: number, newValue: string): Promise<void> {
    if (index >= 0 && index < this.activities().length && newValue.trim()) {
      this.activitiesSignal.update(activities =>
        activities.map((activity, i) => (i === index ? newValue.trim() : activity))
      );
      await this.saveActivities();
    }
  }

  async deleteActivity(index: number): Promise<void> {
    if (index >= 0 && index < this.activities().length) {
      this.activitiesSignal.update(activities => activities.filter((_, i) => i !== index));
      await this.saveActivities();
    }
  }

  getRandomActivity(): string | null {
    const activities = this.activities();
    if (activities.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * activities.length);
    return activities[randomIndex];
  }

  private async saveActivities(): Promise<void> {
    if (window.electronAPI) {
      await window.electronAPI.saveActivities(this.activities());
    }
  }
}
