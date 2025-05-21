import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface notifyConfirm {
  message: string;
  resolve: (confirmed: boolean) => void;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  confirmPopupSubject = new Subject<notifyConfirm>();

  notifyConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmPopupSubject.next({ message, resolve });
    });
  }
}
