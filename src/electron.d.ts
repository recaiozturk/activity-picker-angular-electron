export interface ElectronAPI {
  getActivities: () => Promise<string[]>;
  saveActivities: (activities: string[]) => Promise<{ success: boolean; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
