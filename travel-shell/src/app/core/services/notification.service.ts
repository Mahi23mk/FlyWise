import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject =
    new BehaviorSubject<Notification | null>(null);

  notification$ =
    this.notificationSubject.asObservable();

  constructor() {
    window.addEventListener(
      'flight-planner-notification',
      this.handleRemoteNotification
    );
  }

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

  clear(): void {
    this.notificationSubject.next(null);
  }

  private show(
    type: NotificationType,
    message: string
  ): void {
    this.notificationSubject.next({
      type,
      message
    });
  }

  private handleRemoteNotification = (
    event: Event
  ): void => {

    const customEvent =
      event as CustomEvent<Notification>;

    const notification =
      customEvent.detail;

    if (!notification) {
      return;
    }

    this.show(
      notification.type,
      notification.message
    );
  };
}