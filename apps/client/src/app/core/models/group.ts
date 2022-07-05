export interface IGroup {
  _id?: string;
  ownerId: string;
  groupName: string;
  members: string[];
}

export class Group {
  _id?: string = '';
  ownerId: string = '';
  groupName: string = '';
  members: string[] = [];
}
