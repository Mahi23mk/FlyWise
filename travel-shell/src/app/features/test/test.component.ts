import { Component } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  constructor(
  private notificationService: NotificationService
) {}

testNotification(): void {
  this.notificationService.success(
    'Notification system is working!'
  );
}

}
