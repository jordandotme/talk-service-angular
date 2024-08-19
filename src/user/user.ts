import {UserNotLoggedInError} from "./user.error";

export class User {
  constructor(private _id: UserId, private subscriptions: User[] = []) {
  }

  get id(): UserId {
    return this._id;
  }

  public isSubscribedTo(otherUser: User): boolean {
    return this.subscriptions.some(subscription => subscription.id === otherUser.id);
  }
}

export class Guest extends User {
  constructor() {
    super('', []);
  }

  override isSubscribedTo(otherUser: User): boolean {
    throw new UserNotLoggedInError();
  }
}

export type UserId = string;
