import {Guest, User, UserId} from "./user";
import {UserSession} from "./user.session";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, firstValueFrom, map, of} from "rxjs";

@Injectable({providedIn: 'any'})
export class HttpUserSession implements UserSession {
  constructor(private httpClient: HttpClient) {
  }

  public async get(): Promise<User> {
    return await firstValueFrom(this.httpClient.get<UserResponse>('https://myapi.com/user/current')
      .pipe(
        map(r => this.toUser(r)),
        catchError(_ => of(new Guest()))));
  }

  private toUser(response: UserResponse): User {
    const id = response.id;
    const subscriptions: User[] = response.subscriptions.map(s => this.toUser(s));

    return new User(id, subscriptions);
  }
}

export type UserResponse = {
  id: UserId,
  subscriptions: UserResponse[]
}
