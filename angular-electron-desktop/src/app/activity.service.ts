import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  // Signal ile reactive state
  private activitiesSignal = signal<string[]>([]);
  
  // Public readonly signal
  readonly activities = this.activitiesSignal.asReadonly();
  
  // Computed signal - aktivite sayısı
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
      // Önce UI'ı güncelle (optimistic update)
      this.activitiesSignal.update(activities => [...activities, activity.trim()]);
      // Sonra dosyaya kaydet
      await this.saveActivities();
    }
  }

  async updateActivity(index: number, newValue: string): Promise<void> {
    if (index >= 0 && index < this.activities().length && newValue.trim()) {
      // Önce UI'ı güncelle (optimistic update)
      this.activitiesSignal.update(activities => 
        activities.map((activity, i) => i === index ? newValue.trim() : activity)
      );
      // Sonra dosyaya kaydet
      await this.saveActivities();
    }
  }

  async deleteActivity(index: number): Promise<void> {
    if (index >= 0 && index < this.activities().length) {
      // Önce UI'ı güncelle (optimistic update)
      this.activitiesSignal.update(activities => 
        activities.filter((_, i) => i !== index)
      );
      // Sonra dosyaya kaydet
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
