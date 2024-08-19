import {Speaker, SpeakerId} from "./speaker";
import {Talk} from "./talk";
import {SpeakerGateway} from "./speaker.gateway";

export class FakeSpeakerGateway implements SpeakerGateway {
  private speakers: Map<SpeakerId, Talk[]> = new Map<SpeakerId, Talk[]>();

  public addTalksFor(speaker: Speaker, talks: Talk[]): void {
    this.speakers.set(speaker.id, talks);
  }

  public getUpcomingTalksFor(speaker: Speaker): Promise<Talk[]> {
    const talks = this.speakers.get(speaker.id)!;
    return Promise.resolve(talks);
  }
}
