import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  Notification,
  NotificationService
} from '../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notification: Notification | null = null;

  private subscription?: Subscription;
  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.subscription =
      this.notificationService.notification$.subscribe(
        notification => {
          this.notification = notification;

          if (notification) {
            this.startAutoClose();
          }
        }
      );
  }

  close(): void {
    this.notificationService.clear();
  }

  private startAutoClose(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.close();
    }, 4000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}