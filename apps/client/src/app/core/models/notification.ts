export interface INotification {
  _id?: string;
  userId: string;
  message: string;
}

export class Notification {
  _id?: string = '';
  userId: string = '';
  message: string = '';
}
