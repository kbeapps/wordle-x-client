export class Group {
  _id: string = '';
  ownerId: string = '';
  groupName: string = '';
  members: string[] = [];

  constructor(
    _id: string,
    ownerId: string,
    groupName: string,
    members: string[]
  ) {
    this._id = _id;
    this.ownerId = ownerId;
    this.groupName = groupName;
    this.members = members;
  }
}
