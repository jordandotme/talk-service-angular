import {Speaker} from "./speaker";
import {Talk} from "./talk";
import {SpeakerGateway} from "./speaker.gateway";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'any'})
export class HttpSpeakerGateway implements SpeakerGateway {

  constructor(private httpClient: HttpClient) {
  }

  public async getUpcomingTalksFor(speaker: Speaker): Promise<Talk[]> {
    return await firstValueFrom(this.httpClient.get<Talk[]>(`https://myapi.com/speaker/${speaker.id}/upcoming-talks`));
  }

}
