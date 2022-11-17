import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig= {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  success(msg: string){
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  error(msg: string){
    this.config['panelClass'] = ['notification', 'error'];
    this.snackBar.open(msg, '', this.config);
  }

  incomplete(msg: string){
    this.config['panelClass'] = ['notification', 'incomplete'];
    this.snackBar.open(msg, '', this.config);
  }
}
