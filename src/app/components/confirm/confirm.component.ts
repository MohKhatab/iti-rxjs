import { Component, ViewChild } from '@angular/core';
import { ConfirmationService } from '../../services/confirmation.service';

@Component({
  selector: 'app-confirm',
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent {
  message = '';
  private resolveFn: (value: boolean) => void = () => {};

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.confirmationService.confirmPopupSubject.subscribe(
      ({ message, resolve }) => {
        console.log('hi');
        this.message = message;
        this.resolveFn = resolve;
        const modal = document.getElementById(
          'my_modal_1'
        ) as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      }
    );
  }

  respond(value: boolean) {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    this.resolveFn(value);
  }
}
