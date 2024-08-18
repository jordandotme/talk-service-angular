import {HttpClient, HttpXhrBackend} from "@angular/common/http";
import {Talk} from "./talk";
import {User} from "../user/user";
import {UserNotLoggedInError} from "../user/user-errors";
import {Injectable} from "@angular/core";
import {catchError, firstValueFrom, of} from "rxjs";

@Injectable({ providedIn: 'any' })
export class SpeakerService {
  public async getTalks(user: User): Promise<Talk[]> {
    let talksList: Talk[] = [];
    let loggedUser: User | null;
    let isSubscribed = false;
    const httpClient = new HttpClient(new HttpXhrBackend({build: () => new XMLHttpRequest()}));
    loggedUser = await firstValueFrom(httpClient.get<User>('https://myapi.com/user/current').pipe(catchError(_ => {return of(null)})));
    if (loggedUser !== null) {
      loggedUser = loggedUser as User;
      let subscriptions = loggedUser.subscriptions;
      for (let i = 0; i < subscriptions.length; i++) {
        let subscription = subscriptions[i]
        if (subscription.id === user.id) {
          isSubscribed = true
          break
        }
      }
      if (isSubscribed) {
        talksList = await firstValueFrom(httpClient.get<Talk[]>(`https://myapi.com/speaker/${user.id}/upcoming-talks`));
      }
      return talksList
    } else {
      throw new UserNotLoggedInError();
    }
  }
}

export default SpeakerService
