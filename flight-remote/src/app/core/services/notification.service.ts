import { Injectable } from '@angular/core';

export type NotificationType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  success(message: string): void {
    this.show('success', message);
  }

  error(message: string): void {
    this.show('error', message);
  }

  warning(message: string): void {
    this.show('warning', message);
  }

  info(message: string): void {
    this.show('info', message);
  }

  private show(
    type: NotificationType,
    message: string
  ): void {

    window.dispatchEvent(
      new CustomEvent('flight-planner-notification', {
        detail: {
          type,
          message
        }
      })
    );
  }
}