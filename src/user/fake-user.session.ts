import {User} from "./user";
import {UserSession} from "./user.session";

export class FakeUserSession implements UserSession {
  private session: User | undefined = undefined;

  public add(user: User): void {
    this.session = user;
  }

  public get(): Promise<User> {
    return Promise.resolve(this.session!);
  }
}
