import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InfoPopupComponent } from 'src/components/info-popup/info-popup.component';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  public showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
    });
  }

  public showError(message: string): void {
    this.dialog.open(InfoPopupComponent, {
      width: '500px',
      data: {
        title: 'Erreur',
        message: message ? message : 'Une erreur inattendue est survenue'
      }
    });
  }
}
