export class Notification {
  _id: string = '';
  userId: string = '';
  message: string = '';

  constructor(_id: string, userId: string, message: string) {
    this._id = _id;
    this.userId = userId;
    this.message = message;
  }
}
