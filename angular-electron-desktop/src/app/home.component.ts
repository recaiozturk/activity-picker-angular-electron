import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar class='black-toolbar'>
      <span>Ne Yapsam?</span>
      <span class='spacer'></span>
      <button mat-icon-button (click)='onManage.emit()' aria-label='Aktiviteleri Yönet' class='white-icon'>
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>

    <div class='home-container'>
      <div class='center-content'>
        <button 
          mat-raised-button 
          (click)='onPickRandom.emit()' 
          [disabled]='activitiesCount === 0'
          class='pick-button black-button'>
          Rastgele Seç
        </button>
        
        <div class='selected-activity' *ngIf='selectedActivity'>
          <h1>{{ selectedActivity }}</h1>
        </div>
        
        <div class='no-activities' *ngIf='!selectedActivity && activitiesCount === 0'>
          <p>Henüz aktivite eklenmemiş</p>
          <p class='hint'>Aktivite eklemek için + butonuna tıklayın</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .black-toolbar {
      background-color: #000000 !important;
      color: white !important;
    }

    .white-icon {
      color: white !important;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .home-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 64px);
      padding: 20px;
      background-color: #ffffff;
    }

    .center-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
      max-width: 600px;
      width: 100%;
    }

    .pick-button {
      font-size: 24px;
      padding: 20px 60px;
      height: auto;
      min-width: 250px;
    }

    .black-button {
      background-color: #000000 !important;
      color: white !important;
      transition: background-color 0.3s ease;
    }

    .black-button:hover:not(:disabled) {
      background-color: #333333 !important;
    }

    .black-button:disabled {
      background-color: #cccccc !important;
      color: #666666 !important;
    }

    .selected-activity {
      text-align: center;
      padding: 40px;
      background-color: #f5f5f5;
      border-radius: 12px;
      width: 100%;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border: 2px solid #000000;
    }

    .selected-activity h1 {
      margin: 0;
      color: #000000;
      font-size: 36px;
      font-weight: 500;
    }

    .no-activities {
      text-align: center;
      color: #666666;
      padding: 40px;
    }

    .no-activities p {
      margin: 10px 0;
      font-size: 18px;
    }

    .hint {
      font-size: 14px;
      color: #999999;
    }
  `]
})
export class HomeComponent {
  @Input() selectedActivity: string | null = null;
  @Input() activitiesCount: number = 0;
  @Output() onPickRandom = new EventEmitter<void>();
  @Output() onManage = new EventEmitter<void>();
}
