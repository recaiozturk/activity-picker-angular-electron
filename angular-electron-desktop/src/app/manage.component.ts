import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <mat-toolbar class='black-toolbar'>
      <button mat-icon-button (click)='onBack.emit()' aria-label='Geri' class='white-icon'>
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>Aktivitelerimi Yönet</span>
    </mat-toolbar>

    <div class='manage-container' #container>
      <!-- Aktivite Ekleme/Düzenleme Bölümü -->
      <mat-card class='add-card'>
        <mat-card-header>
          <mat-card-title>
            {{ editingIndex() !== null ? 'Aktiviteyi Düzenle' : 'Yeni Aktivite Ekle' }}
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance='outline' class='full-width'>
            <mat-label>Aktivite</mat-label>
            <input 
              matInput 
              [(ngModel)]='newActivity' 
              (keyup.enter)='saveActivity()'
              placeholder='Örn: Kitap oku, Yürüyüşe çık...'
              [disabled]='isProcessing()'
              #activityInput
              autofocus>
          </mat-form-field>
          <div class='button-group'>
            <button 
              mat-raised-button 
              (click)='saveActivity()'
              [disabled]='!newActivity.trim() || isProcessing()'
              class='save-button black-button'>
              <mat-spinner 
                *ngIf='isProcessing()' 
                diameter='20' 
                class='button-spinner'>
              </mat-spinner>
              <mat-icon *ngIf='!isProcessing()'>
                {{ editingIndex() !== null ? 'check' : 'add' }}
              </mat-icon>
              {{ isProcessing() ? 'Kaydediliyor...' : (editingIndex() !== null ? 'Güncelle' : 'Ekle') }}
            </button>
            <button 
              *ngIf='editingIndex() !== null'
              mat-raised-button 
              (click)='cancelEdit()'
              [disabled]='isProcessing()'
              class='cancel-button'>
              <mat-icon>close</mat-icon>
              İptal
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Aktivite Listesi -->
      <mat-card class='list-card'>
        <mat-card-header>
          <mat-card-title>Aktivitelerim ({{ activities.length }})</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list *ngIf='activities.length > 0'>
            <mat-list-item *ngFor='let activity of activities; let i = index'>
              <span matListItemTitle>{{ activity }}</span>

              <div matListItemMeta class='action-buttons'>
                <button 
                  mat-icon-button 
                  (click)='startEdit(i, activity)'
                  [disabled]='editingIndex() !== null || deletingIndex() === i'
                  aria-label='Düzenle'>
                  <mat-icon>edit</mat-icon>
                </button>
                <button 
                  mat-icon-button 
                  color='warn' 
                  (click)='deleteActivity(i)'
                  [disabled]='deletingIndex() === i || editingIndex() !== null'
                  aria-label='Sil'>
                  <mat-spinner 
                    *ngIf='deletingIndex() === i' 
                    diameter='24' 
                    color='warn'>
                  </mat-spinner>
                  <mat-icon *ngIf='deletingIndex() !== i'>delete</mat-icon>
                </button>
              </div>
            </mat-list-item>
          </mat-list>
          
          <div class='empty-list' *ngIf='activities.length === 0'>
            <mat-icon class='empty-icon'>inbox</mat-icon>
            <p>Henüz aktivite eklemediniz</p>
            <p class='hint'>Yukarıdaki formu kullanarak aktivite ekleyin</p>
          </div>
        </mat-card-content>
      </mat-card>
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

    .manage-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      height: calc(100vh - 64px);
      overflow-y: auto;
      background-color: #ffffff;
      scroll-behavior: smooth;
    }

    .add-card {
      margin-bottom: 20px;
      border: 1px solid #e0e0e0;
    }

    .add-card mat-card-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .full-width {
      width: 100%;
    }

    .save-button {
      min-width: 140px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cancel-button {
      display: flex;
      align-items: center;
      gap: 8px;
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

    .button-spinner {
      display: inline-block;
      margin-right: 8px;
    }

    .list-card {
      margin-bottom: 20px;
      border: 1px solid #e0e0e0;
    }

    .empty-list {
      text-align: center;
      color: #666666;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #cccccc;
      margin-bottom: 20px;
    }

    .empty-list p {
      margin: 10px 0;
      font-size: 16px;
    }

    .hint {
      font-size: 14px;
      color: #999999;
    }

    mat-list-item {
      border-bottom: 1px solid #e0e0e0;
    }

    mat-list-item:last-child {
      border-bottom: none;
    }

    .action-buttons {
      display: flex;
      gap: 4px;
      align-items: center;
    }

    mat-list-item button {
      position: relative;
    }
  `]
})
export class ManageComponent {
  @Input() activities: string[] = [];
  @Output() onAdd = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter<{index: number, value: string}>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onBack = new EventEmitter<void>();

  newActivity: string = '';
  editingIndex = signal<number | null>(null);
  isProcessing = signal(false);
  deletingIndex = signal<number | null>(null);

  startEdit(index: number, currentValue: string) {
    // Düzenleme moduna geç
    this.editingIndex.set(index);
    this.newActivity = currentValue;
    
    // Üste scroll yap
    const container = document.querySelector('.manage-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Input'a focus ver
    setTimeout(() => {
      const input = document.querySelector('.add-card input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }, 300); // Scroll animasyonu için biraz bekle
  }

  async saveActivity() {
    if (this.newActivity.trim() && !this.isProcessing()) {
      this.isProcessing.set(true);
      try {
        if (this.editingIndex() !== null) {

          await new Promise(resolve => setTimeout(resolve, 300));
          this.onUpdate.emit({ 
            index: this.editingIndex()!, 
            value: this.newActivity.trim() 
          });
          this.editingIndex.set(null);
        } else {

          await new Promise(resolve => setTimeout(resolve, 300));
          this.onAdd.emit(this.newActivity.trim());
        }
        this.newActivity = '';
      } finally {
        this.isProcessing.set(false);
      }
    }
  }

  cancelEdit() {
    this.editingIndex.set(null);
    this.newActivity = '';
  }

  async deleteActivity(index: number) {
    if (this.deletingIndex() === null) {
      this.deletingIndex.set(index);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        this.onDelete.emit(index);
      } finally {
        this.deletingIndex.set(null);
      }
    }
  }
}
